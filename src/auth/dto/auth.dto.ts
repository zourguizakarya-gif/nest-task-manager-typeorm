import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";


export class SignInDto {
    @IsNotEmpty({ message: "Email is required" })
    @IsEmail({},{ message: "Please provide a valid email" })
    email: string;
    @IsNotEmpty({ message: "Password is required" })
    @IsString({ message: "Password is required" })
    @MinLength(6, { message: "Password must be at least 6 characters long" })
    @MaxLength(20, { message: "Password must be less than 20 characters long" })
    password: string;
}   
export class SignUpDto {
    @IsNotEmpty({ message: "Email is required" })
    @IsEmail({},{ message: "Please provide a valid email" })
    email: string;
    @IsNotEmpty({ message: "Password is required" })
    @IsString({ message: "Password is required" })
    @MinLength(6, { message: "Password must be at least 6 characters long" })
    @MaxLength(20, { message: "Password must be less than 20 characters long" })
    password: string;
    @IsNotEmpty({ message: "First name is required" })
    @IsString({ message: "First name must be a string" })
    firstName: string;
    @IsNotEmpty({ message: "Last name is required" })
    @IsString({ message: "Last name must be a string" })
    lastName: string;
}   