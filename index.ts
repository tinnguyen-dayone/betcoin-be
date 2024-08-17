import express, {Application} from 'express';
import dotenv from 'dotenv';
import {verifyFacebookToken, verifyToken} from "./auth";


//For env File
dotenv.config();

const app: Application = express();
app.use(express.json())

const port = process.env.PORT || 8000;

app.post('/auth/google', async (req, res) => {
    const { idToken } = req.body;
    try {
        const userPayload = await verifyToken(idToken);
        res.status(200).json({ success: true, user: userPayload });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Invalid ID token' });
    }
});

app.get('/', (req, res) => {
    res.status(200).json({})
})

app.post('/auth/facebook', async (req, res) => {
    const { accesstoken } = req.body;
    try {
        const userPayload = await verifyFacebookToken(accesstoken);
        res.status(200).json({ success: true, userPayload });
    }catch (error) {
        res.status(400).json({ success: false, message: 'Invalid Facebook token' });
    }

})

app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});