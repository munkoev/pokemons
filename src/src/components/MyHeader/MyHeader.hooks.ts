import axios from "axios";
import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { add } from "../../app/pokeSlice";
import { IfetchedPokemon } from "../PokeSlide/PokeSlide.hooks";
import * as Constants from '../../app/constants'

const useMyHeaderHook = () => {
    const [val, setVal] = useState('');
    const onChangeHandler = (e: React.ChangeEvent) => {
        setVal((e?.target as HTMLInputElement).value.toLowerCase())
    }

    const [input_status, setStatus] = useState('');
    const dispatch = useAppDispatch();
    const fetchPokes = async () => {
        const fetched_poke = await Constants.AXIOS_REQUEST.get('?limit=100000&offset=0')
        const f = fetched_poke.data.results.find((e: IfetchedPokemon) => e.name === val)
        if (f) {
            setStatus('Successfully added pokemon ' + val + ' from text input');
            const data = await axios.get(f.url);
            dispatch(add(data));
        } else {
            setStatus('No such pokemon ' + val);
        }
        // (document?.activeElement as HTMLElement).blur();
    }
    
    const inputPressEnterHandler = async (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') fetchPokes();
    }
    return { fetchPokes, onChangeHandler, input_status, inputPressEnterHandler }
}

export default useMyHeaderHook;