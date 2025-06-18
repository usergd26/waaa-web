import type { IUserDto } from "./user";

export interface IWebinarDto extends IUserDto {
    webinarId: number,
}