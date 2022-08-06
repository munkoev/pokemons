import React from "react";
import { IpokeCard } from "../../app/pokeSlice";
import styles from './PokeCard.module.css'

const PokeCard = (props: {card: IpokeCard }) => {
    return (<div className={styles.card}>
        <div>
            <img width="80" src={props.card.front_default} alt='pokemon_img'/>
        </div>
        <div>
            <p>name: {props.card.name}</p>
            <p>id: {props.card.id}</p>
            {props.card.abilities.map((e, i) => {
                return (<p key={i}>ability{i+1}: {e.ability.name}</p>)
            })}
        </div>
    </div>)
}

export default PokeCard;