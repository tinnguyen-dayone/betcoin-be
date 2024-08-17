import express, {Application} from 'express';
import dotenv from 'dotenv';
import {verifyFacebookToken, verifyToken} from "./auth";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./swagger_output.json";

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


app.post('/auth/facebook', async (req, res) => {
    const { accesstoken } = req.body;
    try {
        const userPayload = await verifyFacebookToken(accesstoken);
        res.status(200).json({ success: true, userPayload });
    }catch (error) {
        res.status(400).json({ success: false, message: 'Invalid Facebook token' });
    }

})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));

app.get('/', (req, res) => {
    res.redirect('/api-docs');
})

app.listen(port, () => {
    console.log(`Server is up at http://localhost:${port}`);
});