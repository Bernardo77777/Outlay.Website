import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Link } from "react-router-dom";
import DescriptionService from "../../../services/description.service";
import AttachementsService from "../../../services/attachements.service.js";

const Attachements = () => {
    const navigate = useNavigate();
    const params = useParams();

    let iddesc = params.id;

    const [id, setId] = useState(null);
    const [file, setFile] = useState("");
    const [descriptionId, setDescriptionId] = useState(iddesc);
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    const form = useRef();
    const checkBtn = useRef();

    useEffect(() => {
        if (params.number) {
            const fetchData = async () => {
                try {
                    const response = await AttachementsService.getById(params.number);
                    setId(response.data.id);
                    setFile(response.data.text);
                    setDescriptionId(params.id);
                } catch (error) {
                    console.error("Error fetching description:", error);
                }
            };

            fetchData();
        }
    }, [params.number]);

    const handleRegister = async (e) => {
        e.preventDefault();

        setMessage("");
        setSuccessful(false);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            try {
                const response = await AttachementsService.createORupdate(id, file, descriptionId);
                setMessage(response.data.message);
                setSuccessful(true);
                setId(response.data.id);
                setFile(response.data.text);
            } catch (error) {
                const resMessage =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString();

                setMessage(resMessage);
                setSuccessful(false);
            }
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            await AttachementsService.deleteUser(id);
            navigate('/cost-list');
        } catch (error) {
            const resMessage =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();

            setMessage(resMessage);
            setSuccessful(false);
        }
    };

    // const required = (value) => {
    //     if (!value) {
    //         return (
    //             <div className="invalid-feedback d-block">
    //                 É obrigatório!
    //             </div>
    //         );
    //     }
    // };

    // const validLength = (value) => {
    //     if (value.length < 3 || value.length > 50) {
    //         return (
    //             <div className="invalid-feedback d-block">
    //                 O nome deve ter entre 3 e 50 caracteres!
    //             </div>
    //         );
    //     }
    // };

    return (
        <main>
            <section>
                <div className="p-5 mb-4 bg-body-tertiary rounded-3">
                    <div className="container-fluid py-5">
                        <Form onSubmit={handleRegister} ref={form} className="col-4">
                            <div>
                                <h1 className="h3 mb-3 fw-normal">Coloque a faturua</h1>

                                <div className="form-group mt-3">
                                    <label>Carregar Arquivo</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        value={file}
                                        onChange={(e) => setFile(e.target.value)}
                                    />
                                </div>

                                <div className="form-group-buttons">
                                    <button className="btn btn-success mt-2">Registar</button>

                                    {id && (
                                        <button onClick={handleDelete} className="btn btn-danger mt-2 mx-2">
                                            Eliminar
                                        </button>
                                    )}

                                    <Link to={"/cost-list"} className="btn btn-secondary mt-2 mx-2">
                                        Voltar
                                    </Link>
                                </div>
                            </div>

                            {successful && (
                                <div className="alert alert-success mt-2" role="alert">
                                    Gravado com sucesso!
                                </div>
                            )}

                            {message && (
                                <div className="form-group">
                                    <div
                                        className={
                                            successful ? "alert alert-success" : "alert alert-danger"
                                        }
                                        role="alert"
                                    >
                                        {message}
                                    </div>
                                </div>
                            )}
                            <CheckButton style={{ display: "none" }} ref={checkBtn} />
                        </Form>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Attachements;
