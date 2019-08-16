const BASE_URL = "http://localhost:3000"

function displayCreateForm(user_id) {
    let gameFormDiv = document.getElementById("games-form")
    let html = `<form onsubmit="createGame(); return false"><label>Name</label><input type="text" id="name"><br><label>Min play time</label><input placeholder="in minutes" type="text" id="min_play_time"><label>Max play time</label><input placeholder="in minutes" type="text" id="max_play_time"><br><label>Min # of players</label><input type="text" id="min_num_players"><label>Max # of players</label><input type="text" id="max_num_players"><br><label>Min age</label><input type="text" id="min_age"><label>Max age</label><input placeholder="enter 100 if no max" type="text" id="max_age"><input type="hidden" id="user_id" value=${user_id}><br><input type="submit" value="Create Game"></form>`
    gameFormDiv.innerHTML = html
}

function getGames(userID, otherUserID){
    removeCreateForm()
    removeUserGames()
    removeInfo()

    fetch(BASE_URL + "/games")
    .then(response => response.json())
    .then(games => {
        let gamesUl = document.getElementById("games-ul")
        gamesUl.innerHTML += games.map(game => { 
            return `<li><a href="#" data-id="${game.id}" data-other="${otherUserID}" data-user="${userID}">${game.name}</a><div id="${game.id}" class="info"></div></li>` }).join("")
        addGamesClick()
    })        
}

function getUserGames(userID){
    removeCreateForm()
    removeAllGames()

    fetch(BASE_URL + `/users/${userID}.json`)
    .then(response => response.json())
    .then(user => {
        let userGamesUl = document.getElementById("user-games")
        userGamesUl.innerHTML += user.games.map(game => { 
             return `<li><a href="#" data-userid="${user.id}" data-gameid="${game.id}" class="user-games">${game.name}</a><div id="user--game${game.id}" class="info"></div></li>` }).join("")
        addUserGamesClick()
    })   
}

function getOtherUserGames(userID) {
    removeAllGames()

    fetch(BASE_URL + `/users/${userID}.json`)
    .then(response => response.json())
    .then(user => {
        let userGamesUl = document.getElementById("user-games")
        userGamesUl.innerHTML += user.games.map(game => { 
             return `<li>${game.name}</li>` }).join("")
        addUserGamesClick()
    })   
}

function removeCreateForm() {
    let gameFormDiv = document.getElementById("games-form")
    if (gameFormDiv !== null) {
        gameFormDiv.innerHTML = ''
    } 
}

function removeAllGames(){
    let userGamesDiv = document.getElementById("user-games")
    userGamesDiv.innerHTML = ''
}

function removeUserGames(){
    let gamesDiv = document.getElementById("games-ul")
    if (gamesDiv !== null) {
        gamesDiv.innerHTML = ''
        }
}

function removeInfo(){
    let info = document.querySelectorAll('.info')
    for (let i = 0; i < info.length; i++){
        info[i].innerHTML = ""
    }
}

function removeButton() {
    let otherGamesButton = document.getElementById("user-games-button")
    if (otherGamesButton !== null) {
        otherGamesButton.innerHTML = ''
        }
}

function displayUserGame(e){
    e.preventDefault()
    removeCreateForm()
    removeInfo()
    let gameID = this.dataset.gameid
    let userID = this.dataset.userid

    fetch(BASE_URL + `/games/${gameID}`)
    .then(response => response.json())
    .then(game => {
        for (let i = 0; i < game.plays.length; i++){
            if (game.plays[i].user_id == userID){
                let play = game.plays[i]
                let userGamesLink = document.getElementById(`user-game${gameID}`)
                userGamesLink.innerHTML += `<div class="info"><h5>Number of Plays: ${play.num_plays}</h5><button onClick="addPlayCount(${gameID}, ${play.id}, ${play.num_plays})">Add Game Play</button></div>`
                let stop
            }
        }  
    })
    addPlaysClick()
}

function displayGame(e){
    e.preventDefault()
    removeCreateForm()
    removeInfo()
    let id = this.dataset.id
    let otherUserID = this.dataset.other 
    let userID = this.dataset.user

    fetch(BASE_URL + `/games/${id}`)
    .then(response => response.json())
    .then(game => {
        let play = game.plays.find(play => play.user_id == userID)
        let gameLink = document.getElementById(`${id}`)
        let gm = new Gm(game)
        gameLink.innerHTML += gm.renderGame(otherUserID, userID, play)  
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
            let gamesUl = document.querySelector("#all-games ul")
            gamesUl.innerHTML += gm.renderGame()
            removeCreateForm()
            removeInfo()
        } else {
            let gameFormDiv = document.getElementById("games-form")
            gameFormDiv.innerHTML += "Cannot create game: " 
             game.errors.forEach(function(el) { 
                gameFormDiv.innerHTML += `${el}. ` 
            })
        }
    })
}

function addPlayCount(gameID, playID, numPlays){
    removeCreateForm()
    removeInfo()
    numPlays++
    var token = Rails.csrfToken()

    fetch(BASE_URL + `/games/${gameID}/plays/${playID}`, {
        method: "PATCH",
        body: JSON.stringify({ num_plays: numPlays }),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "X-CSRF-TOKEN": token
        }, 
        credentials: "include"
    // }).then(response => response.json())
    // .then(game => {
    //     $(`#games${gameID}`).innerHTML = ''
    //     gamesUl.innerHTML += gm.renderGame()
    //     removeCreateForm()
    //     removeInfo()
     }).then(response => response.json()
     ).then(play => console.log(play))
}

function addGameToUser(gameID, userID) {
    removeInfo()

    fetch(BASE_URL + "/games/${gameID}/plays", {
        method: "POST",
        body: JSON.stringify({ play }),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }).then(response => response.json())
    .then(play => {
        if (game !== undefined) {
            let gm = new Gm(game)
            let gamesUl = document.querySelector("#all-games ul")
            gamesUl.innerHTML += gm.renderGame()
            removeCreateForm()
            removeInfo()
        } else {
            let gameFormDiv = document.getElementById("games-form")
            gameFormDiv.innerHTML += "Cannot create game: " 
             game.errors.forEach(function(el) { 
                gameFormDiv.innerHTML += `${el}. ` 
            })
        }
    })
}

function removeGameFromUser(gameID, userID) {

}

function addGamesClick(){
    let games = document.querySelectorAll('li a')
    for (let i = 0; i < games.length; i++){
        games[i].addEventListener('click', displayGame)
    }
}

function addUserGamesClick(){
    let games = document.querySelectorAll('.user-games')
    for (let i = 0; i < games.length; i++){
        games[i].addEventListener('click', displayUserGame)
    }
}

function addPlayCountsClick(){
    let userGames = document.querySelectorAll('.user-games')
    for (let i = 0; i < userGames.length; i++){
        userGames[i].addEventListener('click', addPlay)
    }
}


class Gm{
    constructor(game){
        this.id = game.id
        this.name = game.name
        this.min_play_time = game.min_play_time
        this.max_play_time = game.max_play_time
        this.min_num_players = game.min_num_players
        this.max_num_players = game.max_num_players
        this.min_age = game.min_age
        this.max_age = game.max_age
    }

    renderGame(otherUserID, userID){
        // for (let el in this){
        //     if (el.value === undefined) {
        //         el = "*"
        //         let stop
        //     }
        // }
        if (this.min_play_time === null){
            this.min_play_time = "*"
        }
        if (this.max_play_time === null){
            this.max_play_time = "*"
        }
        if (this.min_num_players === null){
            this.min_num_players = "*"
        }
        if (this.max_num_players === null){
            this.max_num_players = "*"
        }
        if (this.min_age === null){
            this.min_age = "*"
        }
        if (this.max_age === null){
            this.max_age = "*"
        }

        if (otherUserID === userID && play === undefined) {
            return `<h3>${this.name}</h3><p>Play Time: ${this.min_play_time} - ${this.max_play_time}</p><p>Number of Players: ${this.min_num_players} - ${this.max_num_players}</p><p>Ages: ${this.min_age} - ${this.max_age}</p><button onClick="addGameToUser(${this.id}, ${userID})">Add Game to Your Collection</button>`
        } else if (otherUserID === userID) {
            return `<h3>${this.name}</h3><p>Play Time: ${this.min_play_time} - ${this.max_play_time}</p><p>Number of Players: ${this.min_num_players} - ${this.max_num_players}</p><p>Ages: ${this.min_age} - ${this.max_age}</p><button onClick="removeGameFromUser(${this.id}, ${userID})">Add Game to Your Collection</button>`
        } else {
            return `<h3>${this.name}</h3><p>Play Time: ${this.min_play_time} - ${this.max_play_time}</p><p>Number of Players: ${this.min_num_players} - ${this.max_num_players}</p><p>Ages: ${this.min_age} - ${this.max_age}</p>`
        }
    }
}

window.addEventListener('load', function(){
    addUserGamesClick()
})