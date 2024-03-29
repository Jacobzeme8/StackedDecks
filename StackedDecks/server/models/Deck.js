import { Schema } from "mongoose";

const tag = { type: String, unique: true, enum: ['arms', 'back', 'cardio', 'chest', 'core', 'legs', 'shoulders', 'fullBody', 'lowerBody', 'upperBody'] }

export const DeckSchema = new Schema({
    name: { type: String, maxLength: 20, required: true },
    description: { type: String, maxLength: 1000, required: true },
    coverImg: { type: String, maxLength: 500, default: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8d29ya291dHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" },
    creatorId: { type: Schema.Types.ObjectId, required: true },
    exp: { type: Number, default: 0 },
    isPublic: { type: Boolean, default: false, required: true },
    exerciseType: { type: [tag] },
    noteId: { type: Schema.Types.ObjectId },
    isCopied: { type: Boolean, default: false }


},
    { timestamps: true, toJSON: { virtuals: true } }
)

DeckSchema.virtual('creator', {
    ref: 'Account',
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true
})

DeckSchema.virtual ( 'note', {
    ref: 'Note',
    localField: 'noteId',
    foreignField: '_id',
    justOne: true
} )

DeckSchema.index({ noteId: 1, id: 1}, { unique: true })

