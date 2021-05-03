import createTransporter from "./createTransporter";
import fs from 'fs';
import hogan from 'hogan.js'
import path from 'path'

export async function sendEmail(emailOptions, templateName, context) {
    try {
        const template = fs.readFileSync(path.resolve(__dirname, `templates/${templateName}.hjs`), 'utf-8')
        const compiledTemplate = hogan.compile(template)

        let emailTransporter = await createTransporter()

        emailTransporter.sendMail({
            ...emailOptions,
            attachments: [{
                filename: 'banner.png',
                path: path.resolve(__dirname, 'templates/banner.png'),
                cid: 'banner'
            }],
            html: compiledTemplate.render(context)
        }, (err, info) => {
            if(err) {
                throw err
            }
            
            if(process.env.NODE_ENV === 'development') {
                if(info.accepted?.length > 0) {
                    console.log(`Successfully sent email to ${info.accepted}`);
                }
    
                if(info.rejected?.length > 0) {
                    console.log(`Email rejected by ${info.rejected}`);
                }
            }
        })
    }
    
    catch(err) {
        throw err
    }
    
}
