const BASE_URL = "http://localhost:3000"

function displayCreateForm() {
    let gameFormDiv = document.getElementById("games-form")
    let html = '<form onClick="createForm(); return false"><label>Name</label><input type="text" id="name"><br><label>Min play time</label><input placeholder="in minutes" type="text" id="min_play_time"><label>Max play time</label><input placeholder="in minutes" type="text" id="max_play_time"><br><label>Min # of players</label><input type="text" id="min_num_players"><label>Max # of players</label><input type="text" id="max_num_players"><br><label>Min age</label><input type="text" id="min_age"><label>Max age</label><input placeholder="enter '100' if no max" type="text" id="max_age"><br><input type="submit" value="Create Game"></form>'
    gameFormDiv.innerHTML = html
}

function getGames(){
    clearCreateForm()
    let all_games = document.getElementById("all-games")
    all_games.innerHTML = "<ul>"
    fetch(BASE_URL + "games.json")
    .then(resp => response.json())
    .then(games => {
        all_games.innerHTML += games.map(game => `<li><a href="#" data-id="${game.id}">${game.name}</a></li>`.join(""))
        all_games.innerHTML = "</ul>"
    })
    
}

function clearCreateForm() {
    let gameFormDiv = document.getElementById("games-form")
    gameFormDiv.innerHTML = ''
}

function displayGames(){
    e.preventDefault()
    clearCreateForm()
}