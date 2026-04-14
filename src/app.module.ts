import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';
import { TasksMiddleware } from './tasks/middleware/tasks.middleware';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot({
      type: 'mariadb',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '',
      database: 'typeorm2',
      entities: ['dist/**/*.entity.js'],
      synchronize: false,// this will create the tables in the database based on the entities we have in our project, but it will not update the tables if we change the entities, so we need to run the migration to update the tables in the database
      }), 
       TasksModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
}) 
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TasksMiddleware)
      .forRoutes('tasks');// middleware will be applied to all routes that start with 'tasks'
  }
} 
