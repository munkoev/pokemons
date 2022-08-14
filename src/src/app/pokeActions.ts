import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IfetchedPokemon } from "../components/PokeSlide/PokeSlide.hooks";
import * as Constants from "./constants";
import { IpokeCardBig } from "./pokeSlice";

export const fetchPokes = createAsyncThunk<IpokeCardBig, string>(
  "fetchPokes",
  async (val, { rejectWithValue }) => {
    try {
      const allPokes = await Constants.AXIOS_REQUEST.get(
        "?limit=100000&offset=0"
      );

      const poke = allPokes.data.results.find(
        (e: IfetchedPokemon) => e.name === val
      );

      return (await axios.get(poke.url)) as IpokeCardBig;
    } catch {
      throw rejectWithValue(val);
    }
  }
);
