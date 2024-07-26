import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Link } from "react-router-dom";
import CostService from "../../../services/cost.service";
import Select from "react-validation/build/select";
import AuthService from "../../../services/auth.service";

const Cost = () => {
    const navigate = useNavigate();
    const params = useParams();

    const [id, setId] = useState(null);
    const [name, setName] = useState("");
    const [cost, setCost] = useState("");
    const [date, setDate] = useState("");
    const [ispaid, setIsPaid] = useState(false);
    const [Payment, setPayment] = useState("");
    const [user, setUser] = useState(null);
    const [successful, setSuccessful] = useState(null);
    const [message, setMessage] = useState("");

    const form = useRef();
    const checkBtn = useRef();

    useEffect(() => {
        const fetchUser = async () => {
            const userId = AuthService.getCurrentUserId();
            console.log("User ID:", userId);
            if (userId) {
                setUser(userId);
            } else {
                console.error("User ID is not found in localStorage");
            }
        };

        fetchUser();

        console.log("teste",params)

        if (params.number) {
            const fetchData = async () => {
                try {
                    const response = await CostService.getById(params.number);
                    setId(response.data.id);
                    setName(response.data.name);
                    setCost(response.data.cost);
                    setDate(response.data.date);
                    setIsPaid(response.data.ispaid);
                    setPayment(response.data.Payment);
                } catch (error) {
                    console.error("Error fetching cost:", error);
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
                const response = await CostService.createORupdate(id, name, cost, date, ispaid, Payment, user);
                setMessage(response.data.message);
                setSuccessful(true);

                setId(response.data.id);
                setName(response.data.name);
                setCost(response.data.cost);
                setDate(response.data.date);
                setIsPaid(response.data.ispaid);
                setPayment(response.data.Payment);
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
            await CostService.deleteUser(id);
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

    const required = (value) => {
        if (!value) {
            return (
                <div className="invalid-feedback d-block">
                    É obrigatório!
                </div>
            );
        }
    };

    const validLength = (value) => {
        if (value.length < 3 || value.length > 50) {
            return (
                <div className="invalid-feedback d-block">
                    O nome deve ter entre 3 e 50 caracteres!
                </div>
            );
        }
    };

    return (
        <main>
            <section>
                <div className="p-5 mb-4 bg-body-tertiary rounded-3">
                    <div className="container-fluid py-5">
                        <Form onSubmit={handleRegister} ref={form} className="col-4">
                            <div>
                                <h1 className="h3 mb-3 fw-normal">Registar Despesa</h1>

                                <div className="form-group">
                                    <label>Nome</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        validations={[required, validLength]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Custo</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="cost"
                                        value={cost}
                                        onChange={(e) => setCost(e.target.value)}
                                        validations={[required]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Data</label>
                                    <Input
                                        type="date"
                                        className="form-control"
                                        name="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                </div>

                                <div className="form-group-paid">
                                    <label>Pago</label>
                                    <Select
                                        className="form-control"
                                        name="ispaid"
                                        value={ispaid.toString()}
                                        onChange={(e) => setIsPaid(e.target.value === "true")}
                                        validations={[required]}
                                    >
                                        <option value="" disabled hidden>Pago?</option>
                                        <option value="true">Sim</option>
                                        <option value="false">Não</option>
                                    </Select>
                                </div>

                                <div className="form-group-payment">
                                    <label>Pagamento</label>
                                    <Select
                                        className="form-control"
                                        name="payment"
                                        value={Payment}
                                        onChange={(e) => setPayment(e.target.value)}
                                        validations={[required]}
                                    >
                                        <option value="" disabled hidden>Como vais Pagar?</option>
                                        <option value="Credit Card">Cartão de Crédito</option>
                                        <option value="Debit Card">Cartão de Débito</option>
                                        <option value="Paypal">Paypal</option>
                                        <option value="Bank Transfer">Transferência Bancária</option>
                                    </Select>
                                </div>

                                <div className="form-group-buttons">
                                    <button className="btn btn-success mt-2">Registar</button>


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

                            {message && successful !== null && (
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

export default Cost;
