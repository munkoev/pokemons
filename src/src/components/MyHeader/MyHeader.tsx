import styles from './MyHeader.module.scss'
import searchpng from './search.png'
import useMyHeaderHook from './MyHeader.hooks'

const MyHeader = () => {
    const { fetchPokes, onChangeHandler, input_status, inputPressEnterHandler } = useMyHeaderHook();

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