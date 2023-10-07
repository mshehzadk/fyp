import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcrypt from 'bcryptjs';

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcrypt.hash(userId.toString(), 10);

        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpire: Date.now() + 3600000,
            });
        } else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpire: Date.now() + 3600000,
            });
        }

        var transport = nodemailer.createTransport({
            host: 'sandbox.smtp.mailtrap.io',
            port: 2525,
            auth: {
                user: '254a0ccd2aea43',
                pass: 'ea121dcd513664',
            },
        });
        const mailOptions = {
            from: 'shehzad@gmail.com',
            to: email,
            subject:
                emailType === 'VERIFY'
                    ? 'Verify Your Email'
                    : 'Reset Your Password',
            html: `<p>Click <a href = "${
                process.env.DOMAIN
            }/verifyemail?token=${hashedToken}">
             here</a> to ${
                 emailType === 'VERIFY'
                     ? ' Verify your email'
                     : ' Reset your password'
             }
             </p>`,
        };
        const mailResponse = await transport.sendMail(mailOptions);

        return mailResponse;
    } catch (error: any) {
        return new Error(error.message);
    }
};
