import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bull';
import { AppConsumer } from './app.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'message',
      redis: {
        host: 'localhost',
        port: 6379,
      },
      limiter: {
        max: 1,
        duration: 1000,
      }
    })
  ],
  // controllers: [AppController],
  providers: [AppService, AppConsumer],
})
export class AppModule {}
