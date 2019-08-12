const BASE_URL = "http://localhost:3000"

function displayCreateForm() {
    let gameFormDiv = document.getElementById("games-form")
    let html = '<form onsubmit="createGame(); return false"><label>Name</label><input type="text" id="name"><br><label>Min play time</label><input placeholder="in minutes" type="text" id="min_play_time"><label>Max play time</label><input placeholder="in minutes" type="text" id="max_play_time"><br><label>Min # of players</label><input type="text" id="min_num_players"><label>Max # of players</label><input type="text" id="max_num_players"><br><label>Min age</label><input type="text" id="min_age"><label>Max age</label><input placeholder="enter 100 if no max" type="text" id="max_age"><br><input type="submit" value="Create Game"></form>'
    gameFormDiv.innerHTML = html
}

function getGames(){
    removeCreateForm()
    
    fetch(BASE_URL + "/games.json")
    .then(response => response.json())
    .then(games => {
        let all_games = document.getElementById("all-games")
        all_games.innerHTML = "<ul>"
        all_games.innerHTML += games.map(game => {
            return `<li><a href="#" data-id="${game.id}">${game.name}</a></li>`}).join("")
        all_games.innerHTML = "</ul>"
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
    fetch(BASE_URL + `/games/${id}.json`)
    .then(response => response.json())
    .then(game => {
        let all_games = document.getElementById("all-games")
        all_games.innerHTML += `<h3>${game.name}</h3>`
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

    fetch(BASE_URL + "/games.json", {
        method: "POST",
        body: JSON.stringify({ game }),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }).then(response => response.json())
    .then(game => {
        if (game.errors.length === 0) {
            let gamesDiv = document.querySelector("#all-games")
            gamesDiv.innerHTML += '<ul></ul>'
            let gamesUl = document.querySelector("#all-games ul")
            gamesUl.innerHTML += `<li>${game.name}</li>`
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