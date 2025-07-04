import React, { useState, useEffect } from "react";
import axios from "axios";

export default function SiteNameForm() {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    axios
      .get("https://portfolio-digital.onrender.com/content/site-name")
      .then((res) => {
        setTitle(res.data.title || "");
      })
      .catch(() => {
        /* sem)</fallback> */
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        "https://portfolio-digital.onrender.com/content/site-name",
        { title }
      );
      setStatus("Nome salvo com sucesso!");
    } catch {
      setStatus("Erro ao salvar nome.");
    }
  };

  return (
    <div className="card-form">
      <h2>Nome do Site</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex: User Santos - Lifestyle"
          required
        />
        <button type="submit" className="btn-blue margin">
          Salvar
        </button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}
