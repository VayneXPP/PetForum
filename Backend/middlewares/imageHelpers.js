// imageHelpers.js not in used

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

/**
 * Convert an uploaded image to JPEG format and return the new image path.
 * 
 * @param {string} inputImagePath - Path to the original uploaded image
 * @returns {Promise<string>} - Resolves with the path to the converted image
 */
async function convertImageToJpeg(inputImagePath) {
    const outputImagePath = path.join(path.dirname(inputImagePath), Date.now() + '-converted.jpg');

    try {
        await sharp(inputImagePath)
            .jpeg({ quality: 90 })
            .toFile(outputImagePath);
        
        // Optionally, delete the original uploaded image
        fs.unlinkSync(inputImagePath);

        return outputImagePath;
    } catch (err) {
        console.error('Error converting image:', err);
        throw err;
    }
}

module.exports = {
    convertImageToJpeg
};
