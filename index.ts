import express, {Application} from 'express';
import dotenv from 'dotenv';
import {verifyFacebookToken, verifyToken} from "./auth";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./swagger_output.json";
import cors from "cors";

//For env File
dotenv.config();

const app: Application = express();
app.use(express.json())
app.use(cors());

const port = process.env.PORT || 8000;

app.post('/auth/google', async (req, res) => {
    const {idToken} = req.body;
    try {
        const userPayload = await verifyToken(idToken);
        res.status(200).json({success: true, user: userPayload});
    } catch (error) {
        res.status(400).json({success: false, message: 'Invalid ID token'});
    }
});


app.post('/auth/facebook', async (req, res) => {
    const {accesstoken} = req.body;
    try {
        const userPayload = await verifyFacebookToken(accesstoken);
        res.status(200).json({success: true, userPayload});
    } catch (error) {
        res.status(400).json({success: false, message: 'Invalid Facebook token'});
    }

})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput, {
    customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
    customJs: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js'
}));

app.get('/', (req, res) => {
    res.redirect('/api-docs');
})

app.listen(port, () => {
    console.log(`Server is up at http://localhost:${port}`);
});