const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const connection = require('./dbconfig');
const config = require('./config');
const ImageHandler = require('../utils/imageHandler');

module.exports = class User {
    constructor(userJson) {
        this.id = userJson.id;
        this.name = userJson.name;
        this.email = userJson.email,
        this.password = userJson.password;
        this.image = userJson.image;
        this.role = userJson.role;
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
                        resolve(error)
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

    static checkGoogleUser(userJson) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM users WHERE id_google = ?', [userJson.id_google],
                (error, result, fields) => {
                    let googleResp = {};
                    if (error) {
                        reject(error)
                    } 
                    //If the user Google Id is not registered, it will proceed to register the user
                    else if (result.length === 0) {
                        User.registerGoogleUser(userJson).then(insertedUser => {
                            let token = User.generateToken(insertedUser.id, insertedUser.email, insertedUser.name);
                            googleResp = {
                                registered: true,
                                logged: true,
                                token: token
                            };
                            resolve(googleResp);
                        });
                    } else {
                        let user = result[0];
                        let token = User.generateToken(user.id, user.email)
                        googleResp = {
                            registered: false,
                            logged: true,
                            token: token
                        };
                        resolve(googleResp);
                    }
                })
        })
    }

    static registerGoogleUser(userJson) {
        return new Promise((resolve, reject) => {
            //Async function to get the image from Google servers
            ImageHandler.getGoogleImg(userJson.avatar).then(image => {
                let user = {
                    name: userJson.name,
                    email: userJson.email,
                    image: image,
                    id_google: userJson.id_google
                };
                connection.query('INSERT INTO users SET ?', [user], (error, result, fields) => {
                    if (error)
                        return reject(error);
                    else
                        resolve({
                            id: result.insertId,
                            email: userJson.email,
                            name: userJson.name
                        });
                });
            });
        });
    }

    static generateToken(id, email, name) {
        return jwt.sign({ id: id, email: email, name: name }, config.secret, { expiresIn: '4 hours' });
    }
}