import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiFillEdit as Editar } from "react-icons/ai";
import { MdDeleteForever as Excluir } from "react-icons/md";
import { ListaProdutos } from "../Componentes/ListaProdutos";
import styles from "./Produtos.module.css";

export default function Produtos() {
  // Configuração do título da página
  document.title = "Lista de Produtos";

  // Estados
  const [counter, setCounter] = useState(0);
  const [counter2, setCounter2] = useState(0);
  const [produtos, setProdutos] = useState([{}]);

  // Efeito para carregar os produtos uma vez no carregamento do componente
  useEffect(() => {
    console.log("useEffect será renderizado apenas uma vez!");
    fetch("http://localhost:5000/produtos")
      .then((lista) => lista.json())
      .then((listProdutos) => {
        setProdutos(listProdutos);
      });
  }, []);

  // Efeito que será renderizado quando counter2 for atualizado
  useEffect(() => {
    console.log("useEffect será renderizado quando counter2 for atualizado.");
  }, [counter2]);

  return (
    <div>
      <h1>Produtos</h1>

      <div>
        <button onClick={() => setCounter(counter + 1)}>COUNTER - {counter}</button>
      </div>
      <div>
        <button onClick={() => setCounter2(counter2 + 1)}>COUNTER2 - {counter2}</button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.tableHeader}>ID</th>
            <th className={styles.tableHeader}>NOME</th>
            <th className={styles.tableHeader}>PREÇO</th>
            <th className={styles.tableHeader}>EDITAR / EXCLUIR</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto, indice) => (
            <tr key={indice}>
              <td>{produto.id}</td>
              <td>{produto.nome}</td>
              <td>{produto.preco}</td>
              <td>
                <Link to={`/editar/produtos/${produto.id}`}>
                  <Editar />
                </Link>{" "}
                |{" "}
                <Link to={`/excluir/produtos/${produto.id}`}>
                  <Excluir />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4} style={{ textAlign: "center" }}>
              PRODUTOS
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
