package main

import (
	"fmt"
	"runtime"
	"strings"
)

type Job struct {
	SubmitId  int
	ProblemId int
	Code      string
}

type Result struct {
	SubmitId      int
	ProblemId     int
	Complie       bool
	Timeout       bool
	Result        bool
	ComplieResult string
}

type Worker struct {
	JobQueue    chan Job
	ResultQueue chan Result
	quit        chan bool
}

func NewWorker() Worker {
	JobQueue := make(chan Job)
	ResultQueue := make(chan Result)
	quit := make(chan bool)
	return Worker{
		JobQueue,
		ResultQueue,
		quit,
	}
}

func diffOutput(input string, correct string) bool {
	return strings.TrimSpace(input) == strings.TrimSpace(correct)
}

func (w *Worker) Start(n int) {
	for i := 0; i < n; i++ {
		fmt.Println("GCC-Worker", i+1, "Start")
		go func() {
			for {
				select {
				case job := <-w.JobQueue:
					path := SaveFile(job.Code)
					err, destFile, complieResult := Complie(path)

					if err != nil {
						RemoveFile(destFile, path)
						w.ResultQueue <- Result{job.SubmitId, job.ProblemId, false, false, false, complieResult}
						continue
					}

					testCase := GetTestCase(job.ProblemId)

					wrong := false
					for i := 0; i < len(testCase); i++ {
						_, timeout, output := Exec(destFile, testCase[i].Input)

						if timeout != nil {
							w.ResultQueue <- Result{job.SubmitId, job.ProblemId, true, true, false, ""}
							wrong = true
							break
						}

						if !diffOutput(output, testCase[i].Output) {
							w.ResultQueue <- Result{job.SubmitId, job.ProblemId, true, false, false, ""}
							wrong = true
							break
						}
					}

					RemoveFile(destFile, path)
					if wrong == true {
						continue
					}

					w.ResultQueue <- Result{job.SubmitId, job.ProblemId, true, false, true, ""}
				case <-w.quit:
					return
				}
			}
		}()
	}
}

func (w *Worker) Stop() {
	go func() {
		w.quit <- true
	}()
}

func resultWorker(resultQueue chan Result) {
	for {
		result := <-resultQueue
		if result.Complie == false {
			go ChangeSubmitStatus(result.SubmitId, "Complie Error", result.ComplieResult)
		} else if result.Timeout == true {
			go ChangeSubmitStatus(result.SubmitId, "Timeout", "")
		} else if result.Result == true {
			go ChangeSubmitStatus(result.SubmitId, "Correct", "")
		} else {
			go ChangeSubmitStatus(result.SubmitId, "Wrong", "")
		}
	}
}

func startGccWorker() {
	runtime.GOMAXPROCS(runtime.NumCPU())

	works := NewWorker()
	works.Start(*workerNumber)
	gccWorker = works

	go resultWorker(works.ResultQueue)
}
