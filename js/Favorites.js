import { GitHubUser } from './GithubUser.js'

export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)
    this.load()

    // GitHubUser.search('maykbrito').then(user => console.log(user))
  }


    // CARREGAMENTO DOS DADOS
  load() {
    this.entries = JSON.parse(localStorage.getItem('@github-favorites:') || '[]')
  }
  
  async add(username) {
    const user = await GitHubUser.search(username)
    console.log(user)
    

  }
  
  delete(user) {
    // Recriando um array, e retornando falso, o filter elimina do array 
    const filteredEntries = this.entries
      .filter(entry => entry.login !== user.login) 
    
    this.entries = filteredEntries
    this.update()
    }
  }






export class FavoritesView extends Favorites {
  // Constructor recebe o app, e o super extende para o Favorites
  constructor(root) {
    super(root)

    this.tbody = this.root.querySelector('table tbody');
    this.update()
    this.onadd()
  }  

  onadd() {
    const addButton = this.root.querySelector('#star');
    addButton.onclick = () => {
      const value = this.root.querySelector('#input-search').value;
      this.add(value)
    }
  }

  update() {
    this.removeAllTr()
    
    this.entries.forEach(user => {
      const row = this.createRow()
      row.querySelector('.profile-photo').src = `https://github.com/${user.login}.png`;
      row.querySelector('.name').textContent = user.name;
      row.querySelector('.userName').textContent = user.login
      row.querySelector('.repositories').textContent = user.public_repos;
      row.querySelector('.gitFollowers').textContent = user.followers;


      row.querySelector('.remove').onclick = () => {
        const isOk = confirm('Tem certeza que deseja deletar essa linha?');
        if (isOk) {
          this.delete(user)
        }
      }

      this.tbody.append(row)
    })
    
  }

  createRow() {
    
    const tr = document.createElement('tr')
    
    tr.innerHTML = `
    <td class="profile">
      <img class="profile-photo" src="./assets/profileImage.jpg" alt="" />
      <div class="profile-name">
        <p class="name">Mayk Brito</p>
        <p class="userName">/maykbrito</p>
      </div>
    </td>
    <td class="repositories">123</td>
    <td class="gitFollowers">1234</td>
    <td class="remove">Remover</td>
    `

    return tr
  }

  removeAllTr() {
    this.tbody.querySelectorAll('tr').forEach((tr) => {
      tr.remove()
    })
    
  }
}
