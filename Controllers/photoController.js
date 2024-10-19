const Photo = require('../Models/Photo');

exports.getPhotos = async (req, res) => {
    try {
        const photos = await Photo.find();
        res.json(photos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching photos', error });
    }
};

exports.uploadPhoto = async (req, res) => {
    const { title } = req.body;
    const url = req.file.path; // Path of the uploaded file

    try {
        const newPhoto = new Photo({ title, url });
        await newPhoto.save();
        res.status(201).json(newPhoto);
    } catch (error) {
        res.status(500).json({ message: 'Error uploading photo', error });
    }
};

exports.updatePhoto = async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    const url = req.file ? req.file.path : undefined; // Check if a new file is uploaded

    try {
        const updatedPhoto = await Photo.findByIdAndUpdate(
            id,
            { title, url },
            { new: true } // Return the updated document
        );
        res.json(updatedPhoto);
    } catch (error) {
        res.status(500).json({ message: 'Error updating photo', error });
    }
};
