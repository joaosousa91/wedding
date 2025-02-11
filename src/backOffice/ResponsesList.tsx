import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import { Schema } from '../../amplify/data/resource';
import * as XLSX from 'xlsx';
import styles from "./ResponseList.module.css";
import {Image} from "@aws-amplify/ui-react";

// Satisfactorily declare the client variable outside
let client: ReturnType<typeof generateClient<Schema>>;

// Define a interface para a resposta
interface RSVPResponse {
    id: string;
    name: string | null;
    phoneNumber: string | null;
    isPlusOne: boolean | null;
    plusOneName: string | null;
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

    const deleteResponse = async (id: string) => {
        try {
            // Lógica para apagar o registo na base de dados
            await client.models.WeddingInviteResponse.delete({ id });
            // Atualizar a lista de respostas após a eliminação
            setResponses(responses.filter(response => response.id !== id));
        } catch (error) {
            console.error("Erro ao apagar resposta:", error);
        }
    };

    const exportToExcel = () => {
        // Cria um novo livro de trabalho (workbook) e adiciona uma folha de trabalho (worksheet)
        const worksheet = XLSX.utils.json_to_sheet(responses);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Responses");

        // Exporta o ficheiro
        XLSX.writeFile(workbook, "responses.xlsx");
    };

    return <>

        <div className={styles.responseListContainer}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h2>Lista de Respostas</h2>
                <button onClick={exportToExcel} className={styles.exportButton}>Exportar para Excel</button>
            </div>
            <table className={styles.responseTable}>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Nº Telefone</th>
                    <th>Acompanhante</th>
                    <th>Nome Acompanhante</th>
                    <th>Vai estar presente?</th>
                    <th>Restrições Alimentares</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {responses.map(response => (
                    <tr key={response.id}>
                        <td>{response.id}</td>
                        <td>{response.name}</td>
                        <td>{response.phoneNumber}</td>
                        <td>{response.isPlusOne ? "Sim" : "Não"}</td>
                        <td>{response.plusOneName}</td>
                        <td>{response.isAttending ? "Sim" : "Não"}</td>
                        <td>{response.foodRestrictions || "N/A"}</td>
                        <td>
                            <button onClick={() => deleteResponse(response.id)}>
                                <Image
                                    alt="separator"
                                    src="/assets/Trash_Can.png"
                                    height="25%"
                                    width="25%"
                                />
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>

    </>
}

export default ResponseList;