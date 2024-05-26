import app from './app';
import mongoose from 'mongoose';
import config from './app/config';

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);

    app.listen(config.port, () => {
      console.log(`Server Running on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

bootstrap();
