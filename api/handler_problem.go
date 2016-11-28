package main

import (
	"strconv"

	"github.com/gin-gonic/gin"
)

func Problem_Get(c *gin.Context) {
	problems := GetProblmes()
	c.JSON(200, problems)
}

func Problem_Id_Get(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.Status(400)
		return
	}
	err, problem := GetProblme(int(id))
	if err != nil {
		c.Status(400)
		return
	}
	c.JSON(200, problem)
}

func Problem_Id_Submit_Post(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.Status(400)
		return
	}
	err, problem := GetProblme(int(id))
	if err != nil {
		c.Status(400)
		return
	}

	token := c.Request.Header.Get("token")
	err, userid := GetUseridByToken(token)

	if err != nil {
		c.Status(400)
		return
	}

	var req Submit
	c.BindJSON(&req)
	submitId := SubmitProblem(problem.Id, userid, req)

	gccWorker.JobQueue <- Job{submitId, problem.Id, req.Code}

	c.Status(200)
}

func Problem_Post(c *gin.Context) {
	var req Problem
	var token string = c.Request.Header.Get("token")

	if err := c.BindJSON(&req); err != nil {
		c.Status(400)
		return
	}

	_, userid := GetUseridByToken(token)

	req.Userid = userid
	InsertProblem(req)

	c.Status(200)
}

func Problem_Delete(c *gin.Context) {
	c.Status(404)
}
