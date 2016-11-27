package main

import "github.com/gin-gonic/gin"

func Auth_Get(c *gin.Context) {
	token := c.Request.Header.Get("token")
	err, userid := GetUseridByToken(token)

	if err != nil {
		c.Status(400)
		return
	}

	c.JSON(200, gin.H{
		"userid": userid,
	})
}

func Auth_Post(c *gin.Context) {
	var req Auth
	if err := c.BindJSON(&req); err != nil {
		c.Status(412)
		return
	}

	err, token := GetAuthToken(req.Email, req.Password)
	if err != nil {
		c.Status(400)
		return
	}

	c.JSON(200, gin.H{
		"token": token,
	})
}

func Auth_Delete(c *gin.Context) {
	token := c.Request.Header.Get("token")
	DeleteAuthToken(token)
	c.Status(200)
}
