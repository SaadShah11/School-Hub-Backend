//This is a middleware that we can use in our express app for uploading image, because JSON cannot handle binary data

const multer = require('multer');
const uuid = require('uuid/v1');

//userd to derive correct extensions for a file
const MIME_TYPE_MAP = {
    'image.jpg':'jpg',
    'image.png':'png',
    'image.jpng':'jpeg'
}

const file_upload = multer({
    limit: 1000000,
    storage: multer.diskStorage({
        destination: (req, file, cd) => {
            cd(null, 'uploads/images')
        },
        filename: (req, file, cd) => {
            //This returns correct file extension
            const ext = MIME_TYPE_MAP[file.mimetype];
            cd(null, uuid()+'.'+ext)
        }
    }),
    //used to validate file (because frontend is not safe)
    fileFilter: (req, file, cb) => {
        //returns true (valid filetype returned) or false (undefined/null)
        const isValid = !!MIME_TYPE_MAP[file.mimetype]
        let error = isValid ? null : new Error('invalid file/mime type')
        //First arg is error returned if any, 2nd arg is to forward/accept it or not (boolean)
        cd(error, isValid)
    }
});

module.exports = file_upload;