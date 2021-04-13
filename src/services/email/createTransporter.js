import config from 'config'
import nodemailer from 'nodemailer'
import { google } from 'googleapis'
const OAuth2 = google.auth.OAuth2

async function createTransporter() {
    try {   
        const oauth2Client = new OAuth2(
            config.get('google-client_id'),
            config.get('google-client_secret'),
            "https://developers.google.com/oauthplayground"   
        );

        oauth2Client.setCredentials({
            refresh_token: config.get('google-refresh_token')
        })
        console.log("before refresh");

        const accessToken = await new Promise((resolve, reject) => {
            oauth2Client.getAccessToken((err, token) => {
                if(err) {
                    console.log(err);
                    reject(err)
                }
    
                resolve(token)
            })
        })

    
        const defaultOptions = { 
            from: config.get('google-email')
        }
       
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: config.get('google-email'),
                accessToken,
                clientId: config.get('google-client_id'),
                clientSecret: config.get('google-client_secret'),
                refreshToken: config.get('google-refresh_token')
            },
            tls: {
                rejectUnauthorized: false
            }   
        }, defaultOptions)
        console.log("2");
    
        return transporter;
    }
    
    catch(err) {
        throw err
    }
}

export default createTransporter
