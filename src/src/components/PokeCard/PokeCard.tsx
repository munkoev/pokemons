import { useAppDispatch } from "../../app/hooks";
import { IpokeCard, remove } from "../../app/pokeSlice";
import styles from './PokeCard.module.scss'
import delbtnimg from './delete-button.png'

const PokeCard = (props: {card: IpokeCard }) => {
    const dispatch = useAppDispatch();
    const handleClickRemove = () => dispatch(remove(props.card));
    return (<div className={styles.card}>
        <div className={styles.maininfo}>
            <div>
                <img src={props.card.front_default} alt='pokemon_img'/>
            </div>
            <table>
                <tbody>
                    <tr>
                        <td>name:</td>
                        <td><b>{props.card.name}</b></td>
                    </tr>
                    <tr>
                        <td>id:</td>
                        <td><b>{props.card.id}</b></td>
                    </tr>
                    {props.card.abilities.map((e, i) => {
                        return (<tr key={i}>
                            <td>ability{i+1}:</td>
                            <td><b>{e.ability.name}</b></td>
                            </tr>)
                    })}
                </tbody>
            </table>
        </div>
        <div>
            <img className={styles.remove_btn} onClick={handleClickRemove} alt='deletebtn' src={delbtnimg}/>
        </div>
    </div>)
}

export default PokeCard;