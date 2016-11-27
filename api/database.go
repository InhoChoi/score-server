package main

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

var database *sql.DB

func InitDB() {
	conn, err := sql.Open("mysql", fmt.Sprintf("%s:%s@tcp(%s)/%s", *db_user, *db_password, *db_url, *db_name))
	if err != nil {
		log.Fatal(err)
	}
	database = conn

	var version string
	database.QueryRow("SELECT VERSION()").Scan(&version)
	fmt.Println("Database Version :", version)
}
