import React, { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import { Schema } from '../../amplify/data/resource';
import styles from "./WeddingInviteForm.module.css"

// Satisfactorily declare the client variable outside
let client: ReturnType<typeof generateClient<Schema>>;

const WeddingInviteForm: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [isPlusOne, setIsPlusOne] = useState<boolean>(false);
    const [isAttending, setIsAttending] = useState<boolean>(true);
    const [foodRestrictions, setFoodRestrictions] = useState<string>('');
    const [musicSuggestions, setMusicSuggestions] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string>('');

    useEffect(() => {
        client = generateClient<Schema>();
        console.log("Amplify Client has been generated:", client); // Log the client
        console.log("Available Models:", client.models); // Log the models to check if they are populated
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //log client on submit
        console.log("Amplify Client has been generated:", client);
        console.log("Available Models:", client.models);

        const rsvpData = {
            name,
            phoneNumber,
            isPlusOne,
            isAttending,
            foodRestrictions,
            musicSuggestions,
        };

        console.log("Creating RSVP with this data:", rsvpData);

        try {
            // API Call to create response
            await client.models.WeddingInviteResponse.create(rsvpData);
            console.log("RSVP successfully created!");
            setSuccessMessage('RSVP criado com sucesso!');
            setError(null); // clears any error
        } catch (err) {
            setError('Erro ao criar RSVP. Tente novamente.');
            setSuccessMessage(''); // clears success message
            console.error("Erro ao criar RSVP:", err);
        }
    };

    return (
        <div className={styles.rsvpContainer}>

            <div className={styles.rsvpTitle}>RSVP</div>

            <div className={styles.rsvpSubTitle}>Por favor responder até ao dia 12 de abril 2025</div>

            <div className={styles.rsvpForm}>

                <form onSubmit={handleSubmit}>

                    <div className={styles.inputContainer}>
                        <label className={styles.label}>
                            Nome*:
                        </label>
                        <input
                            type="text"
                            className={name ? styles.hasValue : styles.doesNotHaveValue}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.inputContainer}>
                        <label className={styles.labelTel}>
                            Nº Telefone*:
                        </label>
                        <input
                            type="tel"
                            className={phoneNumber ? styles.hasValue : styles.doesNotHaveValue}
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                    </div>
                    <label>
                        Will you attend:
                        <input
                            type="checkbox"
                            checked={isAttending}
                            onChange={() => setIsAttending(!isAttending)}
                        />
                    </label>
                    <label>
                        Acompanhante:
                        <input
                            type="checkbox"
                            checked={isPlusOne}
                            onChange={() => setIsPlusOne(!isPlusOne)}
                        />
                    </label>
                    <div className={styles.inputContainer}>
                        <label className={styles.label}>
                            Restrições alimentares:
                        </label>
                        <input
                            type="text"
                            className={foodRestrictions ? styles.hasValue : styles.doesNotHaveValue}
                            value={foodRestrictions}
                            onChange={(e) => setFoodRestrictions(e.target.value)}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <label className={styles.label}>
                            Sugestões musicais:
                        </label>
                        <input
                            type="text"
                            className={musicSuggestions ? styles.hasValue : styles.doesNotHaveValue}
                            value={musicSuggestions}
                            onChange={(e) => setMusicSuggestions(e.target.value)}
                        />
                    </div>

                    <button type="submit">Enviar</button>
                    {error && <p style={{color: 'red'}}>{error}</p>}
                    {successMessage && <p style={{color: 'green'}}>{successMessage}</p>}

                </form>

            </div>

        </div>
    );
};

export default WeddingInviteForm;