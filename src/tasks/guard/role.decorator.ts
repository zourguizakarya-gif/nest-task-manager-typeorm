import {Reflector} from '@nestjs/core';

export const Roles = Reflector.createDecorator<string[]>();
 // take list of strings in it take @Roles(['admin', 'manager']) and return it to the guard to check if the user has the required role to access the route