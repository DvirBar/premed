import createTransporter from "./createTransporter";
import fs from 'fs';
import hogan from 'hogan.js'
import path from 'path'

export async function sendEmail(emailOptions, templateName, context) {
    const template = fs.readFileSync(path.resolve(__dirname, `templates/${templateName}.hjs`), 'utf-8')
    const compiledTemplate = hogan.compile(template)

    let emailTransporter = await createTransporter()
    
    await emailTransporter.sendMail({
        ...emailOptions,
        attachments: [{
            filename: 'banner.png',
            path: path.resolve(__dirname, 'templates/banner.png'),
            cid: 'banner'
        }],
        html: compiledTemplate.render(context)
    })
}
