import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const options = {
        providers: [
                Providers.Email({
                        server: process.env.SMTP_SERVER_SENDGRID,
                        from: process.env.EMAIL_FROM,
                }),
                Providers.Google({
                        clientId: process.env.GOOGLE_ID,
                        clientSecret: process.env.GOOGLE_SECRET,
                }),
                Providers.Auth0({
                        clientId: process.env.AUTH0_CLIENT_ID,
                        clientSecret: process.env.AUTH0_CLIENT_SECRET,
                        domain: process.env.AUTH0_DOMAIN,
                }),
        ],
        database: process.env.DATABASE_URI,
};

export default (req, res) => NextAuth(req, res, options);
