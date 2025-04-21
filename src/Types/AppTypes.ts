import { Request } from "express";
import { IUser } from "../../Db/Models";



export interface IAppRequest extends Request {
    authUser: IUser
    item: any
}