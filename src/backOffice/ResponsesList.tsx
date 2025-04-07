import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import { Schema } from '../../amplify/data/resource';
import * as XLSX from 'xlsx';
import styles from "./ResponseList.module.css";
import { Image } from "@aws-amplify/ui-react";

let client: ReturnType<typeof generateClient<Schema>>;

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

function ResponseList() {
    const [responses, setResponses] = useState<RSVPResponse[]>([]);
    const [idToDelete, setIdToDelete] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<'createdAt' | 'name'>('createdAt');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

    useEffect(() => {
        client = generateClient<Schema>();

        const fetchResponses = async () => {
            try {
                const response = await client.models.WeddingInviteResponse.list();
                const sortedResponses = sortResponses(response.data);
                setResponses(sortedResponses);
            } catch (error) {
                console.error("Erro ao obter respostas:", error);
            }
        };

        fetchResponses();
    }, [sortBy, sortDirection]);

    const sortResponses = (data: RSVPResponse[]) => {
        return [...data].sort((a, b) => {
            let valA: string | number, valB: string | number;

            if (sortBy === 'name') {
                valA = (a.name || '').toLowerCase();
                valB = (b.name || '').toLowerCase();
            } else {
                valA = new Date(a.createdAt).getTime();
                valB = new Date(b.createdAt).getTime();
            }

            if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
            if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });
    };

    const deleteResponse = async (id: string) => {
        try {
            await client.models.WeddingInviteResponse.delete({ id });
            setResponses(responses.filter(response => response.id !== id));
        } catch (error) {
            console.error("Erro ao apagar resposta:", error);
        }
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(responses);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Responses");
        XLSX.writeFile(workbook, "responses.xlsx");
    };

    return (
        <>
            <div className={styles.responseListContainer}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2>Lista de Respostas</h2>
                    <button onClick={exportToExcel} className={styles.exportButton}>Exportar para Excel</button>
                </div>
                <table className={styles.responseTable}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th
                            style={{ cursor: 'pointer', textDecoration: 'underline' }}
                            onClick={() => {
                                if (sortBy === 'name') {
                                    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                                } else {
                                    setSortBy('name');
                                    setSortDirection('asc');
                                }
                            }}
                        >
                            Nome {sortBy === 'name' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
                        </th>
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
                                <button onClick={() => setIdToDelete(response.id)}>
                                    <Image
                                        alt="Apagar"
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

            {idToDelete && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <p>Tens a certeza que queres apagar esta resposta?</p>
                        <div className={styles.modalButtons}>
                            <button onClick={async () => {
                                await deleteResponse(idToDelete);
                                setIdToDelete(null);
                            }}>Sim</button>
                            <button onClick={() => setIdToDelete(null)}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ResponseList;
