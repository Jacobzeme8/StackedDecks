export class Deck {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.creatorId = data.creatorId
    this.description = data.description
    this.coverImg = data.coverImg
    this.isPublic = data.isPublic || false
    this.exerciseType = data.exerciseType
    // TODO add Bookmark count 
  }
}