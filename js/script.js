let pokemonRepository = (function () {
    //this array contains Pokemon data to be displayed
    let pokemonList = [];

    //api link
    let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
        //check new add is formated correctly before adding to repository
        if (typeof pokemon === 'object' &&
            'name' in pokemon &&
            'height' in pokemon &&
            'type' in pokemon 
            ){
        repository.push(pokemon);
        } else {
            console.log('pokemon is not correct');
        }
    }    

    function getAll() {
        return repository ;
    }

    function addListItem(pokemon){
        // new variable pokemonList
        let pokemonList = document.querySelector('.pokemon-list');

        //new li element
        let listPokemon = document.createElement('li');

        //create button for pokedex with pokemon name
        let button = document.createElement('button');
        button.innerText = pokemon.name;

        //adds button class
        button.classList.add("button-class");

        //append button
        listPokemon.appendChild(button);

        //append listPokemon
        pokemonList.appendChild(listPokemon);

        //add click event listener to button
        button.addEventListener('click', function(event) {
            showDetails(pokemon);
        })
    }

    // load pokemon list from api
    function loadList() {
        return fetch(apiURL).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url,
                };
                add(pokemon);
                //console.log(pokemon);
            });
        }).catch(function(e) {
            console.error(e);
        })
    }


    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem
    };

})();

//add the following pokemon to pokemonList
pokemonRepository.add({name: 'Charmeleon', height: 3.5, type: 'fire'});
pokemonRepository.add({name: 'Charizard', height: 5.5, type: ['fire', 'flying']});
pokemonRepository.add({name: 'Squirtle', height: 1.5, type: 'water'});
pokemonRepository.add({name: 'Wartortle', height: 3, type: 'water'});
pokemonRepository.add({name: 'Blastoise', height: 5, type: 'water'});
pokemonRepository.add({name: 'Caterpie', height: 1, type: 'bug'});

console.log(pokemonRepository.getAll());

//forEach loop to display pokemon list
pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
});



