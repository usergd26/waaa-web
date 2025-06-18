import type { IUserDto } from "./User";

export interface IWebinarDto extends IUserDto {
    webinarId: number,
}