import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../app/hooks";
import buttons from "../buttons.json";
import { updateHistory } from "../features/calculator/historySlice";
import styles from "../styles/Calculator.module.scss";

interface content {
  tileName: string;
  value: string;
  type: string;
  onClick: (event: any) => void;
}

const Calculator: NextPage = () => {
  const allHistory = useAppSelector((state) => state.historyStore.allHistory);
  const dispatch = useDispatch();

  const [x, setX] = useState<string>("");
  const [y, setY] = useState<string>("");
  const [operand, setOperand] = useState<string>("");
  const [result, setResult] = useState<number>(0);
  const setNumber = (val) => {
    let n = val;
    if (!!operand) {
      n = y + n;
      setY(n);
    } else {
      n = x + n;
      setX(n);
    }
  };
  const setOperandValue = async (val) => {
    if (
      val === "+" ||
      val === "-" ||
      val === "*" ||
      val === "/" ||
      val === "%"
    ) {
      if (x === "" && (val === "+" || val === "-")) {
        setX(`${val}`);
      } else {
        setOperand(val);
      }
    }

    if (val === "=") {
      const res: number = await getResult();
      setResult(res);
      const calculation = `${x}${operand}${y} = ${res}`;
      dispatch(updateHistory({ calculation }));
    }
    if (val === "AC") {
      clearAll();
    }
    if (val === "CE") {
      // clear one part
      removeNumber();
    }
    if (val === "C") {
      // clear last digit
      removeLastDigit();
    }
    if (val === ".") {
      appendDecimal();
    }
  };
  const appendDecimal = () => {
    if (operand) {
      //y
      let n = y;
      !!n ? setY(`${n}.`) : setY("0.");
    } else {
      // x
      let n = x;
      !!n ? setX(`${n}.`) : setX("0.");
    }
  };
  const removeNumber = () => {
    if (!!operand) {
      let n = "";
      setY(n);
    } else {
      let n = "";
      setX(n);
    }
  };
  const removeLastDigit = () => {
    if (!!operand) {
      let n = y.slice(0, y.length - 1);
      setY(n);
    } else {
      let n = x.slice(0, x.length - 1);
      setX(n);
    }
  };
  const clearAll = () => {
    setX("");
    setY("");
    setOperand("");
    setResult(0);
  };
  const getResult = () => {
    const a = Number(x);
    const b = Number(y);
    switch (operand) {
      case "+":
        return a + b;

      case "-":
        return a - b;

      case "*":
        return a * b;

      case "/":
        return a / b;

      case "%":
        return a % b;
    }
  };
  const onClickButton = (ctx) => {
    ctx.type === "number" ? setNumber(ctx.value) : setOperandValue(ctx.value);
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Calculator App</title>
      </Head>
      <div className={styles.layout}>
        <div className={styles.content}>
          <div className={styles.result}>
            <div className={styles.calculation}>
              {x}
              {operand ? <> {x ? <>{operand}</> : <></>} </> : <></>}
              {y}
            </div>
            <div className={styles.finalResult}>{result ? result : <></>}</div>
          </div>
          <div className={styles.buttons}>
            {buttons.map((each, i) => (
              <ButtonTile
                key={i}
                tileName={each.tileName}
                value={each.value}
                type={each.type}
                onClick={onClickButton}
              />
            ))}
          </div>
        </div>
        <div className={styles.history}>
          {allHistory.map((x, i) => (
            <div key={i} className={styles.historyText}>
              {x.calculation}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ButtonTile: NextPage<content> = (content) => {
  const sendContent = () => content.onClick(content);
  return (
    <div className={styles.buttonTile} onClick={sendContent}>
      {content.tileName}
    </div>
  );
};

export default Calculator;
