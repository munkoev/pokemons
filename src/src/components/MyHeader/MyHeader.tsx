import React, { useState } from "react";
import styles from './MyHeader.module.css'
import axios from 'axios'
import { add } from '../../app/pokeSlice';
import { useAppDispatch } from '../../app/hooks'

interface IfetchedPokemon {
    name: string,
    url: string
}

const MyHeader = () => {
    const [val, setVal] = useState('');
    const onChangeHandler = (e: React.ChangeEvent) => {
        setVal((e?.target as HTMLInputElement).value.toLowerCase())
    }

    const [input_status, setStatus] = useState('');
    const dispatch = useAppDispatch();
    const inputPressEnterHandler = async (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            const fetched_poke = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
            const f = fetched_poke.data.results.find((e: IfetchedPokemon) => e.name === val)
            if (f) {
                setStatus('Successfully added pokemon ' + val + ' from text input');
                const data = await axios.get(f.url);
                dispatch(add(data));
            } else {
                setStatus('No such pokemon ' + val);
            }
        }
    }

    return (<header className={styles.myheader}>
        <p>Type in pokemon's name and press 'enter' or 'return' (for example pikachu)</p>
        <input
            className={styles.inp}
            id='inp'
            onChange={onChangeHandler}
            onKeyPress={inputPressEnterHandler}
            ></input>
        <div className={input_status.slice(0, 1) === 'S' ? styles.success : styles.fail}>{input_status}</div>
    </header>)
}

export default MyHeader;