/**
 * Created by anthonyrogers on 6/22/16.
 */
import {Pokemon, PokemonTrainer} from 'pokemon-ts/main'

class Handler implements PokemonTrainer{
    name: string;
    numberOfPokeballs: number;
    pokemon: Array<Pokemon>;
    gymBadges: string[];

    constructor(name, numberOfPokeballs){
        this.name = name;
        this.numberOfPokeballs = numberOfPokeballs;
    }

    attack(pokemon:Pokemon, attackName:string){
        return `${pokemon.name} attacks with ${attackName}`;
    }

    runAway():string{
        return 'Fleeing..'
    }

    healPokemon(pokemon:Pokemon){
        pokemon.heal();
    }
};

function creatMilesTrainer() {

    var Miles = new Handler(name, 6);

    var pikachu = new Pokemon('Pikachu', 'Miles', 25);
    var charizard = new Pokemon('Charizard', 'Miles', 25);
    var worm = new Pokemon('Worm', 'Miles', 25);

    Miles.pokemon = [Pikachu, Charizard, Worm];
    return Miles
}

function creatAvaTrainer() {

    var Ava = new Handler(name, 6);

    var kricketot = new Pokemon('Kricketot', 'Ava', 25);
    var lopunny = new Pokemon('Lopunny', 'Ava', 25);
    var leafeon = new Pokemon('Leafeon', 'Ava', 25);

    Ava.pokemon = [Kricketot, Lopunny, Leafeon];
    return Ava
}

function creatTavasTrainer() {

    var Tavas = new Handler(name, 6);

    var pangoro = new Pokemon('Pangoro', 'Tavas', 25);
    var rhydon = new Pokemon('Rhydon', 'Tavas', 25);
    var cottonee = new Pokemon('Cottonee', 'Tavas', 25);

    Tavas.pokemon = [Pangoro, Rhydon, Cottonee];
    return Tavas
}

function creatTaidenTrainer() {

    var Taiden = new Handler(name, 6);

    var ivysaur = new Pokemon('Ivysaur', 'Taiden', 25);
    var charmeleon = new Pokemon('Charmeleon', 'Taiden', 25);
    var squritle = new Pokemon('Squritle', 'Taiden', 25);

    Taiden.pokemon = [Ivysaur, Charmeleon, Squritle];
    return Taiden
}




