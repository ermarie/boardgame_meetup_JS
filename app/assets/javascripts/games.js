function displayCreateForms() {

}

function getGames(){
    clearPage()
    let all_games = document.getElementById("all-games")
    all_games.innerHTML = "<ul>"
    fetch(BASE_URL + "games.json")
    .then(resp => response.json())
    .then(games => {
        all_games.innerHTML += games.map(game => <li><a href="#" data-id="${game.id}">${game.name}</a></li>)
        all_games.innerHTML = "</ul>"
    })
    
}

function clearPage() {

}