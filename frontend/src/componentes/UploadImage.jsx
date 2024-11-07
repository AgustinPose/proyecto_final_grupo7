import React, { useState } from 'react';

const UploadImage = ({ onUploadSuccess, onClose }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [caption, setCaption] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        console.log("Archivo seleccionado:", event.target.files[0]); 
    };

    const handleCaptionChange = (event) => {
        setCaption(event.target.value);  
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            console.log("No se ha seleccionado ningún archivo");
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('caption', caption); 

        console.log("Subiendo archivo..."); // Agregar log de depuración

        const token = localStorage.getItem('token');
        console.log("Token:", token); // Verifica si el token está presente


        try {
            const response = await fetch('http://localhost:3001/api/posts/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: formData,
            });

            if (response.ok) {
                console.log(localStorage.getItem('user.username'));
                const newPost = await response.json();
                console.log("Subida exitosa:", newPost); 
                onUploadSuccess(newPost); // Notifica al componente superior de la subida exitosa
                onClose(); // Cierra el modal tras la subida
            } else {
                console.error('Error al subir la imagen');
            }
        } catch (error) {
            console.error('Error al realizar la solicitud de subida:', error);
        }
    };

    return (
        <div className="modal-content">
            <h3>Subir una Imagen</h3>
            <input type="file" onChange={handleFileChange} />
            <textarea 
                placeholder="Escribe una descripción para la foto..." 
                value={caption} 
                onChange={handleCaptionChange} 
            />
            <div className="buttons">
                <button onClick={handleUpload}>Subir imagen</button>
                <button onClick={onClose}>Cancelar</button>
            </div>
        </div>
    );
};

export default UploadImage;
