import { Module } from '@nestjs/common';
import { KnexModule } from 'nestjs-knex';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    KnexModule.forRoot({
      config: {
        client: 'postgres',
        connection: {
          host: 'localhost',
          port: 55000,
          user: 'postgres',
          password: 'postgrespw',
          database: 'postgres',
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
