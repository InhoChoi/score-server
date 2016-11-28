package main

import "github.com/gin-gonic/gin"

func Result_Get(c *gin.Context) {
	token := c.Request.Header.Get("token")
	err, userid := GetUseridByToken(token)

	if err != nil {
		c.Status(400)
		return
	}
	results := GetSubmitResult(userid)
	c.JSON(200, results)
}
