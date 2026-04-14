import { Module } from '@nestjs/common';
import { AuthSignInController, AuthSignUpController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';
import { Auth } from './entites/auth.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

const scehema = [Auth]; // it get all table in entity 
@Module({
  imports: [ JwtModule.register({// this registers the JWT module, which allows us to use the JWT service in the user service for authentication and authorization
      global: true, // this makes the JWT module available globally, so we don't have to import it in other modules that need it
      secret: process.env.JWT_SECRET,// this is the secret key that is used to sign the JWT token, it should be stored in an environment variable for security reasons
      signOptions: { expiresIn: '1h' }, // this is the expiration time for the JWT token, it can be set to any value you want    
    }),TypeOrmModule.forFeature(scehema)],
  controllers: [AuthSignInController, AuthSignUpController],
  providers: [AuthService],
})
export class AuthModule {}
