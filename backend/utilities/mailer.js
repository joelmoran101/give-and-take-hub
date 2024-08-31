// utilities/mailer.js
import * as nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // or 'STARTTLS'
    auth: {
        user: 'rickey.batz76@ethereal.email',
        pass: 'bVMZad7K9CXTth1h18',
    },
});

export async function sendEmail(to, subject, text) {
    const mailOptions = {
        from: 'joel.moran@students.beaaminstitute.org',
        to,
        subject,
        text,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email: ', error);
    }
}

export default transporter;