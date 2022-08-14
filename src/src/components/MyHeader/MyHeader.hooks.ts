import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import styles from "./MyHeader.module.scss";
import { fetchPokes as fp } from "../../app/pokeActions";

const useMyHeaderHook = () => {
  const { status, lastOperation, lastPoke } = useAppSelector(
    (state) => state.poke
  );
  const [val, setVal] = useState<string>("");
  const onChangeHandler = (e: React.ChangeEvent) => {
    setVal((e?.target as HTMLInputElement).value.toLowerCase());
  };
  const getStatusData = () => {
    if (!lastOperation) {
      return [];
    }
    const successText = `Successfuly ${lastOperation} ${lastPoke}`;
    const failText = `Failed to ${lastOperation} ${lastPoke}`;
    return status[lastOperation] === "Success"
      ? [successText, styles.success]
      : [failText, styles.fail];
  };

  const dispatch = useAppDispatch();
  const fetchPokes = () => {
    dispatch(fp(val));
  };

  const inputPressEnterHandler = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter") fetchPokes();
  };

  return { fetchPokes, onChangeHandler, inputPressEnterHandler, getStatusData };
};

export default useMyHeaderHook;
