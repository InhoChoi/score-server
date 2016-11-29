package main

import (
	"flag"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/itsjamie/gin-cors"
)

var gccWorker Worker

var workerNumber = flag.Int("WorkerNumber", 4, "Worker Number")
var db_url = flag.String("DBUrl", "127.0.0.1:3306", "Database URL")
var db_user = flag.String("DBUser", "root", "Database User")
var db_password = flag.String("DBPassword", "root", "Database Password")
var db_name = flag.String("DBName", "test", "Database Name")

func main() {
	flag.Parse()
	startGccWorker()
	InitDB()

	r := gin.Default()
	r.Use(cors.Middleware(cors.Config{
		Origins:         "*",
		Methods:         "GET, PUT, POST, DELETE",
		RequestHeaders:  "Origin, Token, Content-Type",
		ExposedHeaders:  "",
		MaxAge:          50 * time.Second,
		Credentials:     true,
		ValidateHeaders: false,
	}))
	r.Use(globalRecover)
	r.GET("/api/user", User_Get)
	r.POST("/api/user", User_Post)
	r.DELETE("/api/user", User_Delete)

	r.GET("/api/auth", checkAuth, Auth_Get)
	r.POST("/api/auth", Auth_Post)
	r.DELETE("/api/auth", checkAuth, Auth_Delete)

	r.GET("/api/problem", checkAuth, Problem_Get)
	r.GET("/api/problem/:id", checkAuth, Problem_Id_Get)
	r.POST("/api/problem/:id/submit", checkAuth, Problem_Id_Submit_Post)
	r.POST("/api/problem", checkAuth, Problem_Post)
	r.DELETE("/api/problem", checkAuth, Problem_Delete)

	r.GET("/api/result", checkAuth, Result_Get)

	r.NoRoute(func(c *gin.Context) {
		c.Status(404)
	})

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
