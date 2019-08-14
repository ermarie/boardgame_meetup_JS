const BASE_URL = "http://localhost:3000"

function displayCreateForm(user_id) {
    let gameFormDiv = document.getElementById("games-form")
    let html = `<form onsubmit="createGame(); return false"><label>Name</label><input type="text" id="name"><br><label>Min play time</label><input placeholder="in minutes" type="text" id="min_play_time"><label>Max play time</label><input placeholder="in minutes" type="text" id="max_play_time"><br><label>Min # of players</label><input type="text" id="min_num_players"><label>Max # of players</label><input type="text" id="max_num_players"><br><label>Min age</label><input type="text" id="min_age"><label>Max age</label><input placeholder="enter 100 if no max" type="text" id="max_age"><input type="hidden" id="user_id" value=${user_id}><br><input type="submit" value="Create Game"></form>`
    gameFormDiv.innerHTML = html
}

function getGames(){
    removeCreateForm()

    fetch(BASE_URL + "/games")
    .then(response => response.json())
    .then(games => {
        let gamesUl = document.getElementById("games-ul")
        gamesUl.innerHTML += games.map(game => { 
            return `<li><a href="#" id="${game.id}" data-id="${game.id}">${game.name}</a></li>` }).join("")
            addClick()
    })

        
}

function removeCreateForm() {
    let gameFormDiv = document.getElementById("games-form")
    gameFormDiv.innerHTML = ''
}

function displayGame(e){
    e.preventDefault()
    removeCreateForm()
    let id = this.dataset.id

    fetch(BASE_URL + `/games/${id}`)
    .then(response => response.json())
    .then(game => {
        let all_games = document.getElementById("all-games")
        all_games.innerHTML += `<h3>${game.name}</h3><p>Play Time: ${game.min_play_time} - ${game.max_play_time}</p><p>Number pf Players: ${game.min_num_players} - ${game.max_num_players}</p><p>Ages: ${game.min_age} - ${game.max_age}</p>`
        // let gameLi = document.getElementById(`${id}`)
        // gameLi.append += `<h3>${game.name}</h3><p>Play Time: ${game.min_play_time} - ${game.max_play_time}</p><p>Number pf Players: ${game.min_num_players} - ${game.max_num_players}</p><p>Ages: ${game.min_age} - ${game.max_age}</p>`
    
    })
}

function createGame(){
    const game = {
        name: document.getElementById("name").value,
        min_play_time: document.getElementById("min_play_time").value,
        max_play_time: document.getElementById("max_play_time").value,
        min_num_players: document.getElementById("min_num_players").value,
        max_num_players: document.getElementById("max_num_players").value,
        min_age: document.getElementById("min_age").value,
        max_age: document.getElementById("max_age").value
    }

    fetch(BASE_URL + "/games", {
        method: "POST",
        body: JSON.stringify({ game }),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }).then(response => response.json())
    .then(game => {
        if (game !== undefined) {
            let gm = new Gm(game)
            let gamesDiv = document.querySelector("#all-games")
            gamesDiv.innerHTML += '<ul></ul>'
            let gamesUl = document.querySelector("#all-games ul")
            gamesUl.innerHTML += gm.renderGame()
            removeCreateForm()
        } else {
            let gameFormDiv = document.getElementById("games-form")
            gameFormDiv.innerHTML += "Cannot create game: " 
             game.errors.forEach(function(el) { 
                gameFormDiv.innerHTML += `${el}. ` 
            })
        }
    })
}

function addClick(){
    let games = document.querySelectorAll('li a')
    for (let i = 0; i < games.length; i++){
        games[i].addEventListener('click', displayGame)
    }
}

// function getUserGames() {

// }

class Gm{
    constructor(game){
        this.id = game.id
        this.name = game.name
        this.min_play_time = game.min_play_time
        this.max_play_time = game.max_play_time
        this.min_num_players = game.min_num_players
        this.max_num_players = game.max_num_players
        this.id = game.min_age
        this.max_age = game.max_age
    }

    renderGame(){
        return `<li><a href="#" data-id="${this.id}" onClick="displayGame(${this.id})">${this.name}</a></li>`
    }
}

window.addEventListener('load', function(){
    addClick()
})