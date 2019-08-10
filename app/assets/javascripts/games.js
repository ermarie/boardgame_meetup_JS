function displayCreateForms() {

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