const express = require("express");
const multer = require("multer");
const Tesseract = require("tesseract.js");
const cors = require("cors");

const app = express();
app.use(cors());

const upload = multer({ storage: multer.memoryStorage() });

app.post("/upload", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "لم يتم رفع أي صورة" });
    }

    Tesseract.recognize(req.file.buffer, "ara")  // استخدام اللغة العربية
        .then(({ data: { text } }) => {
            res.json({ text });
        })
        .catch(error => {
            res.status(500).json({ error: "خطأ في تحليل الصورة" });
        });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`الخادم يعمل على http://localhost:${PORT}`));
