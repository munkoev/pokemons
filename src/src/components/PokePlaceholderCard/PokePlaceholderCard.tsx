import styles from "./PokePlaceholderCard.module.scss";

const PokePlaceholderCard = (props: { ind: number }) => {
  return (
    <div
      key={props.ind}
      className={[styles.smallcard, styles.noselect].join(" ")}
    >
      <img className={styles.img} alt="" src={""} />
      <div className={"pokename"}></div>
    </div>
  );
};

export default PokePlaceholderCard;
