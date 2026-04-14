import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Roles } from './role.decorator';
@Injectable()
export class UsersGuard implements CanActivate {

  constructor(
    private reflector: Reflector, // this to get the metadata from the decorator Roles
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext) {

    // Get roles from decorator
    const roles = this.reflector.get(Roles, context.getHandler()); //  context.getHandler() is the value of the method that is decorated with @Roles() decorator
    console.log('roles', roles);

    // If no roles defined → allow access public route cuz ther is no roles to check
    if (!roles) {
      return true;
    }

    // Get request object the req object is a body or query or params or headers
    const request = context.switchToHttp().getRequest();

    // Extract token from Authorization header
    // Example: "Bearer TOKEN_HERE"
    // the authorization = `Bearer asvdfasdfasdfsadf`.split(' ', 2) = ['Bearer', 'asvdfasdfasdfsadf']
    // the [1]= `asvdfasdfasdfsadf` this is the token that we need to verify it
    const token = (request.headers.authorization || '   ').split(' ', 2)[1];
    // || is to not show up undefined
    // output: token = asvdfasdfasdfsadf
    // Verify Token
    // const token = this.extractTokenFromHeader(request);
    console.log(token);

    // If no token → block request
    if (!token) {
      throw new UnauthorizedException();
    }

     

    try {
      // Decode and verify JWT token
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      // Check if user role is allowed
      if (roles.includes(payload.role.toLowerCase())) {
        return true;
      } else {
        throw new UnauthorizedException();
      }

    } catch {
      // If token invalid → block request
      throw new UnauthorizedException();
    }
  }
}