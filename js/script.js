let pokemonRepository = (function () {
    //this array contains Pokemon data to be displayed
    let pokemonList = [];

    //api link
    let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
        //check new add is formated correctly before adding to repository
        if (typeof pokemon === 'object' &&
            "name" in pokemon &&
            "detailsUrl" in pokemon
        ) {
            pokemonList.push(pokemon);
        } else {
            console.log('pokemon is not correct');
        }
    }

    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon) {
        // new variable pokemonList
        let pokemonList = document.querySelector('.pokemon-list');

        //new li element
        let listPokemon = document.createElement('li');

        //add new list class
        listPokemon.classList.add("list-group-item", "col");

        //create button for pokedex with pokemon name
        let button = document.createElement('button');
        button.innerText = pokemon.name;

        //adds button class
        button.classList.add("button-class", "btn", "btn-primary");

        //add button attribute
        button.setAttribute("data-bs-target", "#modal-container");
        button.setAttribute("data-bs-toggle", "modal");

        //append button
        listPokemon.appendChild(button);

        //append listPokemon
        pokemonList.appendChild(listPokemon);

        //add click event listener to button
        button.addEventListener('click', function () {
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
        }).catch(function (e) {
            console.error(e);
        })
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            //add the details to the item
            item.imageUrl = details.sprites.other.dream_world.front_default;
            item.height = details.height;
            item.types = [];
            for (var i = 0; i < details.types.name; i++) {
                item.types.push(details.types[i]);
            }
            item.abilities = [];
            for (var i = 0; i < details.abilities.length; i++) {
                item.abilities.push(details.abilities[i].ability.name);
            }
            item.weight = details.weight;
        }).catch(function (e) {
            console.error;
        });
    }

    //call this function when button is clicked. get pokemon details from sever & open modal
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon)
        });
    }

    //display modal with pokemon
    function showModal(pokemon) {
        // let modalContainer = $('#modal-container');
        let modalBody = $('.modal-body');
        let modalTitle = $(".modal-title");
        let modalHeader = $(".modal-header");
        let $modalContainer = $("#modal-container");

        // modalHeader.empty();
        modalTitle.empty();
        modalBody.empty();

        //creating element for name in modal content
        let nameElement = $("<h1>" + pokemon.name + "</h1>");

        // // creating img in modal content
        let imageElement = $('<img class="modal-img">');
        imageElement.attr("src", pokemon.imageUrl);
        imageElement.attr("alt", pokemon.name);

        // //creating element for height in modal content
        let heightElement = $("<p>" + "height : " + pokemon.height + "</p>");

        // //creating element for weight in modal content        
        let weightElement = $("<p>" + "weight : " + pokemon.weight + "</p>");

        // //creating element for type in modal content
        let typesElement = $("<p>" + 'Types: ' + pokemon.types + "</p>");

        // //creating element for abilities in modal content
        let abilitiesElement = $("<p>" + "abilities : " + pokemon.abilities + "</p>");


        modalTitle.append(nameElement);
        modalBody.append(imageElement);
        modalBody.append(heightElement);
        modalBody.append(weightElement);
        modalBody.append(typesElement);
        modalBody.append(abilitiesElement);
    }

    let dialogPromiseReject; //set this later

    function hideModal() {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
        if (dialogPromiseReject) {
            dialogPromiseReject();
            dialogPromiseReject = null;
        }
    };

    //eventListener for ESC to close modal
    window.addEventListener('keydown', (e) => {
        let modalContainer = document.querySelector('#modal-container');
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showModal: showModal,
        hideModal: hideModal,
    };

})();



// console.log(pokemonRepository.getAll());

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});


