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
        await Constants.AXIOS_REQUEST.get('?limit=100000&offset=0')
            .then(result => {
                return result.data.results.find((e: IfetchedPokemon) => e.name === val);
            })
            .then(result => {
                return axios.get(result.url)
            })
            .then(result => {
                setStatus('Successfully added pokemon ' + val + ' from text input');
                dispatch(add(result));
            })
            .catch(e => {
                setStatus('Pokemon ' + val + ' not found');
            })
    }
    
    const inputPressEnterHandler = async (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') fetchPokes();
    }
    return { fetchPokes, onChangeHandler, input_status, inputPressEnterHandler }
}

export default useMyHeaderHook;