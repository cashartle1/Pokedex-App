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

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            //add the details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
      }

    //call this function when button is clicked. get pokemon details from sever
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            //pokemon details log to console when button clicked
            console.log(pokemon); 
        });       
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,     
        showDetails: showDetails,   
    };

})();

console.log(pokemonRepository.getAll());

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});



