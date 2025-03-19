import nodemailer from 'nodemailer';

export const sendVerificationEmail = async (email: string, code: string) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Vérification de votre adresse email',
        text: `Votre code de vérification est : ${code}`,
    };

    await transporter.sendMail(mailOptions);
};