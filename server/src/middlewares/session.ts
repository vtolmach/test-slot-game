import session from 'express-session';

declare module "express-session" {
  interface SessionData {
    credits: number;
  }
}

export default (secret: string, env: string ) => session({
  secret: secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: env === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  }
})