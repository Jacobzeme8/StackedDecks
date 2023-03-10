import mongoose from "mongoose";

const Schema = mongoose.Schema

export const CardSchema = new Schema({
  name: { type: String, required: true },
  muscleGroup: { type: String, required: true, enum: ['arms', 'back', 'chest', 'core', 'legs', 'shoulders', 'cardio'] },
  instruction: { type: String, required: true, minlength: 10, maxLength: 2000 },
  difficulty: { type: String, required: true, enum: ['beginner', 'intermediate', 'expert'] },
  imgUrl: { type: String, required: true, maxLength: 500 },
  equipment: { type: String, maxLength: 50 }
},
  { timestamps: true, toJSON: { virtuals: true } }
)