import mongoose from "mongoose";

export const AdvertDtoStub = () => {
    return {
        elementId: new mongoose.Types.ObjectId,
        userId: new mongoose.Types.ObjectId,
        description: 'default description',
        state: 'NUEVO',
        price: 3.5,
        quantity: 2
    };
};
