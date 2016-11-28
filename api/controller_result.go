package main

func GetSubmitResult(userid int) []Submit {
	rows, err := database.Query("SELECT id, problemid, userid, code, status, output, createdAt FROM problem_submit ORDER BY createdAt DESC")
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
