import {create} from 'zustand'
import { persist } from 'zustand/middleware'
import { Product } from '../Interfaces'

interface State {
    favorites: Product[]
}

const State = {
    favorites: []
}


interface Actions {
    changeStateFavorite: (item: Product) => void
    removeFromFavorites: (item: Product) => void
    inFavorite: (item: Product) => boolean
}


export const useFavoriteStore = create(persist<State & Actions>((set, get) => ({
    favorites: State.favorites,

    inFavorite: (product: Product) => {
        const favorites = get().favorites
        const in_favorite = favorites.find(favorite => favorite.id === product.id)
        
        if(in_favorite) {
            return true
        }

        return false
    },
    removeAll: () => {
        set({
            favorites: []
        })
    },
    changeStateFavorite: (product: Product) => {
        const favorites = get().favorites
        const inFavorites = favorites.find(productFavorite => productFavorite.id === product.id)
        
        // Delete product if they are in products
        if(inFavorites) {
            set(state => ({
                favorites: state.favorites.filter(item => item.id !== product.id)
            }))
            return
        }
        
        const addFavorite = [...favorites, {...product}]

        set(() => ({
            favorites: addFavorite
        }))
    },
    removeFromFavorites: (product: Product) => {
        set(state => ({
            favorites: state.favorites.filter(item => item.id !== product.id)
        }))
    }
}),
{
    name: "favorite-storage"
}
))