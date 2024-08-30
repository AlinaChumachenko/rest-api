const Jimp = require("jimp");

// розмір аватара
const maxWidth = 250; 
const maxHeight = 250; 

const checkImageSize = async (req, res, next) => {
    if (!req.file) {
        return next();
    }

    try {
        const { path: tempUpload } = req.file;
        const image = await Jimp.read(tempUpload);

        // перевірка розміру
        if (image.bitmap.width > maxWidth || image.bitmap.height > maxHeight) {
            await fs.unlink(tempUpload); // видалення якщо розмір не такий як треба
            return res.status(400).json({ message: "Oops, your photo doesn't fit!" });
        }

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = checkImageSize;