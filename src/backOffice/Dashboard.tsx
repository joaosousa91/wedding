import { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/data';
import { Schema } from '../../amplify/data/resource';
import {
    PieChart,
    Pie,
    Cell,
    Legend,
    Tooltip
} from 'recharts';
import styles from "./Dashboard.module.css";


let client: ReturnType<typeof generateClient<Schema>>;

// Definindo as interfaces para os dados
interface MusicSuggestion {
    name: string | null;
    suggestion: string | null;
}

interface FoodRestriction {
    name: string | null;
    description: string | null;
}

function Dashboard() {
    const [totalYes, setTotalYes] = useState(0);
    const [totalNo, setTotalNo] = useState(0);
    const [musicSuggestions, setMusicSuggestions] = useState<MusicSuggestion[]>([]);
    const [foodRestrictions, setFoodRestrictions] = useState<FoodRestriction[]>([]);

    useEffect(() => {
        client = generateClient<Schema>();

        const fetchResponses = async () => {
            try {
                const response = await client.models.WeddingInviteResponse.list();
                const data = response.data;

                const yesCount = data.reduce((total, item) => {
                    if (item.isAttending) {
                        return total + 1 + (item.isPlusOne ? 1 : 0);
                    }
                    return total;
                }, 0);

                const noCount = data.filter(item => !item.isAttending).length;

                setTotalYes(yesCount);
                setTotalNo(noCount);

                setMusicSuggestions(data.map(item => ({
                    name: item.name,
                    suggestion: item.musicSuggestions,
                })).filter(item => item.suggestion));

                setFoodRestrictions(data.map(item => ({
                    name: item.name,
                    description: item.foodRestrictions,
                })).filter(item => item.description));
            } catch (error) {
                console.error("Erro ao obter dados:", error);
            }
        };

        fetchResponses();
    }, []); // Executa apenas na montagem do componente

    const data = [
        { name: 'Sim', value: totalYes },
        { name: 'Não', value: totalNo },
    ];

    return (
        <div className={styles.dashContainer}>
            <div className={styles.dashboardContainer}>
                <div className={styles.card}>
                    <h3>Total:</h3>
                    <p className={styles.bigNumber}>{totalYes}</p>
                </div>
                <div className={styles.card}>
                    <h3>Comparação:</h3>
                    <div className={styles.pieContainer}>
                        <PieChart width={200} height={200}>
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={60}
                                fill="#8884d8"
                                label
                            >
                                {data.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={index === 0 ? "#134c16" : "#EF5350"} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend
                                layout="vertical"
                                align="right"
                                verticalAlign="middle"
                                formatter={(value) => (
                                    <span style={{ color: '#000', fontSize: '14px' }}>{value}</span>
                                )}
                            />
                        </PieChart>
                    </div>
                </div>
            </div>


            <div className={styles.dashboardContainer}>
                <div className={styles.tablesContainer}>
                    <div className={styles.tableContainer}>
                        <h3>Sugestões Musicais</h3>
                        <table className={styles.responseTable}>
                            <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Sugestão Musical</th>
                            </tr>
                            </thead>
                            <tbody>
                            {musicSuggestions.map((suggestion, index) => (
                                <tr key={index}>
                                    <td>{suggestion.name}</td>
                                    <td>{suggestion.suggestion}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                <div className={styles.tableContainer}>
                    <h3>Restrições Alimentares</h3>
                    <table className={styles.responseTable}>
                        <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Restrição Alimentar</th>
                        </tr>
                        </thead>
                        <tbody>
                        {foodRestrictions.map((restriction, index) => (
                            <tr key={index}>
                                <td>{restriction.name}</td>
                                <td>{restriction.description}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
        </div>
    );
}

export default Dashboard;