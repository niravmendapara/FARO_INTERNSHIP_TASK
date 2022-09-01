const multer = require('multer');

// this middleware will save the images in the folder / public/images
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        try {
          cb(null,'../Backend/public/images');
        }
        catch(e){
          console.log(e);
        }
      },
      filename: (req, file, cb) => {
        const filename =`${file.originalname}`;
        // req.body.fileList = filename;
        
        cb(null, filename);
        console.log("storage");
      } 
  });

const upload = multer({ storage: storage });

module.exports = upload;