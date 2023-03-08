import mongoose from "mongoose";

const Schema = mongoose.Schema

export const CardSchema = new Schema({
  name: {type: String, required: true},
  muscleGroup: { type:String, required: true, enum: ['arms', 'back', 'core', 'legs', 'shoulders', 'cardio'] },
  instruction: {type: String, required: true, minlength: 10, maxlength: 100},
  difficulty: { type:String, required: true, enum: [ 'beginner', 'intermediate', 'expert' ] },
  imgUrl: { type:String, required: true, maxlength: 500 },
  equipment: { type:String, maxlength: 50  }
},
{ timestamps: true, toJSON: { virtuals: true } }
)