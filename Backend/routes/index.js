var express = require('express');
var router = express.Router();
const sharp = require('sharp');
const upload = require("../Middleware/uploadimages")
const path = require('path');


//this is the main API which satisfy all the criteria we need

router.post('/uploadallimages', upload.any('allimages'),async function(req, res, next) {
  try{
    console.log('API called')
    console.log(req.files.length)
    var thumbnailimages = []

    await req.files.reduce((x, newfile) => {
      return x.then(() => {
        // this SHARP library make thumbnails of 200*200 and will save it in the folder /public/thumbnails.
         sharp(newfile.path).resize(200, 200).toFile('../Backend/public/thumbnails/' + 'thumbnails-' + newfile.originalname, (err, resizeImage) => {
          if (!err) {
            console.log("All works!!")
          } else {
            console.log(err);
          }
      })
      thumbnailimages.push('/thumbnails/thumbnails-'+ newfile.originalname)
      })
    },Promise.resolve())
    console.log(thumbnailimages)
    res.send({data: thumbnailimages,message: "Thumbnail Generated Successfully"})
  }
  catch(err){
    console.log(err)
    res.send({message: "Error..!!"})
  }
});


/* GET home page. */
router.get('/', async function(req, res, next) {
  res.render('index', { title: 'Express' });
});




module.exports = router;
