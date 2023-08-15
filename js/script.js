let pokemonRepository = (function () {
    //this array contains Pokemon data to be displayed
    let pokemonList = [
        {name: 'Bulbasaur', 
        height: 2, 
        type: ['grass' , 'poison']
        },
        {name: 'Ivysaur',
        height: 3,
        type: ['grass' , 'poison']
        },
        {name: 'Venusaur',
        height: 6.5,
        type: ['grass' , 'poison']
        },
        {name: 'Charmander',
        height: 2,
        type: ['fire']
        }
    ];

    function add(pokemon) {
        if (typeof pokemon === typeof pokemonList){
        pokemonList.push(pokemon);
        console.log(Object.keys(pokemonList))
        }

    }    

    function getAll() {
        return pokemonList ;
    }

    return {
        add: add,
        getAll: getAll
    };

})();

//add the following pokemon to pokemonList
pokemonRepository.add({name: 'Charmeleon', height: 3.5, type: 'fire'});
pokemonRepository.add({name: 'Charizard', height: 5.5, type: ['fire', 'flying']});
pokemonRepository.add({name: 'Squirtle', height: 1.5, type: 'water'});
pokemonRepository.add({name: 'Wartortle', height: 3, type: 'water'});
pokemonRepository.add({name: 'Blastoise', height: 5, type: 'water'});
pokemonRepository.add({name: 'Caterpie', height: 1, type: 'bug'});

//forEach loop to display pokemon list
pokemonRepository.getAll().forEach(function(pokemon) {
    let pokemonDetails = '<p>' + pokemon.name + ", height: " + pokemon.height +'ft. ';
    if (pokemon.height > 5) {
        pokemonDetails += '...Wow, that\'s a big Pokemon!';  
    }

    document.write ( pokemonDetails + '<br>'); 
});

console.log(pokemonRepository.getAll());

