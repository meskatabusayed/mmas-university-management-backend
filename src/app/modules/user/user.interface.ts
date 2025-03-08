export type TUser = {
    id : string;
    password : string;
    needsPasswordChange : boolean;
    role : "admin" | "Student" | "faculty";
    status : 'in-progress' | 'blocked';
    isDeleted : boolean;
}