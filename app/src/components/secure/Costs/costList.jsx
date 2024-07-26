import React, { useState, useEffect } from 'react';
import CostService from "../../../services/cost.service";
import { Link } from 'react-router-dom';
import descriptionService from "../../../services/description.service.js";
import AuthService from "../../../services/auth.service.js";

const userId = AuthService.getCurrentUserId();

const costList = () => {
    const [Cost, setCosts] = useState([]);
    const [Coment, setComentes] = useState([]);
    const [user, setUser] = useState(userId);

    useEffect(() => {
        async function fetchData() {
            const data = await CostService.getAll(user);
            setCosts(data.data);
        }
        fetchData();
        async function fetchData2() {
            const comentes = await descriptionService.getAll()
            setComentes(comentes.data)
        }
    }, []);

    return (
        <main>
            <section className="py-4">
                <div className="d-flex justify-content">
                    <Link to={"/"} className="btn btn-secondary px-4 mx-2">
                        Voltar
                    </Link>

                    <Link to={"/Cost"} className="btn btn-success px-4 mx-2">
                        Registar
                    </Link>
                </div>
            </section>

            <section>
                <table className="table table-dark table-hover">
                    <thead>
                    <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">Custo</th>
                        <th scope="col">Data</th>
                        <th scope="col">Pago</th>
                        <th scope="col">Pagamento</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>

                    <tbody>
                    {Cost.map((Costs, index) => (
                        <tr key={Costs.id}>
                            <td>{Costs.name}</td>
                            <td>{Costs.cost} €</td>
                            <td>{Costs.date}</td>
                            <td>{Costs.ispaid ? 'Sim' : 'Não'}</td>
                            <td>{Costs.Payment}</td>
                            <td>
                                <div className="d-flex justify-content">
                                    <Link to={`/Cost/${Costs.id}`} className='btn btn-primary me-2'>Editar</Link>
                                </div>
                                <div className="d-flex justify-content">
                                    <Link to={`/Description/${Costs.id}`} className='btn btn-primary me-2'>Comentario</Link>
                                </div>
                                <div className="d-flex justify-content">
                                    <Link to={`/Attachements/${Costs.id}`} className='btn btn-primary me-2'>Ficheiro</Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {Coment.map((comentes, index) => (
                        <tr key={comentes.id}>
                            <td>{comentes.text}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>
        </main>
    );
}

export default costList;