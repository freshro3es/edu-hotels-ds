import express from 'express';
import mongoose from 'mongoose';
import router from './router.js';
import fileUpload from 'express-fileupload';

const PORT = 5000;
const DB_URI = "mongodb+srv://igorkarpy:r4est0LoELf6BSRQ@mongodb-edu.lnfm6kd.mongodb.net/?retryWrites=true&w=majority&appName=mongodb-edu";

const app = express();

app.use(express.json());
app.use(express.static('static'));
app.use(fileUpload({}));
app.use('/api', router);

async function startApp() {
    try {
        await mongoose.connect(DB_URI);
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

startApp();

//run().catch(console.dir);

