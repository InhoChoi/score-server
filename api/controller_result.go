package main

import "sync"

type Submit struct {
	Id        int    `json:"id"`
	Title     string `json:"title"`
	Content   string `json:"content"`
	Status    string `json:"status"`
	Code      string `json:"code" binding:"required"`
	Output    string `json:"output"`
	CreatedAt string `json:"createdAt"`
}

var insertProblemMutex = &sync.Mutex{}
var submitProblemMutex = &sync.Mutex{}

func GetSubmitResult(userid int) []Submit {
	rows, err := database.Query("SELECT problem_submit.id, problem.title, problem.content, problem_submit.status, problem_submit.code, problem_submit.output, problem_submit.createdAt FROM problem_submit JOIN problem ON problem.id = problem_submit.problemid WHERE problem_submit.userid=? ORDER BY problem_submit.createdAt DESC", userid)
	defer rows.Close()
	if err != nil {
		panic(err)
	}

	var submits []Submit = []Submit{}
	for rows.Next() {
		var id int
		var title string
		var content string
		var status string
		var code string
		var output string
		var createdAt string

		rows.Scan(&id, &title, &content, &status, &code, &output, &createdAt)
		submits = append(submits, Submit{id, title, content, status, code, output, createdAt})
	}

	return submits
}

func ChangeSubmitStatus(submitid int, status string, output string) {
	rows, err := database.Query("UPDATE problem_submit SET status=?, output=? WHERE id=?", status, output, submitid)
	if err != nil {
		panic(err)
	}
	rows.Close()
}

func SubmitProblem(problemid int, userid int, submit Submit) int {
	submitProblemMutex.Lock()
	rows, err := database.Query("INSERT INTO problem_submit (problemid, userid, code, status, output) VALUES (?, ?, ?, \"waiting\", \"\")", problemid, userid, submit.Code)
	if err != nil {
		panic(err)
	}
	rows.Close()

	rows, err = database.Query("SELECT id FROM problem_submit WHERE problemid=? and userid=? and code=? ORDER BY id DESC LIMIT 1", problemid, userid, submit.Code)
	if err != nil {
		panic(err)
	}
	var id int
	rows.Next()
	rows.Scan(&id)
	rows.Close()
	submitProblemMutex.Unlock()
	return id
}
