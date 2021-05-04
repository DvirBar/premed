import nodemailer from 'nodemailer'
import { google } from 'googleapis'
const OAuth2 = google.auth.OAuth2

async function createTransporter() {
    const oauth2Client = new OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        "https://developers.google.com/oauthplayground"   
    );

    oauth2Client.setCredentials({
        refresh_token: process.env.GOOGLE_REFRESH_TOKEN
    })

    try {   
        const accessToken = await oauth2Client.getAccessToken()
        
        const defaultOptions = { 
            from: process.env.GOOGLE_EMAIL
        }
        
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: process.env.GOOGLE_EMAIL,
                accessToken,
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                refreshToken: process.env.GOOGLE_REFRESH_TOKEN
            },
            tls: {
                rejectUnauthorized: false
            }   
        }, defaultOptions)

        return transporter;
    }
    
    catch(err) {
        throw err
    }
}

export default createTransporter
