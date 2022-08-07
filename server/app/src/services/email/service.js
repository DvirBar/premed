import nodemailer from 'nodemailer'

async function createTransporter() {
    const transporter = nodemailer.createTransport({
		host: process.env.ZOHO_HOST,
		secure: true,
		port: process.env.ZOHO_PORT,
		auth: {
			user: process.env.ZOHO_EMAIL,
			pass: process.env.ZOHO_PASSWORD,
		},
	});

	return transporter;
}

export async function sendEmail(options) {
	const transporter = await createTransporter();

	const info = await transporter.sendMail(options);

	return info;
}


export default createTransporter
