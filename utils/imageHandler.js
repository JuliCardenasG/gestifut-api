const moment = require('moment');
const sharp = require('sharp');

let handleImage = (imageData) => {
    return new Promise((resolve, reject) => {
        if(!imageData)
            resolve('public/img/user.png');
        if(imageData.startsWith('public/')){
            resolve(imageData);
        }
        let data = imageData.replace(/^data:image\/\w+;base64,/, "");
        let buffer = new Buffer(data, 'base64');
        let imgPath = 'public/img/' + moment().unix() + '.png';
        sharp(buffer)
            .resize(300)
            .toFile(imgPath)
            .then(() => resolve(imgPath))
    })

}

module.exports = handleImage;