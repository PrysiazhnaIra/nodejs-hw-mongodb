import path from 'node:path';

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

// export const ACCESS_TOKEN_LIVE_TIME = 1000; //1sec
// export const REFRESH_TOKEN_LIVE_TIME = 24 * 60 * 60 * 1000; //1day

export const ACCESS_TOKEN_LIVE_TIME = 15 * 60 * 1000; //15min
export const REFRESH_TOKEN_LIVE_TIME = 30 * 24 * 60 * 60 * 1000; //30days

export const SMTP = {
  SMTP_HOST: 'SMTP_HOST',
  SMTP_PORT: 'SMTP_PORT',
  SMTP_USER: 'SMTP_USER',
  SMTP_PASSWORD: 'SMTP_PASSWORD',
  SMTP_FROM: 'SMTP_FROM',
};

export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');
