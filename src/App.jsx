import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { unidades } from "./data/Unidades";
import DespesaCard from "./components/DespesaCard";

function App() {
  const [ano, setAno] = useState(2023);
  const [mes, setMes] = useState(1);
  const [codigoUG, setCodigoUG] = useState("");
  const [dados, setDados] = useState([]);

  const buscarDados = async () => {
    try {
      const response = await axios.get(
        `https://transparencia.ma.gov.br/api/consulta-despesas?ano=${ano}&mes=${mes}&codigo_ug=${codigoUG}`
      );
      setDados(response.data);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  return (
    <div className="container">
      <h1>Portal da Transparência do Maranhão</h1>

      <div className="filtros">
        <input
          type="number"
          value={ano}
          onChange={(e) => setAno(e.target.value)}
          placeholder="Ano"
        />

        <select value={mes} onChange={(e) => setMes(e.target.value)}>
          {Array.from({ length: 12 }, (_, i) => (
            <option value={i + 1} key={i + 1}>
              Mês {i + 1}
            </option>
          ))}
        </select>

        <select value={codigoUG} onChange={(e) => setCodigoUG(e.target.value)}>
          <option value="">Selecione a unidade</option>
          {unidades.map((ug) => (
            <option key={ug.codigo_unidade} value={ug.codigo_unidade}>
              {ug.nome_amigavel}
            </option>
          ))}
        </select>

        <button onClick={buscarDados}>Buscar</button>
      </div>

      <div className="cards">
        {dados.map((item, index) => (
          <DespesaCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

export default App;
