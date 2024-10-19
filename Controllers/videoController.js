const Video = require('../Models/Video');  // Ensure this points to your Video model correctly
const mongoose = require('mongoose');

// Controller functions
const getVideos = async (req, res) => {
    try {
        const videos = await Video.find();
        res.status(200).json(videos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const uploadVideo = async (req, res) => {
    const video = new Video({
        title: req.body.title,
        url: req.file.path,  // Assuming the video file path is stored here
    });

    try {
        const savedVideo = await video.save();
        res.status(201).json(savedVideo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const updateVideo = async (req, res) => {
    try {
        const updatedVideo = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedVideo) return res.status(404).json({ message: 'Video not found' });
        res.status(200).json(updatedVideo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = { getVideos, uploadVideo, updateVideo };
