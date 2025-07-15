// Dashboard.jsx
import { useEffect, useState } from "react";
import { getDespesas } from "../services/api";
import FilterBar from "../components/FilterBar";
import DataCard from "../components/DataCard";
import DataTable from "../components/DataTable";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

export default function Dashboard() {
  const [ano, setAno] = useState(2023);
  const [mes, setMes] = useState(4);
  const [unidade, setUnidade] = useState("230901");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setErro(null);
      try {
        const despesas = await getDespesas(ano, mes, unidade);
        setData(despesas);
      } catch (err) {
        setErro(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [ano, mes, unidade]);

  return (
    <div className="dashboard-container">
      <h1>Portal da Transparência do Maranhão</h1>
      <FilterBar
        ano={ano}
        setAno={setAno}
        mes={mes}
        setMes={setMes}
        unidade={unidade}
        setUnidade={setUnidade}
      />
      {loading && <Loader />}
      {erro && <ErrorMessage message={erro} />}
      {!loading && !erro && (
        <>
          <div className="cards">
            <DataCard title="Total de Gastos" value={data.reduce((acc, item) => acc + parseFloat(item.valor_emp), 0)} />
            <DataCard title="Quantidade de Registros" value={data.length} />
            <DataCard title="Ano Selecionado" value={ano} />
          </div>
          <DataTable data={data} />
        </>
      )}
    </div>
  );
}
