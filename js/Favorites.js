import { GithubUser } from './GithubUser.js'

export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)
  }
}

export class FavoritesView extends Favotires {
  constructor(root) {
    super(root)

    console.log('estou no FavoritesView!')
  }
}
