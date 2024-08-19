import axios from "axios";
import { OAuth2Client} from "google-auth-library";

const client = new OAuth2Client();

 export async function verifyToken(idToken: string) {
    try {
        const response = await axios.post(
            'https://oauth2.googleapis.com/token',
            {
                idToken,
                client_id: '945620604630-ht0arqssnno9t9sevdbaal5kgpvd0vm2.apps.googleusercontent.com',
                client_secret: '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',
                redirect_uri: 'postmessage',
                grant_type: 'authorization_code'
            }
        );
        const accessToken = response.data.access_token;
        const userResponse = await axios.get(
            'https://www.googleapis.com/oauth2/v3/userinfo',
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );
        const userDetails = userResponse.data;
        return userDetails;
    } catch (error) {
        console.error('Error verifying ID token:', error);
        throw new Error('Invalid ID token');
    }
}

export const verifyFacebookToken = async (accessToken: string) => {
    const response = await fetch(`https://graph.facebook.com/me?access_token=${accessToken}`);
    const userData = await response.json();

    if (userData.error) {
        throw new Error('Invalid Facebook token');
    }


    return userData;
};


