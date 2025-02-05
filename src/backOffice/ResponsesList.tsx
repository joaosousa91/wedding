import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import { Schema } from '../../amplify/data/resource';
import styles from "./ResponseList.module.css";

// Satisfactorily declare the client variable outside
let client: ReturnType<typeof generateClient<Schema>>;

// Define a interface para a resposta
interface RSVPResponse {
    id: string;
    name: string | null;
    phoneNumber: string | null;
    isPlusOne: boolean | null;
    isAttending: boolean | null;
    foodRestrictions: string | null;
    createdAt: string;
    updatedAt: string;
}

function ResponseList(){

    const [responses, setResponses] = useState<RSVPResponse[]>([]); // Usar a interface aqui

    useEffect(() => {

        client = generateClient<Schema>();

        const fetchResponses = async () => {
            try {
                const response = await client.models.WeddingInviteResponse.list(); // Lógica para obter dados da API
                setResponses(response.data); // Atualiza o estado com dados recebidos
            } catch (error) {
                console.error("Erro ao obter respostas:", error);
            }
        };

        (async () => {
            await fetchResponses();
        })();
    }, []);

    return <>

        <div className={styles.responseListContainer}>
            <h2>Lista de Respostas</h2>
            <table className={styles.responseTable}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Nº Telefone</th>
                    <th>Acompanhante</th>
                    <th>A Confirmar</th>
                    <th>Restrições Alimentares</th>
                </tr>
                </thead>
                <tbody>
                {responses.map(response => (
                    <tr key={response.id}>
                        <td>{response.id}</td>
                        <td>{response.name}</td>
                        <td>{response.phoneNumber}</td>
                        <td>{response.isPlusOne ? "Sim" : "Não"}</td>
                        <td>{response.isAttending ? "Sim" : "Não"}</td>
                        <td>{response.foodRestrictions || "N/A"}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>

    </>
}

export default ResponseList;