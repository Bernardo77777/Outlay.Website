import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Link } from "react-router-dom";
import DescriptionService from "../../../services/description.service";

const Description = () => {
    const navigate = useNavigate();
    const params = useParams();

    let idodcusto = params.id;

    const [id, setId] = useState(null);
    const [text, setText] = useState("");
    const [costId, setCostId] = useState(idodcusto);
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    const form = useRef();
    const checkBtn = useRef();

    useEffect(() => {
        if (params.id) {
            const fetchData = async () => {
                try {
                    const response = await DescriptionService.getById(params.number);
                    setId(response.data.id);
                    setText(response.data.text);
                    setCostId(params.id);
                } catch (error) {
                    console.error("Error fetching description:", error);
                }
            };

            fetchData();
        }
    }, [params.id]);

    const handleRegister = async (e) => {
        e.preventDefault();

        setMessage("");
        setSuccessful(false);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            try {
                const response = await DescriptionService.createORupdate(id, text, costId);
                setMessage(response.data.message);
                setSuccessful(true);
                setId(response.data.id);
                setText(response.data.text);
                setCostId(idodcusto)
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
            await DescriptionService.deleteUser(id);
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
    //
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
                                <h1 className="h3 mb-3 fw-normal">Adicione uma descriçao</h1>

                                <div className="form-group">
                                    <label>Descriçao</label>
                                    <textarea
                                        className="form-control"
                                        name="text"
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
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

export default Description;
