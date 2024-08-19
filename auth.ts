import { OAuth2Client} from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);

 export async function verifyToken(idToken: string) {
    try {
        const ticket = await client.verifyIdToken({
            idToken: idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();

        return payload;
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


