package main

type User struct {
	Id       int
	Name     string `json:"name" binding:"required"`
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

func GetUserByEmail(email string) (error, []User) {
	rows, err := database.Query(`SELECT id, name, email, password FROM user WHERE email=?`, email)
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	var users []User

	for rows.Next() {
		var id int
		var name string
		var email string
		var password string
		err := rows.Scan(&id, &name, &email, &password)
		if err != nil {
			panic(err)
		}
		users = append(users, User{id, name, email, password})
	}
	return nil, users
}

func RegisterUser(name string, email string, password string) error {
	//Todo - Password 암호화
	_, err := database.Query(`INSERT INTO user (name, email, password) VALUES (?, ?, ?)`, name, email, password)
	if err != nil {
		panic(err)
	}
	return nil
}
