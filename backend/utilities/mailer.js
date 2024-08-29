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

export default transporter;