const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const connection = require('./dbconfig');
const config = require('./config');

module.exports = class User {
    constructor(userJson) {
        this.id = userJson.id;
        this.name = userJson.name;
        this.email = userJson.email,
        this.password = userJson.password;
        this.role = userJson.role;
        this.image = userJson.image;
    }

    static getUser(id) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM users WHERE id = ?', [id],
                (error, result, fields) => {
                    if (error)
                        reject(error)
                    else {
                        if (result.length > 0) {
                            let user = new User(result[0]);
                            resolve(user);
                        }
                        let error = {
                            message: 'No se ha podido encontrar el usuario'
                        }
                    }
                })
        })
    }

    static registerUser (userJson) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(userJson.password, 5, (error, hash) => {
                let encryptedPassword = hash;
                let userData = {
                    name: userJson.name,
                    email: userJson.email,
                    password: encryptedPassword,
                    role: userJson.role,
                    image: userJson.image
                };
                connection.query('INSERT INTO users SET ?', userData, (error, result, fields) => {
                    if (error)
                        return reject(error);
                    else
                        resolve(result.insertId);
                })
            })
        })
    }

    static generateToken(id, email, name) {
        return jwt.sign({ id: id, email: email, name: name }, config.secret, { expiresIn: '4 hours' });
    }
}