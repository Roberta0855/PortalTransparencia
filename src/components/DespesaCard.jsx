import React from "react";
import "../styles/DespesaCard.css";

export default function DespesaCard({ item }) {
  return (
    <div className="card">
      <h3>{item.credor_nome.trim()}</h3>
      <p><strong>Data:</strong> {item.data}</p>
      <p><strong>Empenho:</strong> {item.num_empenho_original}</p>
      <p><strong>Valor:</strong> R$ {parseFloat(item.valor_emp).toFixed(2)}</p>
      <p><strong>Descrição:</strong> {item.descricao}</p>
    </div>
  );
}
