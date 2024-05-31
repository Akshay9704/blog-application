import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Configure cors
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};

app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(cookieParser());

// Get __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files
app.use("/images", express.static(path.join(__dirname, "/images")));

// Routes
import userRouter from './routes/userRouter.js';
import postRouter from './routes/postRouter.js';
import commentRouter from './routes/commentRouter.js';
import authRouter from './routes/auth.router.js';

app.use('/api/auth', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/comments', commentRouter);
app.use('/api/user', authRouter);

const storage = multer.diskStorage({
    destination: (req, file, fn) => {
        const dir = path.join(__dirname, 'images');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fn(null, dir);
    },
    filename: (req, file, fn) => {
        const filename = Date.now() + path.extname(file.originalname);
        fn(null, filename);
    }
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    console.log('File uploaded:', req.file);
    res.status(200).json("Image has been uploaded successfully!");
});

// Connect to MongoDB
const ConnectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error while connecting to the database: ${error.message}`);
        process.exit(1);
    }
};

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    ConnectDB();
    console.log(`Server is running on port ${PORT}`);
});
