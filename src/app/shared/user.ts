import { ObjectId } from "mongoose";

export class User {
    _id: ObjectId;
    name: string;
    email: string;
    password : string;
}