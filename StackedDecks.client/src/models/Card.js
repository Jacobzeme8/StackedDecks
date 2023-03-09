export class Card {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.imgUrl = data.imgUrl
    this.muscleGroup = data.muscleGroup
    this.instruction = data.instruction
    this.difficulty = data.difficulty
    this.equipment = data.equipment
  }
}