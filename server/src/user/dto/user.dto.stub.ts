import mongoose from "mongoose";

export const UserDtoStub = () => {
    return {
        email: 'default email',
        password: 'default password',
        username: 'default username',
        firstName: 'default first name',
        lastName: 'default last name',
        entryData: new Date,
        admin: 0,
        addressId: new mongoose.Types.ObjectId(),
    };
};
