package main

import (
	"fmt"
	"math/rand"
	"time"
)

type Auth struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

func GetAuthToken(email string, password string) (error, string) {
	err, users := GetUserByEmail(email)
	if err != nil {
		panic(err)
	}

	if len(users) == 0 {
		return fmt.Errorf("Not exist user"), ""
	}

	//Todo - Password 암호화
	if users[0].Password != password {
		return fmt.Errorf("Wrong Password"), ""
	}

	DeleteAllToken(users[0].Id)
	token := CreateToken(users[0].Id)

	return nil, token
}

func GetUseridByToken(token string) (error, int) {
	if _, check := CheckVaildToken(token); check != true {
		return fmt.Errorf("Invaild Token"), 0
	}

	rows, err := database.Query(`SELECT userid FROM auth_token WHERE token=? and expiredAt > now()`, token)
	if err != nil {
		panic(err)
	}

	var count int
	for rows.Next() {
		err := rows.Scan(&count)
		if err != nil {
			panic(err)
		}
	}

	return nil, count
}

func CreateToken(userid int) string {
	token := randStringRunes(128)
	_, err := database.Query(`INSERT INTO auth_token(userid, token, expiredAt) VALUES (?, ?, now() + INTERVAL 1 DAY)`, userid, token)
	if err != nil {
		panic(err)
	}
	return token
}

func CheckVaildToken(token string) (error, bool) {
	if len(token) == 0 {
		return nil, false
	}

	rows, err := database.Query(`SELECT count(*) FROM auth_token WHERE token=? and expiredAt > now()`, token)
	if err != nil {
		panic(err)
	}

	var count int
	for rows.Next() {
		err := rows.Scan(&count)
		if err != nil {
			panic(err)
		}
	}

	if count == 1 {
		return nil, true
	}
	return nil, false
}

func DeleteAuthToken(token string) {
	_, err := database.Query(`DELETE FROM auth_token WHERE token=?`, token)
	if err != nil {
		panic(err)
	}
}

func DeleteAllToken(userid int) {
	_, err := database.Query(`DELETE FROM auth_token WHERE userid=?`, userid)
	if err != nil {
		panic(err)
	}
}

var letterRunes = []rune("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")

func randStringRunes(n int) string {
	rand.Seed(time.Now().UnixNano())
	b := make([]rune, n)
	for i := range b {
		b[i] = letterRunes[rand.Intn(len(letterRunes))]
	}
	return string(b)
}
