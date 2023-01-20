class User {

    constructor(data) {
        this.name = data.name;
        this.email = data.email;
        this.token = data.token;
        this.password = data.password;
    }

    addUser() {
        return `INSERT INTO users(name, email, token, password)
                VALUES ('${this.name}', '${this.email}', '${this.token}', '${this.password}')`;
    }

    updateUser(id) {
        return `UPDATE users
                SET name = '${this.name}',
                    email  = '${this.email}',
                    token  = '${this.token}',
                    password  = '${this.password}'
                WHERE id = ${id}`;
    }

    static getUserById(id) {
        console.log(id);
        return `SELECT *
                FROM users
                WHERE id = ${id}`;
    }

    static deleteUserById(id) {
        return `DELETE
                FROM users
                WHERE id = ${id}`;
    }

    static getAllUsers() {
        return `SELECT * FROM users`;
    }
    static getUserByEmail(email, callback) {
        return  `SELECT * FROM users WHERE email = '${email}'`;
    }
}

module.exports = User;
