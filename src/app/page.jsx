"use client";
import { useState, useEffect } from "react";

export default function Page() {
  const [product, setProduct] = useState([]);
  const [typesData, setTypesData] = useState([]);
  const [pageno, setPageno] = useState(1);
  const handlePrev = () => {
    if (pageno > 1) {
      const newPageNo = pageno - 1;
      setPageno(newPageNo);

      // Scroll to the top of the page
      window.scrollTo({ top: 0, behavior: "smooth" });

      fetchPokemonData(newPageNo);
    }
  };
  const handleNext = () => {
    const totalPages = Math.ceil(1000 / 20);
    if (pageno < totalPages) {
      setPageno(pageno + 1);

      // Scroll to the top of the page
      window.scrollTo({ top: 0, behavior: "smooth" });

      fetchPokemonData(pageno + 1);
    }
  };
  const fetchPokemonData = async (page) => {
    const limit = 20;
    const offset = (page - 1) * limit;
  
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
      );
      const data = await response.json();
  
      // Update the data for each Pokémon to include the number and image URL
      const updatedData = await Promise.all(
        data.results.map((item, index) => {
          const pokemonNumber = index + 1 + offset;
          const paddedPokemonNumber = `00${pokemonNumber}`.slice(-3); // Pad the number to three digits
          const imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedPokemonNumber}.png`;
          return { ...item, pokemonNumber, imageUrl };
        })
      );
  
      setProduct(updatedData);
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    }
  };


  const fetchTypesData = async (index) => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${index + 1}/`
      );
      const data = await response.json();
      return data.types;
    } catch (error) {
      console.error("Error fetching type data:", error);
      return [];
    }
  };

  useEffect(() => {
    fetchPokemonData(pageno);
  }, [pageno]);

  useEffect(() => {
    const fetchTypes = async () => {
      const types = await Promise.all(
        product.map(async (item, index) => await fetchTypesData(index))
      );
      setTypesData(types);
    };

    fetchTypes();
  }, [product]);

  return (
    <>
      <div className="flex flex-wrap justify-center mx-auto">
        {product.map((item, index) => (
          <div key={index} className="p-4">
            <div className="bg-gray-200 py-4 px-6 rounded">
              <p className="text-blue-400 font-semibold text-2xl">
                {item.pokemonNumber}
              </p>
              <img
                src={item.imageUrl}
                alt={`${item.name} image`}
                className="h-[152px] w-[152px] sm:h-[200px] sm:w-[200px]"
              />
              <h3 className="flex justify-center text-3xl capitalize">
                {item.name}
              </h3>
              <div className="flex justify-center">
                {typesData[index] &&
                  typesData[index].map((type, typeIndex) => (
                    <span key={typeIndex} className="capitalize text-sm">
                      <span
                        className={`text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded type-${type.type.name}`}
                      >
                        {type.type.name}
                      </span>
                      {typeIndex < typesData[index].length - 1}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="container mx-auto flex flex-wrap justify-between pb-8 ">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full disabled:bg-gray-700"
          onClick={handlePrev}
          disabled={pageno === 1 ? true : false}
        >
          Previous
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full  disabled:bg-gray-700"
          onClick={handleNext}
          disabled={1000 / 20 - pageno < 1 ? true : false}
        >
          Next
        </button>
      </div>
    </>
  );
}
