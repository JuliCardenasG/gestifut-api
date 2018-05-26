const moment = require('moment');
const uuid = require('uuid/v1');
const sharp = require('sharp');

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

module.exports = handleImage;