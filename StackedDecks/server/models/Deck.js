import { Schema } from "mongoose";

export const DeckSchema = new Schema({
    name: { type: String, maxLength: 20, required: true },
    description: { type: String, maxLength: 1000, required: true },
    coverImg: { type: String, maxLength: 500, required: true },
    creatorId: { type: Schema.Types.ObjectId, required: true },
    isPublic: { type: Boolean, default: false, required: true },
    exerciseType: { type: String, enum: ['arms', 'back', 'cardio', 'core', 'legs', 'shoulders',] }


},
    { timestamps: true, toJSON: { virtuals: true } }
)

DeckSchema.virtual('creator', {
    ref: 'Account',
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true
})

