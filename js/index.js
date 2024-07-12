document.addEventListener('DOMContentLoaded', () => {
    const search = document.querySelector('#github-form')
    
    // createToggleBtn()
    search.addEventListener('submit', (e) => {
      e.preventDefault()
      clearPreviousResults()
      const searchName = e.target.search.value
      getAllUsers(searchName)
    })
  })
  
  function clearPreviousResults() {
    const resultList = document.querySelector('#user-list')
    resultList.innerText = ''
  }
  
  function renderPerson(person) {
    const card = document.createElement('li')
    const name = person.login
    const personName = name[0].toUpperCase() + name.slice(1)
  
    card.className = 'card'
    card.style.textAlign = 'center'
    card.innerHTML = `
    <div>
      <h2>${personName}</h2>
      <img class='image' src=${person.avatar_url}/>
      <p>
        ${personName}'s profile link <a href='${person.html_url}'>${person.html_url}</a>
      </p>
      <button class='repos-btn'>Repos</button>
    </div>`
    card.querySelector('button').addEventListener('click', () => {
      fetch(`https://api.github.com/users/${name}/repos`)
      .then(res => res.json())
      .then(repos => {
        clearPreviousRepos()
        addTitle(personName)
        repos.forEach((repo, index) => renderRepos(repo, index))
      })
    })
    document.querySelector('#user-list').appendChild(card)
  }
  
  function getAllUsers(name) {
    fetch(`https://api.github.com/search/users?q=${name}`)
      .then(res => res.json())
      .then(data => {
        data.items.forEach(person => renderPerson(person))
      })
  }
  
  function renderRepos(repo, index) {
    const li = document.createElement('li') 
    li.className = 'repo'
    li.textContent = index + '. ' + repo.name
    document.querySelector('#repos-list').appendChild(li)
  }
  
  function clearPreviousRepos() {
    const repos = document.querySelector('#repos-list')
    repos.innerText = ''
  }
  
  function addTitle(name) {
    const h2 = document.createElement('h2')
    h2.textContent = `${name}'s Repos`
    document.querySelector('#repos-list').appendChild(h2)
  }