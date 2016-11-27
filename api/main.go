package main

import (
	"flag"
	"fmt"
	"strings"

	"./worker"
	"github.com/gin-gonic/gin"
)

var workerNumber = flag.Int("WorkerNumber", 4, "Worker Number")
var db_url = flag.String("DBUrl", "127.0.0.1:3306", "Database URL")
var db_user = flag.String("DBUser", "root", "Database User")
var db_password = flag.String("DBPassword", "root", "Database Password")
var db_name = flag.String("DBName", "test", "Database Name")

func diffOutput(input string, correct string) bool {
	return strings.TrimSpace(input) == strings.TrimSpace(correct)
}

func resultWorker(resultQueue chan worker.Result) {
	//Todo : result Worker 완성
	for {
		result := <-resultQueue
		fmt.Println(diffOutput(result.Output, "1 2 3"))
	}
}

func startGccWorker() {
	works := worker.NewWorker()
	works.Start(*workerNumber)

	go resultWorker(works.ResultQueue)
}

func main() {
	flag.Parse()
	startGccWorker()
	InitDB()

	r := gin.Default()
	r.Use(globalRecover)
	r.GET("/api/user", User_Get)
	r.POST("/api/user", User_Post)
	r.DELETE("/api/user", User_Delete)

	r.GET("/api/auth", checkAuth, Auth_Get)
	r.POST("/api/auth", Auth_Post)
	r.DELETE("/api/auth", checkAuth, Auth_Delete)
	r.Run()
}

func globalRecover(c *gin.Context) {
	defer func(c *gin.Context) {
		if rec := recover(); rec != nil {
			c.Status(500)
		}
	}(c)
	c.Next()
}

func checkAuth(c *gin.Context) {
	token := c.Request.Header.Get("token")
	if _, check := CheckVaildToken(token); check == true {
		c.Next()
	} else {
		c.Status(401)
		c.Abort()
	}
}
