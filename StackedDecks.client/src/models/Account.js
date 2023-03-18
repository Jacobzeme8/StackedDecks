export class Account {
  constructor(data) {
    this.id = data.id
    this.email = data.email
    this.name = data.name
    this.picture = data.picture
    this.coverImg = data.coverImg
    this.exp = data.exp
    this.level = data.level
    this.bio = data.bio
    this.github = data.github
    this.linkedin = data.linkedin
    // TODO add additional properties if needed
  }
}
