//this array contains Pokemon data to be displayed
let pokemonList = [
    {name: 'Bulbasaur', height: 2, type: ['grass' , 'poison']},
    {name: 'Zapdos', height: 5, type: ['electric' , 'flying']},
    {name: 'Articuno', height: 5, type: ['ice' , 'flying']},
    {name: 'Dragonite', height: 7, type: ['dragon', 'flying']}
];

// loop to display pokemon list
for (let i = 0; i < pokemonList.length; i++) 
    if(pokemonList[i].height < 5) {
        document.write ( '<p>' + pokemonList[i].name + ' - height (ft): ' + pokemonList[i].height)
    }else if (pokemonList[i].height >= 5) {  
        // conditional to highlight big pokemon
        document.write ('<p>' + pokemonList[i].name + ' - height (ft): ' + pokemonList[i].height + ' ...Wow, that\'s a big Pokemon!'); 
    }

