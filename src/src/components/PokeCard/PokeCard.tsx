import React from "react";
import { useAppDispatch } from "../../app/hooks";
import { IpokeCard, remove } from "../../app/pokeSlice";
import styles from './PokeCard.module.css'

const PokeCard = (props: {card: IpokeCard }) => {
    const dispatch = useAppDispatch();
    const handleClickRemove = () => dispatch(remove(props.card));
    return (<div className={styles.card}>
        <div className={styles.maininfo}>
            <div>
                <img width="80" src={props.card.front_default} alt='pokemon_img'/>
            </div>
            <div>
                <p>name: <b>{props.card.name}</b></p>
                <p>id: <b>{props.card.id}</b></p>
                {props.card.abilities.map((e, i) => {
                    return (<p key={i}>ability{i+1}: <b>{e.ability.name}</b></p>)
                })}
            </div>
        </div>
        <div>
            <button className={styles.remove_btn} onClick={handleClickRemove}>X</button>
        </div>
    </div>)
}

export default PokeCard;