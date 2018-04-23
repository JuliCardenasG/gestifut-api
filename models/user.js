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

    static login(loginJson) {
        return new Promise((resolve, reject) => {
            let email = loginJson.email;
            let password = loginJson.password;
            connection.query('SELECT * FROM users WHERE email = ?', [email], (error, result, fields) => {
                if (error)
                    return reject(error);
                else {
                    if (result.length > 0) {
                        let user = result[0];
                        bcrypt.compare(password, user.password, (error, result) => {
                            if (error)
                                return reject(error);

                            if (result)
                                resolve(this.generateToken(user.id, user.email, user.name));
                            else
                                resolve({error: 'La contraseña no coincide'});
                        })
                    }
                    else {
                        return reject('No se ha podido encontrar el usuario');
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