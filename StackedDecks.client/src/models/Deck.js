export class Deck {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.creatorId = data.creatorId
    this.description = data.description
    this.coverImg = data.coverImg
    this.public = data.public
    this.exerciseType = data.exerciseType
    // TODO add Bookmark count 
  }
}