import React, { useEffect, useState } from 'react';
import axios from 'axios'
import PokemonList from './PokemonList/PokemonList';

const Main = () => {
//OBJECT POKEMON ES UN ARRAY DE OBJETOS
  const [namePokemon, setNamePokemon] = useState(""); // Para guardar el nombre del pokemon
  const [objectPokemon, setObjectPokemon] = useState([]); // Para guardar el objeto
  const [input, setInput] = useState('');

  // equivale a un componentDidUpdate()
  useEffect(() => {
    async function fetchData() {
      try {
        // Petición HTTP
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${namePokemon}`);
        const dataPokemon = res.data
        setInput("")

        setNamePokemon(dataPokemon.name)
        //usar pokemon

        setObjectPokemon([...objectPokemon, dataPokemon])


        console.log("Este es el objectPokemon:", objectPokemon)
        console.log("Este es el namePokemon:", namePokemon)
      } catch (e) {
        console.log(e)
        setNamePokemon("")
        setObjectPokemon({})
      }
    }
    if (namePokemon !== "") {
      fetchData();
    }
  }, [namePokemon]); // componentDidUpdate


  const handleSubmit = e => {
    e.preventDefault();
    setNamePokemon(e.target.input.value.toLowerCase())
  };

  const takeChangeInput = (e) => {
    setInput(e.target.value);
  };


  return <section>
    <h1>Catch a pokemon:</h1>
    <form onSubmit={handleSubmit}>
      <input name="input" type="text" value={input} onChange={takeChangeInput} />
      <button type="submit"> Search </button>
    </form>
    <PokemonList data={objectPokemon} />
  </section>
};

export default Main;
