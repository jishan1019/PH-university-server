import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT || 4000,
  database_url: process.env.DATABASE_URL,
  default_pass: process.env.DEFAULT_PASS,
  jwt_secret: process.env.JWT_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_TOKEN,
  jwt_access_expire_time: process.env.JWT_ACCESS_EXPIRE_TIME,
  jwt_refresh_expire_time: process.env.JWT_REFRESH_EXPIRE_TIME,
};
3;
