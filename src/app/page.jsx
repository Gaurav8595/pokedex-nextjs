'use client'
import { useState, useEffect } from 'react';

export default function Page() {
  const [product, setProduct] = useState([]);
  const [typesData, setTypesData] = useState([]);
  
  const fetchPokemonData = async () => {
    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
      const data = await response.json();
      setProduct(data.results);
    
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    }
  };

  const fetchTypesData = async (index) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${index + 1}/`);
      const data = await response.json();
      return data.types;
      
    } catch (error) {
      console.error("Error fetching type data:", error);
      return [];
    }
  };

  useEffect(() => {
    fetchPokemonData();
  }, []);

  useEffect(() => {
    const fetchTypes = async () => {
      const types = await Promise.all(product.map(async (item, index) => await fetchTypesData(index)));
      setTypesData(types);
    };

    fetchTypes();
  }, [product]);

  return (
    <>
      <div className='flex flex-wrap justify-center mx-auto'>
        {product.map((item, index) => (
          <div key={index} className='p-4'>
            <div className='bg-gray-200 py-4 px-6 rounded'>
              <p className='text-blue-400 font-semibold text-2xl'>{index + 1}</p>
              <img
                src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${(`00${index + 1}`).slice(-3)}.png`}
                alt={`${item.name} image`}
                className='h-[152px] w-[152px] sm:h-[200px] sm:w-[200px]'
              />
              <h3 className='flex justify-center text-3xl capitalize'>{item.name}</h3>
              <div className='flex justify-center'>
                {typesData[index] &&
                  typesData[index].map((type, typeIndex) => (
                    <span key={typeIndex} className='capitalize text-sm'>
                      <span className='text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded style={}'>{type.type.name}</span>
                      {typeIndex < typesData[index].length - 1}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}











// import {useState, useEffect }from 'react'
// export default function Page(){
//   const [product,setProduct]=useState([])
//   const myFunction = async ()=>{
//     let data = await fetch("https://pokeapi.co/api/v2/pokemon/")
//     data = await data.json()
//     // console.log(data)
//     setProduct(data.results)
//   }
//   useEffect(() => {
//   myFunction();
// },[]);
//   return (
//     <>

// <div className='flex flex-wrap justify-center mx-auto'>

//     {
//   product.map((item, index) => (
//     <div key={index} className='p-4'>
//       <div className='bg-gray-200 py-4 px-6 rounded'>
//         <p><p className='text-blue-400 font-semibold text-2xl'>{index+1}</p></p>
//       <img
//         src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${(`00${index + 1}`).slice(-3)}.png`}
//         alt="{item.name}+ image"
//         className='h-[152px] w-[152px] sm:h-[200px] sm:w-[200px] '
//       />
      
//       <h3><p className='flex justify-center text-3xl capitalize'>{item.name}</p></h3>
//       </div>
//     </div>
//   ))
// }
// </div>

//     </>
//   )
// }