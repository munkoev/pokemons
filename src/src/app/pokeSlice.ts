import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AxiosResponse } from "axios";

export interface IpokeCard {
    name: string,
    id: string,
    front_default: string
    abilities: {
        ability: {
            name: string,
            url: string
        },
        is_hidden: boolean,
        slot: number
    }[]
}

export interface IpokeState {
    cards: IpokeCard[]
}

const initialState: IpokeState = {
    cards: []
}

export const pokeSlice = createSlice({
    name: 'poke',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<AxiosResponse<any, any>>) => {
            const newpoke: IpokeCard = {
                name: action.payload.data.name,
                id: action.payload.data.id,
                front_default: action.payload.data.sprites.front_default,
                abilities: [...action.payload.data.abilities]
            }
            state.cards.push(newpoke)
        },
        remove: (state, action: PayloadAction<IpokeCard>) => {
            state.cards = [...state.cards.filter((el) => el.id !== action.payload.id)]
        },
    }
})

export const { add, remove } = pokeSlice.actions;

export default pokeSlice.reducer;