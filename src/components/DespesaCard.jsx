import React from "react";
import "../styles/DespesaCard.css";
import ExpandableText from "./ExpandableText";

export default function DespesaCard({ item }) {
  return (
    <div className="card">
      <p>{item.credor_nome.trim()}</p>
      <p><strong></strong> {item.data}</p>
      <p >
        <strong></strong>{" "}
        <ExpandableText text={item.descricao} maxLength={100} />
      </p>
      <p><strong></strong> R$ {parseFloat(item.valor_emp).toFixed(2)}</p>
    </div>
  );
}
