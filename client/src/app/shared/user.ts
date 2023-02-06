export class User{
    _id: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    email: string | undefined;
    password: string | undefined;
    username: string | undefined;
    entryDate: string | undefined; // ! he cambiado esto!!
    admin: boolean | undefined;
    address!: string;
}