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
    }

