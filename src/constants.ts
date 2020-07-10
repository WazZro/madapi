import { join } from 'path';

export const APPLICATION_PORT = 3000;
export const CONTAINER_HOSTNAME_IP = '0.0.0.0';

export const DATABASE_PROVIDER_TOKEN = 'database-provider';
export const DATABASE_HOST = process.env.DATABASE_HOST ?? 'localhost';
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD ?? 'password';
export const DATABASE_USERNAME = process.env.DATABASE_USERNAME ?? 'cabinet';
export const DATABASE = process.env.DATABASE ?? 'madapi';

export const JWT_PRIVATE_KEY =
  '-----BEGIN RSA PRIVATE KEY-----\n' +
  'MIIBOQIBAAJAWDEpKT6hFCoQlfprjSY1SCUQiBV7t48tzgoeqc0Hw6ZLeQ1T3ud/\n' +
  'H8nvpf0/J862TV1myLDtbcoL2tVEln9WfwIDAQABAkAbIr08gJXFg4/o5c2T966r\n' +
  'TSRCCwIvH7IDVJ/MtVZvP21qHMqiKB8kOGh1Y/Pl0EHwBwqhABcB2b1ssOalD9pR\n' +
  'AiEAq96Z8BAquZI79fGVfvE3H4BUss5YKuMNf1UqJX/MJ1cCIQCDXLlH0K7Q2O6d\n' +
  'p2ZtRy7RdkzbBywpT5RtqsxG9wgZGQIgMqCCxfVtMHbEFOGSAO+7JhteV8FytUdm\n' +
  'zXBf1uX7VEcCIEQ/a1+dUwXcfvRXoYaK4g8fOETfUBlSaBomD6Wa+JEZAiEAiXXA\n' +
  'yPxjUYDJ1S28lggn55aNDjArPD1ElhM+rqKtT+c=\n' +
  '-----END RSA PRIVATE KEY-----';
// process.env.ENVIRONMENT === 'development'
//   ? JSON.parse(`"${process.env.PRIVATE_KEY}"`)
//   : process.env.PRIVATE_KEY;
export const JWT_PUBLIC_KEY =
  '-----BEGIN PUBLIC KEY-----\n' +
  'MFswDQYJKoZIhvcNAQEBBQADSgAwRwJAWDEpKT6hFCoQlfprjSY1SCUQiBV7t48t\n' +
  'zgoeqc0Hw6ZLeQ1T3ud/H8nvpf0/J862TV1myLDtbcoL2tVEln9WfwIDAQAB\n' +
  '-----END PUBLIC KEY-----';
// process.env.ENVIRONMENT === 'development'
//   ? JSON.parse(`"${process.env.PUBLIC_KEY}"`)
//   : process.env.PUBLIC_KEY;

export const REFRESH_TOKEN_EXPIRES =
  +process.env.REFRESH_TOKEN_EXPIRES || 7776000; // 6 months maybe
export const ACCESS_TOKEN_EXPIRES = +process.env.ACCESS_TOKEN_EXPIRES || 259200; // 3 days
export const COOKIE_JWT_NAME = process.env.ACCESS_COOKIE_NAME ?? 'token';

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
