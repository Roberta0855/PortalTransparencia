import React from "react";
import "../styles/DespesaCard.css";

export default function DespesaCard({ item }) {
  return (
    <div className="card">
      <p>{item.credor_nome.trim()}</p>
      <p><strong>Data:</strong> {item.data}</p>
      <p><strong>Descrição:</strong> {item.descricao}</p>

      <p><strong>Valor:</strong> R$ {parseFloat(item.valor_emp).toFixed(2)}</p>
    
    </div>
  );
}
