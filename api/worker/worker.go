package worker

import "fmt"

type Job struct {
	Id    string
	Code  string
	Input string
}

type Result struct {
	Id      string
	Complie bool
	Timeout bool
	Output  string
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
						w.ResultQueue <- Result{job.Id, false, false, complieResult}
						continue
					}

					err, timeout, outputResult := Exec(destFile, job.Input)

					if err != nil || timeout != nil {
						RemoveFile(destFile, path)
						w.ResultQueue <- Result{job.Id, true, true, outputResult}
						continue
					}

					w.ResultQueue <- Result{job.Id, true, false, outputResult}
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
