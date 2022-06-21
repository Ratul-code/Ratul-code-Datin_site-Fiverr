const multer = require("multer");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      console.log(req.user.id)
      cb(null, req.user.id +'-'+file.originalname)
    }
  })

module.exports = multer({ storage: storage })

