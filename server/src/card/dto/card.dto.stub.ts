import mongoose from "mongoose";

export const CardDtoStub = () => {
    return {
        userId: new mongoose.Types.ObjectId,
        collectionId: new mongoose.Types.ObjectId,
        cardId: 1,
        name: 'default name',
        repeated: 0,
        description: 'default description',
        state: 'default state',
        price: 0,
    };
};
