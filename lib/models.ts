import exp from "constants";
import { DefaultUser } from "next-auth";


export interface User extends DefaultUser{
    id: string,
    email: string,
    provider: string,
    socialId: string,
    firstName: string,
    lastName: string,
    photo: {
      id: string,
      path: string
    },
    role: Role,
    status: Status,
    createdAt: string,
    updatedAt: string,
    deletedAt: string
  
}
  

export interface Role{
    id: string,
    name: string
}
export interface Status{
    id: string,
    name: string
}
  
export interface LoginResponse{
    refreshToken:string;
    token:string;
    tokenExpires:number;
    user:User;
}