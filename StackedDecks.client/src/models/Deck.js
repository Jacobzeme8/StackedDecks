export class Deck {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.creatorId = data.creatorId
    this.creator = data.creator
    this.description = data.description
    this.coverImg = data.coverImg
    this.isPublic = data.isPublic || false
    this.exerciseType = data.exerciseType
    this.isCopied = data.isCopied || false
    this.note = data.note || null
    this.noteId = data.noteId || null
    this.exp = data.exp
    // TODO add Bookmark count 
  }
}