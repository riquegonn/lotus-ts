import React from "react";
import styles from "./Pages.module.css";
import perderPeso from "../../assets/png/perder.png";
import manterPeso from "../../assets/png/manter.png";
import ganharPeso from "../../assets/png/ganhar.png";
import stylesInput from "../Input/InputDigit/styles.module.css";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { addSteps, useSteps } from "../../redux/sliceSteps";

const Resultado = () => {
  const { sexo, altura, idade, objetivo, atividadeFisica, peso, step } =
    useSelector(useSteps);

  const dispatch = useDispatch();

  const [tmb, setTmb] = React.useState(0);
  const [tdee, setTdee] = React.useState(0);

  React.useEffect(() => {
    if (sexo === "masculino") {
      setTmb(
        10 * parseInt(peso) + 6.25 * parseInt(altura) - 5 * parseInt(idade) + 5
      );
      if (tmb !== null) switchData(tmb);
    } else if (sexo === "feminino") {
      setTmb(
        10 * parseInt(peso) +
          6.25 * parseInt(altura) -
          5 * parseInt(idade) -
          161
      );
      if (tmb !== null) switchData(tmb);
    }
  }, [objetivo, tmb]);

  function switchData(tmb: number) {
    switch (atividadeFisica) {
      case "sedentario":
        return setTdee(tmb * 1.2);
      case "leveAtivo":
        return setTdee(tmb * 1.375);
      case "ativo":
        return setTdee(tmb * 1.55);
      case "muitoAtivo":
        return setTdee(tmb * 1.725);
      case "extremeAtivo":
        return setTdee(tmb * 1.9);
    }
  }

  const objetivos = {
    title:
      (objetivo === "perder" && "Para perder peso") ||
      (objetivo === "manter" && "Para manter peso") ||
      (objetivo === "ganhar" && "Para ganhar peso"),
    calorias:
      (objetivo === "perder" && (tdee - 250).toFixed(0)) ||
      (objetivo === "manter" && tdee.toFixed(0)) ||
      (objetivo === "ganhar" && (tdee + 300).toFixed(0)),
    desc:
      (objetivo === "perder" &&
        "Para perder de 0,5 a 1kg por semana de forma saudável") ||
      (objetivo === "manter" && "Para manter o peso de forma saudável.") ||
      (objetivo === "ganhar" &&
        "Para ganhar de 0,5 a 1kg por semana de forma saudável."),
    img:
      (objetivo === "perder" && perderPeso) ||
      (objetivo === "manter" && manterPeso) ||
      (objetivo === "ganhar" && ganharPeso),
  };

  React.useEffect(() => {
    if (typeof objetivos.calorias === "string") {
      window.localStorage.setItem("caloriasDiarias", objetivos.calorias);
    }
  }, [objetivos.calorias]);

  return (
    <div className={`animeLeft ${styles.content}`}>
      <div className={styles.form}>
        <h2 className={stylesInput.label}>{objetivos.title}</h2>
        <div className={stylesInput.auxiliar}>
          <p className={styles.result}>{objetivos.calorias}</p>
          <span>kcal</span>
        </div>
        <p className={stylesInput.desc}>{objetivos.desc}</p>
        <Button
          text="ANTE"
          side="left"
          onClick={(e) => {
            e.preventDefault();
            dispatch(addSteps(step - 1));
          }}
        />
      </div>

      {}
      <img
        className="imgPerfil"
        src={objetivos.img ? objetivos.img : undefined}
        alt=""
      />
    </div>
  );
};

export default Resultado;
