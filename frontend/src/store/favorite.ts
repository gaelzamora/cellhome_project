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
    addToFavorite: (item: Product) => void
    removeFromFavorites: (item: Product) => void
}

export const useFavoriteStore = create(persist<State & Actions>((set, get) => ({
    favorites: State.favorites,

    removeAll: () => {
        set({
            favorites: []
        })
    },
    addToFavorite: (product: Product) => {
        const favorites = get().favorites
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