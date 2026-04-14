import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { SignInDto, SignUpDto } from '../dto/auth.dto';

@Controller('sign-in')
export class AuthSignInController {
  constructor(private readonly authService: AuthService) {}

// decs sign in user
// @route POST /sign-in
// @access [admin, manager, user] 
@Post()
 signIn( @Body(new ValidationPipe({whitelist: true, forbidNonWhitelisted:true}))
          body: SignInDto
        )
    {
    return this.authService.signIn(body); 
}
}

@Controller('sign-up')
export class AuthSignUpController {
    constructor(private readonly authService: AuthService) { }

// decs sign up user
// @route POST /sign-up
// @access [admin, manager, user] 
@Post()
//@Roles(['admin', 'manager', 'user']) cuz hz dont have role yet the token
signUp(@Body(new ValidationPipe({whitelist:true, forbidNonWhitelisted:true}))
        body: SignUpDto

) {
    return this.authService.signUp(body); 
}

}

