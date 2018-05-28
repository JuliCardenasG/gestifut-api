const moment = require('moment');
const uuid = require('uuid/v1');
const sharp = require('sharp');
const https = require('https');
const fs = require('fs');
// const request = require('request');

let handleImage = (imageData) => {
    return new Promise((resolve, reject) => {
        if(!imageData || imageData == '')
            resolve('public/img/user.jpg');
        if(imageData.startsWith('public/')){
            resolve(imageData);
        }
        let data = imageData.replace(/^data:image\/\w+;base64,/, "");
        let buffer = new Buffer(data, 'base64');
        let imgPath = 'public/img/' + uuid() + '.png';
        sharp(buffer)
            .resize(200)
            .toFile(imgPath)
            .then(() => resolve(imgPath))
    })

}



let getGoogleImg = (url) => {
    console.log(url);
    return new Promise((resolve, reject) => {
        https.request(url)
            .on('response', (resp) => {
                let body = '';
                resp.setEncoding('binary');
                resp.on('data', (chunk) => {
                    body += chunk;
                }).on('end', () => {
                    let imgPath = __dirname + '/../public/img/' + uuid() + ".jpg";
                    fs.writeFileSync(imgPath, body, 'binary');
                    let imagePath = 'public/img/' + imgPath.split('/').pop();
                    console.log(imagePath);
                    resolve(imagePath);
                })
            }).end();
    })
}

module.exports = {
    handleImage: handleImage,
    getGoogleImg: getGoogleImg
};