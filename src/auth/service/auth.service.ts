import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { JwtService } from "@nestjs/jwt/dist/jwt.service";
import { SignInDto, SignUpDto } from '../dto/auth.dto';
import * as bcrypt from 'bcrypt'; 
import { Auth } from '../entites/auth.entity';
import { Repository } from 'typeorm/repository/Repository.js';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class AuthService {
   constructor(
          @InjectRepository(Auth) private readonly authR: Repository<Auth>, 
         private jwtService: JwtService
    ) { } 

  async signIn(body: SignInDto): Promise<{data: Auth, token: string}> {
        const { email } = body; // we get the email from the body to find the user in the database
        const auth = await this.authR.findOne({ where: { email } });
        if (!auth) {throw new NotFoundException();}
       
        const authPassword = auth.password;// put the password in of the emial we find in the database 
        const isPasswordValid = await bcrypt.compare(body.password, authPassword); // compare the password body with the one in database
        if (!isPasswordValid) {throw new NotFoundException("Invalid password");}
        // create token here and return it to the user
        const payload = { email: auth.email, role: auth.role };
        const token = this.jwtService.sign(payload, {secret:process.env.JWT_SECRET
        }); 
        return {data: await this.authR.save(auth), token}; 
    }
  
      async signUp(body: SignUpDto):Promise<{data: Auth, token: string}>{
    const saltRounds = 10;
    const password = await bcrypt.hash(body.password, saltRounds);
    const newAuth = {
        ...body,
        password,
        role: 'user', // default role for new users
    }
     const auth = await this.authR.create(newAuth);
     // create token here and return it to the user
     const payload = { email: auth.email, role: auth.role };                      
        const token = this.jwtService.sign(payload, {secret:process.env.JWT_SECRET
        }); 

        return {data: await this.authR.save(auth), token}; 
    }
}
