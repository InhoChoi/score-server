package main

func GetSubmitResult(userid int) []Submit {
	rows, err := database.Query("SELECT problem_submit.id, problem.title, problem.content, problem_submit.status, problem_submit.code, problem_submit.output FROM problem_submit JOIN problem ON problem.id = problem_submit.problemid WHERE problem_submit.userid=? ORDER BY problem_submit.createdAt DESC", userid)
	defer rows.Close()
	if err != nil {
		panic(err)
	}

	var submits []Submit = []Submit{}
	for rows.Next() {
		var id int
		var problemid int
		var userid int
		var code string
		var status string
		var output string
		var createdAt string

		rows.Scan(&id, &problemid, &userid, &code, &status, &output, &createdAt)
		submits = append(submits, Submit{id, problemid, userid, code, status, output, createdAt})
	}

	return submits
}
