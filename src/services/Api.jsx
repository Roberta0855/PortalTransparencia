import axios from "axios";

const api = axios.create({
  baseURL: "https://transparencia.ma.gov.br/api/",
});

export const getDespesas = async (ano, mes, unidade) => {
  try {
    const response = await api.get("consulta-despesas", {
      params: {
        ano,
        mes,
        codigo_ug: unidade,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Erro ao buscar dados da API");
  }
};
