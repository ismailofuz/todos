import { IsEnum, IsString } from "class-validator";
import { Status } from "src/enum";

export class CreateTodoDto{
    @IsString()
    name: string;

    @IsEnum(Status)
    status: Status;
}