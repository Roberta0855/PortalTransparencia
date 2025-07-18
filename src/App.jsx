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
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);
  const [quantidade, setQuantidade] = useState(0); // ✅ Novo estado

  const buscarDados = async () => {
    setLoading(true);
    setErro(null);
    setDados([]);
    setQuantidade(0);

    try {
      const response = await axios.get(
        `https://transparencia.ma.gov.br/api/consulta-despesas?ano=${ano}&mes=${mes}&codigo_ug=${codigoUG}`
      );

      const resultado = response.data;

      if (!resultado || resultado.length === 0 || resultado.flat().length === 0) {
        setErro("Nenhuma movimentação encontrada para os filtros escolhidos.");
        return;
      }

      setDados(resultado);
      setQuantidade(resultado.flat().length); // ✅ Atualiza quantidade

    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      setErro("Erro ao buscar dados. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const anosDisponiveis = Array.from(
    { length: new Date().getFullYear() - 2018 },
    (_, i) => 2019 + i
  );

  return (
    <div className="container">
      <h1>Portal da Transparência do Maranhão</h1>

      <div className="filtros">
        <select value={ano} onChange={(e) => setAno(Number(e.target.value))}>
          {anosDisponiveis.map((anoOp) => (
            <option key={anoOp} value={anoOp}>
              Ano {anoOp}
            </option>
          ))}
        </select>

        <select value={mes} onChange={(e) => setMes(Number(e.target.value))}>
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

        <button onClick={buscarDados} disabled={loading}>
          {loading ? "Carregando..." : "Buscar"}
        </button>
      </div>

      {/* ✅ Exibir quantidade de movimentações */}
      {!loading && quantidade > 0 && (
        <p style={{ marginTop: "1rem", fontWeight: "bold", fontSize: "1.1rem", textAlign: "center" }}>
          Foram encontradas {quantidade} movimentações financeiras.
        </p>
      )}

      <div className="cards">
        {loading && (
          <p style={{ textAlign: "center", fontStyle: "italic", marginTop: "1rem" }}>
            Carregando dados...
          </p>
        )}

        {erro && (
          <p style={{ color: "red", textAlign: "center", marginTop: "1rem" }}>{erro}</p>
        )}

        {!loading && dados.length > 0 && (
          <>
            <div className="HeaderTable">
              <p>Credor</p>
              <p style={{ marginLeft: "23%" }}>Data</p>
              <p style={{ marginLeft: "14%" }}>Descrição</p>
              <p style={{ marginLeft: "37.5%" }}>Valor</p>
            </div>

            <div className="grid-layout">
              {dados.flat().map((item, index) => (
                <DespesaCard key={index} item={item} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
