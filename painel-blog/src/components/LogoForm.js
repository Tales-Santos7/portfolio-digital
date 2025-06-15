import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LogoForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const res = await axios.get('https://portfolio-digital.onrender.com/content/logo');
        if (res.data) {
          setTitle(res.data.title || '');
          setDescription(res.data.description || '');
          if (res.data.images && res.data.images.length > 0) {
            setImageUrl(res.data.images[0]);
          }
        }
      } catch (err) {
        console.error('Erro ao buscar logo:', err);
      }
    };

    fetchLogo();
  }, []);

  const handleTextSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('https://portfolio-digital.onrender.com/content/logo', {
        title,
        description,
      });
      setStatus('Texto da logo atualizado com sucesso!');
    } catch (err) {
      console.error('Erro ao atualizar texto da logo:', err);
      setStatus('Erro ao atualizar logo.');
    }
  };

  const handleImageUpload = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);

    try {
      const res = await axios.put(
        'https://portfolio-digital.onrender.com/content/logo/image',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      if (res.data.images && res.data.images[0]) {
        setImageUrl(res.data.images[0]);
        setStatus('Imagem da logo atualizada com sucesso!');
      }
    } catch (err) {
      console.error('Erro ao enviar imagem da logo:', err);
      setStatus('Erro ao atualizar imagem da logo.');
    }
  };

  return (
    <div className="card-form">
      <h2>Logo Inicial (Nav)</h2>
      <form onSubmit={handleTextSubmit} style={{ marginTop: '1rem' }}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex: USER"
          />
        </div>
        <div>
          <label>Subtítulo:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ex: Lifestyle - Beauty - Study"
          />
        </div>
         <h2>Logo do Rodapé</h2>

      {imageUrl && (
        <div style={{ marginBottom: '1rem' }}>
          <img src={imageUrl} alt="Logo atual" style={{ maxHeight: '50px' }} />
        </div>
      )}

      <input type="file" accept="image/*" onChange={handleImageUpload} />
        <button className="btn-blue margin" type="submit">Salvar</button>
      </form>

      {status && <p>{status}</p>}
    </div>
  );
};

export default LogoForm;