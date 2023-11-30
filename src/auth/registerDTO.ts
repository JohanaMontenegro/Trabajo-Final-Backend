import { IsEmail, IsString, MinLength } from "class-validator";
import { Transform } from "class-transformer";

export class RegisterDTO {

    @Transform(({ value }) => value.trim())
    @IsString()
    nombre: string;

    @IsEmail()
    email: string;

    @Transform(({ value }) => value.trim())
    @MinLength(8)
    contraseña: string;
}