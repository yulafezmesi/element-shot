const cloudinary = require('cloudinary').v2;

module.exports = {
    uploadToCloudinary: async (image, format) => {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ folder: "container", format }, (err, url) => {
                if (err) return reject(err);
                return resolve(url);
            }).end(image)
        });
    },
}