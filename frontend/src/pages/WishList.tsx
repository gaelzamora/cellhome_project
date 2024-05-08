import { BookmarkIcon } from "@heroicons/react/24/outline"
import { Link } from "react-router-dom"
import { useFavoriteStore } from "../store/favorite"
import WishCardItem from "../components/WishCardItem"
import { useEffect, useState } from "react"

function WishList() {
    const [EmptyFavorites, setEmptyFavorites] = useState(true)
    const favorites = useFavoriteStore(state => state.favorites)

    useEffect(() => {
        if(favorites.length !== 0) {
            setEmptyFavorites(false) 
            return
        }
       setEmptyFavorites(true)
    }, [favorites])

    return (
        <main className="md:px-52">
            <div className="text-[22px] sticky top-0 py-3 font-semibold tracking-tighter">
            Your Saves
            </div>
        
            <section className="p-3 text-center">
                <p className="text-[4em] font-bold tracking-tighter">Your Saves</p>
                <center className="text-gray-700 font-semibold text-[25px] mt-5 max-w-[700px] mx-auto">
                Continue shopping the products you’ve previously 
                saved. Share them with friends, family, and even 
                Apple Specialists to get help finding what’s right 
                for you.
                </center>
            </section>
            <hr />
            {!EmptyFavorites && (
                <section className="py-32 px-5 w-[100%]">
                    <div className="flex tracking-tighter items-center border-b-2 border-gray-300 pb-3">
                        <p className="text-[2em] font-semibold">Saved by your</p>
                        <div className="flex flex-1" />
                        <Link to={'/'} className="text-blue-500 text-[18px] font-semibold">Edit</Link>
                    </div>

                    <div className="grid grid-cols-2 px-14 my-5">
                        {favorites.map((favoriteProduct, index) => (
                            <WishCardItem key={index} product={favoriteProduct} />
                        ))}
                    </div>
                </section>

            )}

            {EmptyFavorites && (
                <section className="py-40 text-center">
                    <center>
                        <BookmarkIcon width={70} />
                    </center>
                    <p className="text-[25px] font-semibold text-gray-800">Save your first item.</p>
                    <Link to={'/store'} className="text-blue-500 font-semibold">Shop apple.com</Link>
                </section>
            )}

        </main>
    )
}

export default WishList