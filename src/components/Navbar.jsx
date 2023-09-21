import Link from "next/link"
import Image from "next/image"
export default function NavBar(){
    return (<>
        <div className="h-20 p-2 bg-poke-red flex justify-center items-center shadow-[0_4px-50px-#EF5350]">
        <Link href='/'>
                <Image src="/poked.jpg" width={124} height={36} alt="" />
                {/* <p className="font-great text-yellow-500 h-36">Pokemon</p> */}
                
            </Link>
         
        </div>
        </>
    )
}
// https://api.pikaserve.xyz/pokemon/random
// https://pokeapi.co/api/v2/pokemon/