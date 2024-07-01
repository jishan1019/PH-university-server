import app from './app';
import mongoose from 'mongoose';
import config from './app/config';
import { Server } from 'http';
import seedSuperAdmin from './app/DB';

let server: Server;

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    seedSuperAdmin();

    server = app.listen(config.port, () => {
      console.log(`Server Running on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

bootstrap();

//unhandledRejection for asynchronous code
//unhandledRejection for synchronous code

process.on('unhandledRejection', () => {
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on('uncaughtException', () => {
  process.exit(1);
});
