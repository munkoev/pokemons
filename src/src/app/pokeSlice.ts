import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchPokes } from "./pokeActions";

export interface IpokeCard {
  name: string;
  id: number;
  front_default: string;
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];
}

interface big extends IpokeCard {}

export type TOperation = "add" | "remove";
export type TStatus = "Success" | "Fail" | "None";

export interface IpokeState {
  cards: IpokeCard[];
  total_added: number;
  lastOperation: TOperation | null;
  lastPoke?: string;
  status: {
    [key in TOperation]: TStatus;
  };
}

const initialState: IpokeState = {
  cards: [],
  total_added: 0,
  lastOperation: null,
  status: {
    add: "None",
    remove: "None",
  },
};

export const pokeSlice = createSlice({
  name: "poke",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchPokes.fulfilled, (state, action) => {
      pokeSlice.caseReducers.add(state, action);
    });
    builder.addCase(fetchPokes.rejected, (state, action) => {
      state.lastOperation = "add";
      state.status.add = "Fail";
      state.lastPoke = action.payload as string;
    });
  },
  reducers: {
    add: (state, action) => {
      state.total_added += 1;
      const newpoke: IpokeCard = {
        name: action.payload.data.name,
        id: state.total_added,
        front_default: action.payload.data.sprites.front_default,
        abilities: [...action.payload.data.abilities],
      };
      state.cards.push(newpoke);
      state.lastPoke = newpoke.name;
      state.status.add = "Success";
      state.lastOperation = "add";
    },
    remove: (state, action: PayloadAction<IpokeCard>) => {
      state.lastPoke = state.cards.find(
        (e) => e.id === action.payload.id
      )?.name;
      state.cards = [
        ...state.cards.filter((el) => el.id !== action.payload.id),
      ];
      state.status.remove = "Success";
      state.lastOperation = "remove";
    },
    hydrate: (state, action) => {
      return action.payload;
    },
  },
});

export const { add, remove, hydrate } = pokeSlice.actions;

export default pokeSlice.reducer;
