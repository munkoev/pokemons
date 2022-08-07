import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AxiosResponse } from "axios";

export interface IpokeCard {
    name: string,
    id: number,
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
    total_added: number,
}

const initialState: IpokeState = {
    cards: [],
    total_added: 0
}

export const pokeSlice = createSlice({
    name: 'poke',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<AxiosResponse<any, any>>) => {
            state.total_added += 1;
            const newpoke: IpokeCard = {
                name: action.payload.data.name,
                id: state.total_added,
                front_default: action.payload.data.sprites.front_default,
                abilities: [...action.payload.data.abilities]
            }
            state.cards.push(newpoke)
        },
        remove: (state, action: PayloadAction<IpokeCard>) => {
            state.cards = [...state.cards.filter((el) => el.id !== action.payload.id)]
        },
        hydrate: (state, action) => {
            return action.payload
        }
    }
})

export const { add, remove, hydrate } = pokeSlice.actions;

export default pokeSlice.reducer;