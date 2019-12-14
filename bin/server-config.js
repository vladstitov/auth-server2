"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverConfig = {
    ver: 1.01,
    port: 49000,
    blockIPonAttempt: 10,
    confirmEmailUrl: "http://localhost:49000/auth-client/api/auth/confirm-email/",
    resetPasswordUrl: "http://localhost:49000/auth-client/api/auth/reset-password-token/",
    redirects: {
        errorRestPasswordExpired: 'http://localhost:4200/#user/error-reset-password?message=RESET_PASSWORD_TOKEN_EXPIRED',
        errorRestPasswordInvalidToken: 'http://localhost:4200/#user/error-reset-password?message=RESET_PASSWORD_TOKEN_NOT_VALID',
        resetPassword: 'http://localhost:4200/#user/reset-password?tokenID=',
        confirmEmailSuccess: 'http://localhost:4200/#user/login',
        confirmEmailError: 'http://localhost:4200/#user/error-confirm-email?message='
    },
    morgan: {
        log: 'dev'
    },
    mysql: {
        log: true,
        host: 'front-desk.ca',
        database: 'frontdes_auth',
        username: 'frontdes_a2wp423',
        password: 'Zaq12wsxcde3'
    },
    email: {
        service: "yahoo",
        user: "onlinevlad@yahoo.ca",
        pass: "XZsawq@!",
        from: "onlinevlad@yahoo.ca",
        company: 'Innovexa'
    },
    token: {
        issuer: 'Innovexa',
        subject: 'support@innovexa.com',
        audience: 'http://innovexa.com',
        algorithm: 'RS256',
        expiresIn: '24h'
    }
};
