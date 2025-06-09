import React, { useState } from "react";

export default function Register() {

    const [rol, setRol] = useState("usuario");

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const data = Object.fromEntries(new FormData(e.target));
    
        try {
            const response = await fetch("/api/usuarios", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(data),
            });
    
            const result = await response.json();
    
            if (response.status === 201) {
                alert("Usuario creado exitosamente");
                window.location.href = "/login";
            } else if (response.status === 400 || response.status === 422) {
                let mensaje = "Error en los datos:\n";
                const errores = result.errors || {};
    
                for (const campo in errores) {
                    mensaje += `- ${campo}: ${errores[campo].join(", ")}\n`;
                }
    
                alert(mensaje);
            } else {
                alert("No se pudo crear el usuario. Inténtalo nuevamente.");
                console.error("Respuesta inesperada:", result);
            }
        } catch (error) {
            alert("Error al crear el usuario.");
            console.error("Error del servidor:", error);
        }
    };
    

    {/*const handleSubmit = async (e) => {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(e.target));

        const response = await fetch("/api/usuarios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();

        if (!response.ok) {
            alert("Error al crear el usuario");
            console.log(result);
        }

        alert("Usuario creado exitosamente");
        window.location.href = "/login";
    };*/}

    return (
        <section>
            <div className="container py-5 h-100 m-auto" style={{ backgroundColor: "#a2231d"}}>
                <div className="row d-flex justify-content-center align-items-center h-100" style={{ backgroundColor: "#a2231d"}}>
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div
                            className="card shadow-2-strong"
                            style={{ borderRadius: "1rem" }}
                        >
                            <div className="card-body p-5 text-center" >
                                <h3 className="mb-5" style={{fontFamily: "Merriweather, serif"}}>Registro</h3>
                                <form onSubmit={handleSubmit} style={{fontFamily: "Merriweather, serif"}}>
                                    <div className="form-outline mb-2" >
                                        <label
                                            className="form-label"
                                            htmlFor="nombre"
                                            
                                        >
                                            Nombre:
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            id="nombre"
                                            name="nombre"
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-outline mb-2">
                                        <label
                                            className="form-label"
                                            htmlFor="apellido"
                                        >
                                            Apellido:
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            id="apellido"
                                            name="apellido"
                                            className="form-control"
                                        />
                                    </div>
                                    {/*<div className="form-outline mb-2">
                                        <label
                                            className="form-label"
                                            htmlFor="fecha_nacimiento"
                                        >
                                            Fecha nacimiento:
                                        </label>
                                        <input
                                            required
                                            type="date"
                                            id="fecha_nacimiento"
                                            name="fecha_nacimiento"
                                            className="form-control"
                                        />
                                    </div>*/}
                                    <div className="form-outline mb-2">
                                        <label
                                            className="form-label"
                                            htmlFor="correo"
                                        >
                                            Correo electrónico:
                                        </label>
                                        <input
                                            required
                                            type="email"
                                            id="correo"
                                            name="correo"
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-outline mb-2">
                                        <label
                                            className="form-label"
                                            htmlFor="telefono"
                                        >
                                            Telefono:
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            id="telefono"
                                            name="telefono"
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-outline mb-2">
                                        <label
                                            className="form-label"
                                            htmlFor="contraseña"
                                        >
                                            Contraseña:
                                        </label>
                                        <input
                                            required
                                            type="password"
                                            id="contraseña"
                                            name="contraseña"
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-outline mb-2">
                                        <label
                                            className="form-label"
                                            htmlFor="rol"
                                        >
                                            Rol:
                                        </label>
                                        <select
                                            name="rol"
                                            id="rol"
                                            className="form-select"
                                            value={rol}
                                            onChange={(e) => setRol(e.target.value)}
                                        >
                                            <option value="usuario">
                                                Usuario
                                            </option>
                                            <option value="administrador">
                                                Administrador
                                            </option>
                                        </select>
                                    </div>
                                    {/* Mostrar campo clave solo si es administrador */}
                  {rol === "administrador" && (
                    <div className="form-outline mb-2">
                      <label className="form-label" htmlFor="clave_admin">
                        Clave para administrador:
                      </label>
                      <input
                        required
                        type="password"
                        id="clave_admin"
                        name="clave_admin"
                        className="form-control"
                      />
                    </div>
                  )}

                                    <button
                                        className="btn btn-danger btn-lg btn-block"
                                        type="submit"
                                        style={{ backgroundColor: "#a2231d"}}
                                    >
                                        Registrarse
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
