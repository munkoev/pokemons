import React, { useState } from "react";
import styles from './MyHeader.module.css'
import axios from 'axios'
import { add } from '../../app/pokeSlice';
import { useAppDispatch } from '../../app/hooks'
import searchpng from './search.png'

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
    const fetchPokes = async () => {
        const fetched_poke = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
        const f = fetched_poke.data.results.find((e: IfetchedPokemon) => e.name === val)
        if (f) {
            setStatus('Successfully added pokemon ' + val + ' from text input');
            const data = await axios.get(f.url);
            dispatch(add(data));
        } else {
            setStatus('No such pokemon ' + val);
        }
        (document?.activeElement as HTMLElement).blur();
    }

    const inputPressEnterHandler = async (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') fetchPokes();
    }

    return (<header className={styles.myheader}>
        <p>1) Type in pokemon's name (for example pikachu)</p>
        <p>2) press 'enter' or click/tap find button</p>
        <p>OR</p>
        <p>1) choose from slider and click/tap on pokemon.</p>
        <div className={styles.inp_wrapper}>
            <input
                className={styles.inp}
                id='inp'
                onChange={onChangeHandler}
                onKeyPress={inputPressEnterHandler}
            ></input>
            <img
                className={styles.img}
                alt=''
                src={searchpng}
                onClick={fetchPokes}/>
        </div>
        <div className={input_status.slice(0, 1) === 'S' ? styles.success : styles.fail}>{input_status}</div>
    </header>)
}

export default MyHeader;