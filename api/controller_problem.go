package main

import "fmt"

type Problem_TestCase struct {
	Id        int    `json:"id"`
	ProblemId int    `json:"problemid"`
	Input     string `json:"input" binding:"required"`
	Output    string `json:"output" binding:"required"`
	CreatedAt string `json:"createdAt"`
}

type Problem struct {
	Id        int                `json:"id"`
	Userid    int                `json:"userid"`
	Title     string             `json:"title" binding:"required"`
	Content   string             `json:"content" binding:"required"`
	TestCase  []Problem_TestCase `json:"testcase" binding:"required"`
	CreatedAt string             `json:"createdAt"`
}

func GetProblmes() []Problem {
	rows, err := database.Query("SELECT id, userid, title, content, createdAt FROM problem ORDER BY createdAt DESC")
	defer rows.Close()
	if err != nil {
		panic(err)
	}

	var problems []Problem = []Problem{}
	for rows.Next() {
		var id int
		var userid int
		var title string
		var content string
		var createdAt string
		rows.Scan(&id, &userid, &title, &content, &createdAt)

		testcase := GetTestCase(id)
		problems = append(problems, Problem{id, userid, title, content, testcase, createdAt})
	}

	return problems
}

func GetTestCase(id int) []Problem_TestCase {
	rows, err := database.Query("SELECT id, problemid, input, output, createdAt FROM problem_testcase WHERE problemid=?", id)
	defer rows.Close()
	if err != nil {
		panic(err)
	}

	var testcases []Problem_TestCase = []Problem_TestCase{}
	for rows.Next() {
		var id int
		var problemid int
		var input string
		var output string
		var createdAt string
		rows.Scan(&id, &problemid, &input, &output, &createdAt)
		testcases = append(testcases, Problem_TestCase{id, problemid, input, output, createdAt})
	}

	return testcases
}

func GetProblme(problemId int) (error, Problem) {
	rows, err := database.Query("SELECT id, userid, title, content, createdAt FROM problem WHERE id=?", problemId)
	defer rows.Close()
	if err != nil {
		panic(err)
	}

	for rows.Next() {
		var id int
		var userid int
		var title string
		var content string
		var createdAt string
		rows.Scan(&id, &userid, &title, &content, &createdAt)
		var problem Problem
		problem.Id = id
		problem.Userid = userid
		problem.Title = title
		problem.Content = content
		problem.CreatedAt = createdAt
		return nil, problem
	}
	return fmt.Errorf("Doesn't exist problem"), Problem{}
}

func InsertProblem(problem Problem) {
	insertProblemMutex.Lock()
	rows, err := database.Query("INSERT INTO problem (userid, title, content) VALUES (?, ?, ?)", problem.Userid, problem.Title, problem.Content)
	if err != nil {
		panic(err)
	}
	rows.Close()

	rows, err = database.Query("SELECT id FROM problem_submit WHERE userid=? and title=? and content=? ORDER BY id DESC LIMIT 1", problem.Userid, problem.Title, problem.Content)
	if err != nil {
		panic(err)
	}
	var id int
	rows.Next()
	rows.Scan(&id)
	rows.Close()

	for i := 0; i < len(problem.TestCase); i++ {
		rows, err := database.Query("INSERT INTO problem_testcase (problemid, input, output) VALUES (?, ?, ?)", id, problem.TestCase[i].Input, problem.TestCase[i].Output)
		if err != nil {
			panic(err)
		}
		rows.Close()
	}
	insertProblemMutex.Unlock()
}
