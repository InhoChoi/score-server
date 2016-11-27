package main

import "github.com/gin-gonic/gin"

func User_Get(c *gin.Context) {
	c.Status(404)
}

func User_Post(c *gin.Context) {
	var req User
	if err := c.BindJSON(&req); err != nil {
		c.Status(412)
		return
	}
	err, users := GetUserByEmail(req.Email)
	if err != nil {
		c.Status(500)
		return
	}
	if len(users) != 0 {
		c.Status(409)
		return
	}
	if err = RegisterUser(req.Name, req.Email, req.Password); err != nil {
		c.Status(500)
		return
	}
	c.Status(200)
}

func User_Delete(c *gin.Context) {
	c.Status(404)
}
