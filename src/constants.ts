import { join } from 'path';

export const DATABASE_PROVIDER_TOKEN = 'database-provider';
export const DATABASE_HOST = process.env.DATABASE_HOST ?? 'localhost';
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD ?? 'password';
export const DATABASE_USERNAME = process.env.DATABASE_USERNAME ?? 'cabinet';
export const DATABASE = process.env.DATABASE ?? 'madapi';

export const JWT_PRIVATE_KEY =
  process.env.ENVIRONMENT === 'development'
    ? JSON.parse(`"${process.env.PRIVATE_KEY}"`)
    : process.env.PRIVATE_KEY;

export const JWT_PUBLIC_KEY =
  process.env.ENVIRONMENT === 'development'
    ? JSON.parse(`"${process.env.PUBLIC_KEY}"`)
    : process.env.PUBLIC_KEY;

export const REFRESH_TOKEN_EXPIRES =
  +process.env.REFRESH_TOKEN_EXPIRES || 7776000; // 6 months maybe
export const ACCESS_TOKEN_EXPIRES = +process.env.ACCESS_TOKEN_EXPIRES || 600; // 10 min

export const ARGON_HASHING_TIME = 128;
export const ARGON_HASHING_THREADS = 16;

export const CORS_OPTIONS = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
};

export const STATIC_PATH = join(__dirname, '..', 'public', 'uploads');
console.log(STATIC_PATH);
export const ENTITY_PATH = join(__dirname, 'entities');
