import createTransporter from "./createTransporter";

export async function sendEmail(emailOptions) {
    let emailTransporter = await createTransporter()

    await emailTransporter.sendMail(emailOptions)
}
