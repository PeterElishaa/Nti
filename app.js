// // const express = require('express');
// // const connectDB = require('./Config/db');
// // const userTypeRouter = require('./Routers/userTypeRouter');
// // const userRouter = require('./Routers/userRouter');
// // const projectRouter = require('./Routers/projectRouter');
// // const cors = require('cors');
// // const port = 3000;
// // const app = express();
// // app.use(express.json());
// // app.use(cors({
// //     origin:'http://localhost:4200',
// //     methods: ['GET','POST'],
// //     Credentials: true
// // }));
// // connectDB();

// // app.use('/usertype',userTypeRouter);
// // app.use('/user',userRouter);
// // app.use('/project',projectRouter);

// // app.listen(port,_=>console.log('server started at port 3000'));

// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const photoRoutes = require('./Routers/photoRoutes');
// const videoRoutes = require('./Routers/videoRoutes');

// dotenv.config();  // Load .env file

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());
// app.use('/uploads', express.static('uploads'));  // Serve static files from 'uploads' folder

// // Routes
// app.use('/uploads', express.static('uploads'));  // Ensure 'uploads' directory exists

// app.use('/api/photos', photoRoutes);  // Changed to '/api/photos' to be more descriptive
// app.use('/api/videos', videoRoutes);
// // MongoDB connection
// mongoose.connect(process.env.MONGO_URI)
//     .then(() => console.log('MongoDB connected'))
//     .catch((err) => console.error(err))
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const authRoutes = require('./Routers/authRoutes'); // Ensure this path is correct

dotenv.config();  // Load .env file

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:4200', // Adjust this based on your front-end URL
    methods: ['GET', 'POST'],
    credentials: true,
}));
app.use(bodyParser.json()); // To parse incoming JSON requests
app.use('/uploads', express.static('uploads'));  // Serve static files from 'uploads' folder

// Ensure the 'uploads' directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Routes
app.use('/api/auth', authRoutes); // Add authentication routes here

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error(err));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
