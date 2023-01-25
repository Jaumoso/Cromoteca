export class User{
    _id: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    email: string | undefined;
    password: string | undefined;
    username: string | undefined;
    entryDate: Date | undefined;
    admin: boolean | undefined;
    address!: string;
}