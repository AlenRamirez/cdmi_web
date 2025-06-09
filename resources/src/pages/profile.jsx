import React, { useState, useEffect } from "react";
import useGetSession from "../hooks/useGetSession";
import "../styles/Profile.css"

export default function Profile() {
    const { userSession, loading, refreshSession } = useGetSession();
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({});
    const [saving, setSaving] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);  

    useEffect(() => {
        // Limpiar URL objeto cuando cambia formData.imagen_perfil o al desmontar componente
        return () => {
            if (previewImage) {
                URL.revokeObjectURL(previewImage);
            }
        };
    }, [previewImage]);

    if (loading) {
        return <div className="text-center text-gray-500">Cargando...</div>;
    }

    const handleEdit = () => {
        setFormData({ ...userSession });
        setEditMode(true);
        setPreviewImage(null); // reset preview al entrar a editar
    };

    const handleCancel = () => {
        setEditMode(false);
        setFormData({});
        setPreviewImage(null); // reset preview al entrar a editar
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
        setFormData({ ...formData, imagen_perfil: file });
        setPreviewImage(URL.createObjectURL(file)); // crea la vista previa
       
        }
    };

    const handleSave = async () => {

        if (formData.nuevaContraseña && formData.nuevaContraseña.length < 6) {
            alert("La nueva contraseña debe tener al menos 6 caracteres.");
            return;
        }

        setSaving(true);
        try {
            const formPayload = new FormData();

            formPayload.append("nombre", formData.nombre);
        formPayload.append("apellido", formData.apellido);
        formPayload.append("correo", formData.correo);
        //formPayload.append("fecha_nacimiento", formData.fecha_nacimiento);
        formPayload.append("telefono", formData.telefono);
            if (formData.nuevaContraseña) {
                formPayload.append("contraseña", formData.nuevaContraseña);
            }
              if (formData.imagen_perfil) {
            formPayload.append("imagen_perfil", formData.imagen_perfil);
        }


            const response = await fetch(`/api/usuarios/${userSession.id}`, {
                method: "PATCH",
                headers: {
                    Accept: "application/json",
                },
                body: formPayload,
            });

            const result = await response.json();

            if (!response.ok) {
                let errores = "Errores en la actualización:\n";
                for (const campo in result.errors) {
                    errores += `- ${campo}: ${result.errors[campo].join(", ")}\n`;
                }
                alert(errores);
                return;
            }

            alert("Perfil actualizado exitosamente.");
            setEditMode(false);
            setFormData({});
            if (typeof refreshSession === "function") {
                await refreshSession();
            }
             // se recarga desde el servidor
        } catch (error) {
            console.error("Error inesperado:", error);
            alert("Ocurrió un error inesperado al actualizar el perfil.");
        } finally {
            setSaving(false);
        }
    };

    return (
         <div className="profile-container">
            <div className="profile-card">
                <div className="profile-header">
                    <div className="profile-image-upload">
                    <img 
                        src={
                            previewImage
                                ? previewImage // imagen local seleccionada
                                : userSession.imagen_perfil
                                    ? `/storage/${userSession.imagen_perfil}` // imagen desde servidor
                                    : "https://i.pravatar.cc/100" // default
                        }
                        alt="Avatar"
                        className="profile-avatar"
                    />
<input
  type="file"
  accept="image/*"
  onChange={handleFileChange}
  className="profile-file-input"
/></div>

                    <h2>{userSession.nombre} {userSession.apellido}</h2>
                    <p>{userSession.correo}</p>
                </div>

                {!editMode ? (
                    <div className="profile-info">
                        <p><strong>📱 Teléfono:</strong> {userSession.telefono}</p>
                        <p><strong>🎓 Rol:</strong> {userSession.rol}</p>

                        <button className="btn-primary" onClick={handleEdit}>Editar Perfil ✏️</button>
                    </div>
                ) : (
                    <div className="profile-form">
                        <label>Nombre</label>
                        <input type="text" value={formData.nombre || ""} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} />

                        <label>Apellido</label>
                        <input type="text" value={formData.apellido || ""} onChange={(e) => setFormData({ ...formData, apellido: e.target.value })} />

                        <label>Correo</label>
                        <input type="email" value={formData.correo || ""} onChange={(e) => setFormData({ ...formData, correo: e.target.value })} />

                        {/*<label>Fecha de nacimiento</label>
                        <input type="date" value={formData.fecha_nacimiento || ""} onChange={(e) => setFormData({ ...formData, fecha_nacimiento: e.target.value })} />
*/}
                        <label>Teléfono</label>
                        <input type="text" value={formData.telefono || ""} onChange={(e) => setFormData({ ...formData, telefono: e.target.value })} />

                        <hr />
                        <label>Nueva Contraseña</label>
                        <input type="password" value={formData.nuevaContraseña || ""} onChange={(e) => setFormData({ ...formData, nuevaContraseña: e.target.value })} />

                        <div className="profile-buttons">
                            <button className="btn-success" onClick={handleSave} disabled={saving}>
                                {saving ? "Guardando..." : "Guardar Cambios"}
                            </button>
                            <button className="btn-cancel" onClick={handleCancel} disabled={saving}>Cancelar</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

{/*import React, { useState } from "react";
import useGetSession from "../hooks/useGetSession";

export default function Profile() {
    const { userSession, loading, refreshSession } = useGetSession();
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({});
    const [saving, setSaving] = useState(false);

    if (loading) {
        return <div className="text-center text-gray-500">Cargando...</div>;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleEdit = () => {
        setFormData(userSession);
        setEditMode(true);
    };

    const handleCancel = () => {
        setEditMode(false);
        setFormData({});
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const response = await fetch(`/api/usuarios/${userSession.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (!response.ok) {
                let errores = "Errores en la actualización:\n";
                for (const campo in result.errors) {
                    errores += `- ${campo}: ${result.errors[campo].join(", ")}\n`;
                }
                alert(errores);
                return;
            }

            //Éxito
            alert("Perfil actualizado exitosamente.");
            setEditMode(false);
            setFormData({});
            if (typeof refreshSession === "function") {
                await refreshSession(); // Esperamos a que se recargue antes de continuar
            } 
        }catch (error) {
            console.error("Error inesperado", error);
            alert("Error al actualizar el perfil.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <section className="p-5">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1>Perfil de Usuario</h1>
                        {!editMode ? (
                            <>
                                <p><strong>Nombre:</strong> {userSession.nombre} {userSession.apellido}</p>
                                <p><strong>Correo:</strong> {userSession.correo}</p>
                                <p><strong>Fecha de Nacimiento:</strong> {userSession.fecha_nacimiento}</p>
                                <p><strong>Teléfono:</strong> {userSession.telefono}</p>
                                <p><strong>Rol:</strong> {userSession.rol}</p>

                                <button className="btn btn-primary mt-3" onClick={handleEdit}>
                                    Editar Perfil
                                </button>
                            </>
                        ) : (
                            <form onSubmit={(e) => e.preventDefault()}>
                                <div className="mb-2">
                                    <label>Nombre:</label>
                                    <input
                                        name="nombre"
                                        className="form-control"
                                        value={formData.nombre}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-2">
                                    <label>Apellido:</label>
                                    <input
                                        name="apellido"
                                        className="form-control"
                                        value={formData.apellido}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-2">
                                    <label>Correo:</label>
                                    <input
                                        name="correo"
                                        type="email"
                                        className="form-control"
                                        value={formData.correo}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-2">
                                    <label>Teléfono:</label>
                                    <input
                                        name="telefono"
                                        className="form-control"
                                        value={formData.telefono}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-2">
                                    <label>Fecha de nacimiento:</label>
                                    <input
                                        name="fecha_nacimiento"
                                        type="date"
                                        className="form-control"
                                        value={formData.fecha_nacimiento}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mt-3">
                                    <button className="btn btn-success me-2" onClick={handleSave} disabled={saving}>
                                        {saving ? "Guardando..." : "Guardar cambios"}
                                    </button>
                                    <button className="btn btn-secondary" onClick={handleCancel}>
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}*/}
{/*import React from "react";
import useGetSession from "../hooks/useGetSession";

export default function Profile() {
    const { userSession, loading } = useGetSession();

    if (loading) {
        return <div className="text-center text-gray-500">Cargando...</div>;
    }

    return (
        <section className="p-5">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1>Perfil de Usuario</h1>
                        <p>
                            <strong>Nombre:</strong> {userSession.nombre}{" "}
                            {userSession.apellido}
                        </p>
                        <p>
                            <strong>Correo:</strong> {userSession.correo}
                        </p>
                        <p>
                            <strong>Fecha de Nacimiento:</strong>{" "}
                            {userSession.fecha_nacimiento}
                        </p>
                        <p>
                            <strong>Teléfono:</strong> {userSession.telefono}
                        </p>
                        <p>
                            <strong>Rol:</strong> {userSession.rol}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
*/}