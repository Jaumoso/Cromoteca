import mongoose from "mongoose";

export const IntermediateDtoStub = () => {
    return {
        userId: new mongoose.Types.ObjectId,
        collectionId: [new mongoose.Types.ObjectId],
    };
};
