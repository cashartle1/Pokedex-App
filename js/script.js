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
            ){
        pokemonList.push(pokemon);
        } else {
            console.log('pokemon is not correct');
        }
    }    

    function getAll() {
        return pokemonList ;
    }

    function addListItem(pokemon){
        // new variable pokemonList
        let pokemonList = document.querySelector('.pokemon-list');

        //new li element
        let listPokemon = document.createElement('li');

        //add new list class
        listPokemon.classList.add("list-group-item");

        //create button for pokedex with pokemon name
        let button = document.createElement('button');
        button.innerText = pokemon.name;

        //adds button class
        button.classList.add("button-class", "btn" , "btn-primary");

        //add button attribute
        button.setAttribute("data-target", "#modal-container");
        button.setAttribute("data-toggle", ".modal");


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

    //call this function when button is clicked. get pokemon details from sever & open modal
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon) 
        });       
    }

    function showModal(pokemon) {
        let modalContainer = $('#modal-container');
        let dialogPromiseReject; // This can be set later, by showDialog
        let modalBody = $(".modal-body");
        let modalTitle = $(".modal-title");
        let modalHeader = $(".modal-header");
        // let $modalContainer = $("#modal-container");
        //clear existing content of the model
        // modalHeader.empty();
        modalTitle.empty();
        modalBody.empty();

        //creating element for name in modal content
        let nameElement = $("<h1>" + pokemon.name + "</h1>");

        // // creating img in modal content
        let imageElementFront = $('<img class="modal-img" style="width:50%">');
        imageElementFront.attr("src", pokemon.imageUrlFront);
        let imageElementBack = $('<img class="modal-img" style="width:50%">');
        imageElementBack.attr("src", pokemon.imageUrlBack);

        // //creating element for height in modal content
        let heightElement = $("<p>" + "height : " + pokemon.height + "</p>");

        // //creating element for weight in modal content        
        let weightElement = $("<p>" + "weight : " + pokemon.weight + "</p>");

        // //creating element for type in modal content
        let typesElement = $("<p>" + "types : " + pokemon.types + "</p>");

        // //creating element for abilities in modal content
        let abilitiesElement = $("<p>" + "abilities : " + pokemon.abilities + "</p>");

        modalTitle.append(nameElement);
        modalBody.append(imageElementFront);
        modalBody.append(imageElementBack);
        modalBody.append(heightElement);
        modalBody.append(weightElement);
        modalBody.append(typesElement);
        modalBody.append(abilitiesElement);


        // //create new div class modal
        // let modal = document.createElement('div');
        // modal.classList.add('modal');

        // //clear all existing modal content
        // modalContainer.innerHTML = '';

        //add new modal content
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'X';
        closeButtonElement.addEventListener('click', hideModal);

        // let titleElement = document.createElement('h1');
        // titleElement.innerText = pokemon.name;

        // let imageElement = document.createElement('img');
        // imageElement.classList.add('modal-image');
        // imageElement.src = pokemon.imageUrl
        
        // let heightElement = document.createElement('p');
        // heightElement.innerText = 'Height: ' + pokemon.height + " ft.";
        
        // let typesElement = document.createElement('p');
        // let typesText = 'Types: ';
        // //to extract each pokemon type from the type array
        // pokemon.types.forEach(function(typeObj, index){
        //     typesText += typeObj.type.name;
        //     if (index < pokemon.types.length -1) {
        //         typesText += ', ';
        //     }
        // });
        // typesElement.innerText = typesText ;
        // modal.appendChild(typesElement);

        // modal.appendChild(closeButtonElement);
        // modal.appendChild(titleElement);
        // modal.appendChild(imageElement);
        // modal.appendChild(heightElement);
        // modal.appendChild(typesElement);
        // modalContainer.appendChild(modal);
        

        // modalContainer.add('.is-visible');

        modalContainer.on('click', (event) => {
            let target = event.target;
            if (target === modalContainer) {
                hideModal();
            }
        });
    }

    function hideModal () {
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
        showDetails: showDetails,   
        showModal: showModal
    };

})();

// console.log(pokemonRepository.getAll());

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});


