const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client('945620604630-ht0arqssnno9t9sevdbaal5kgpvd0vm2.apps.googleusercontent.com');

 export async function verifyToken(idToken: string) {
    try {
        const ticket = await client.verifyIdToken({
            idToken: idToken,
            audience: '945620604630-ht0arqssnno9t9sevdbaal5kgpvd0vm2.apps.googleusercontent.com', // Đây là Client ID của backend
        });
        const payload = ticket.getPayload();

        const userId = payload['sub']; // ID duy nhất của người dùng
        const email = payload['email'];
        const name = payload['name'];

        console.log(`User ID: ${userId}`);
        console.log(`Email: ${email}`);
        console.log(`Name: ${name}`);

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

    // Tiến hành xử lý userData hoặc tạo mới người dùng
    console.log(userData);
};


