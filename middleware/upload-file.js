const multer = require("multer");
const path = require("path");

// variabel ini tujuannya untuk menentukan kita mau simpen gambar yang di upload di mana
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9); // 1.000.000.000
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

module.exports = upload;