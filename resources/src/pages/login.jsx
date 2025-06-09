import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(e.target));

        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();

        if (!response.ok) {
            alert(`Error al iniciar sesion: ${result.error}`);
            return;
        }

        localStorage.setItem("auth-token", result.token);
        localStorage.setItem("rol", result.rol);

        alert("Usuario autenticado exitosamente");
        window.location.href = "/";

        {/*localStorage.setItem("rol", result.rol);
        if (result.rol ==="administrador") {
            window.location.href = "/administrador";
        }else{
            window.location.href = "/";
        }*/}
    };

    return (
        <section>
            <div className="container py-5 h-100 m-auto" style={{fontFamily: "Merriweather, serif", backgroundColor: "#a2231d"}}>
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div
                            className="card shadow-2-strong"
                            style={{ borderRadius: "1rem" }}
                        >
                            <div className="card-body p-5 text-center">
                                <h3 className="mb-5">Inicio de sesión</h3>
                                <form onSubmit={handleSubmit}>
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
    <label className="form-label" htmlFor="rol">
        Rol:
    </label>
    <select
        required
        id="rol"
        name="rol"
        className="form-control"
    >
        <option value="usuario">Usuario</option>
        <option value="administrador">Administrador</option>
    </select>
</div>


                                    <button
                                        className="btn btn-danger btn-lg btn-block"
                                        type="submit"
                                        style={{ backgroundColor: "#a2231d"}}
                                    >
                                        Iniciar Sesión
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

{/*import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [rol, setRol] = useState('usuario');
    const navigate = useNavigate(); // Usamos useNavigate para redirigir sin recargar la página

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = { correo, contraseña, rol }; //Object.fromEntries(new FormData(e.target));

        try {
            const response = await axios.post("http://localhost:8000/api/login", data, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                }
            });

            if (response.status === 200) {
                const result = response.data;

                // Almacenar el token y rol
                localStorage.setItem("auth-token", result.token);
                localStorage.setItem("rol", result.rol);

                alert("Usuario autenticado exitosamente");

                // Redirigir según el rol
                if (result.rol === "administrador") {
                    navigate("/administrador"); // Redirige al administrador
                } else {
                    navigate("/"); // Redirige al usuario regular
                }
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            alert(`Error al iniciar sesión: ${error.response?.data?.message || error.message}`);
        }
            }
        
        //const response = await fetch("/api/login", {
          //  method: "POST",
           // headers: {
                //"Content-Type": "application/json",
              //  Accept: "application/json",
            //},
            //body: JSON.stringify(data),
        //});
        //const result = await response.json();

        {/*if (!response.ok) {
            alert(`Error al iniciar sesion: ${result.error}`);
            return;
        }

        localStorage.setItem("auth-token", result.token);
        alert("Usuario autenticado exitosamente");
        window.location.href = "/";

        localStorage.setItem("rol", result.rol);
        if (result.rol ==="administrador") {
            window.location.href = "/administrador";
        }else{
            window.location.href = "/";
        }
   // };

    return (
        <section>
            <div className="container py-5 h-100 m-auto">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div
                            className="card shadow-2-strong"
                            style={{ borderRadius: "1rem" }}
                        >
                            <div className="card-body p-5 text-center">
                                <h3 className="mb-5">Inicia Sesión</h3>
                                <form onSubmit={handleSubmit}>
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
    <label className="form-label" htmlFor="rol">
        Rol:
    </label>
    <select
        required
        id="rol"
        name="rol"
        className="form-control"
    >
        <option value="usuario">Usuario</option>
        <option value="administrador">Administrador</option>
    </select>
</div>


                                    <button
                                        className="btn btn-danger btn-lg btn-block"
                                        type="submit"
                                    >
                                        Iniciar Sesión
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
*/}
