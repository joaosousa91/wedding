import React, { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import { Schema } from '../../amplify/data/resource';
import styles from "./WeddingInviteForm.module.css";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import classNames from 'classnames';


// Satisfactorily declare the client variable outside
let client: ReturnType<typeof generateClient<Schema>>;

const WeddingInviteForm: React.FC<{ id: string }> = ({ id }) => {
    const [name, setName] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined);
    const [isPlusOne, setIsPlusOne] = useState<boolean>(false);
    const [plusOneName, setPlusOneName] = useState<string>('');
    const [isAttending, setIsAttending] = useState<boolean>(true);
    const [foodRestrictions, setFoodRestrictions] = useState<string>('');
    const [musicSuggestions, setMusicSuggestions] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [textareaFoodFocused, setTextareaFoodFocused] = useState<boolean>(false);
    const [textareaMusicFocused, setTextareaMusicFocused] = useState<boolean>(false);


    useEffect(() => {
        client = generateClient<Schema>();
    }, []);

    const handleSubmit = async () => {

        const rsvpData = {
            name,
            phoneNumber,
            isPlusOne,
            plusOneName,
            isAttending,
            foodRestrictions,
            musicSuggestions,
        };

        console.log("Entered handle submit with following rsvpData", rsvpData);

        if (!phoneNumber){
            setError('Por favor insira um número de telefone');
            return;
        }

        if (!phoneNumber.startsWith('+')) {
            setError('O número de telefone deve incluir o prefixo.');
            return;
        }


        try {
            // Listar todas as RSVPs e procurar pelo número de telefone
            const response = await client.models.WeddingInviteResponse.list();
            const existingResponse = response.data.find(item => item.phoneNumber === phoneNumber);

            if (existingResponse) {

                console.log("Response already found, going to update");

                // Se uma resposta existente for encontrada, atualize-a
                const existingId = existingResponse.id; // ID único da resposta existente

                // Cria um novo objeto com o ID e os campos atualizados
                const updatedData = {
                    id: existingId,
                    ...rsvpData,
                };

                // Chama o método de atualizar com o novo objeto
                const rsvpResponse = await client.models.WeddingInviteResponse.update(updatedData);
                console.log("Response from update call:", rsvpResponse);
                console.log("RSVP successfully updated!");
                setSuccessMessage('RSVP atualizado com sucesso!');
            } else {

                console.log("Response not found, going to create");

                // Se não houver uma resposta existente, crie uma nova
                const rsvpResponse = client.models.WeddingInviteResponse.create(rsvpData);
                console.log("Response from create call:", rsvpResponse);
                console.log("RSVP successfully created!");
                setSuccessMessage('RSVP criado com sucesso!');
            }

            setError(null); // clears any error
        } catch (err) {
            setError('Erro ao criar RSVP. Tente novamente.');
            setSuccessMessage(''); // clears success message
            console.error("Erro ao criar RSVP:", err);
        }
    };

    return (
        <div id={id} className={styles.rsvpContainer}>

            <div className={styles.rsvpTitle}>RSVP</div>

            <div className={styles.rsvpSubTitle}>Por favor responder até ao dia 12 de abril 2025.</div>
            <div className={styles.footNote}>Informamos que a presença de crianças é reservada<br/> apenas para a família e para os maiores de seis
                anos.<br/> Agradecemos a compreensão!
            </div>

            <div className={styles.rsvpForm}>

                <form onSubmit={handleSubmit}>

                    <div className={styles.inputContainerName}>
                        <label className={styles.labelName}>
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
                        <PhoneInput
                            international
                            defaultCountry="PT"
                            value={phoneNumber}
                            className={phoneNumber ? styles.hasValue : styles.doesNotHaveValue}
                            onChange={setPhoneNumber}
                            required
                        />
                    </div>

                    <div className={styles.radioGroup}>
                        <label>Acompanhante:</label>
                        <label>
                            <input
                                type="radio"
                                name="plusOne"
                                value="yes"
                                className={styles.radioInput}
                                checked={isPlusOne}
                                onChange={() => {
                                    setIsPlusOne(true);
                                    setPlusOneName('');
                                }}
                            />
                            Sim
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="plusOne"
                                value="no"
                                className={styles.radioInput}
                                checked={!isPlusOne}
                                onChange={() => {
                                    setIsPlusOne(false);
                                    setPlusOneName('');
                                }}
                            />
                            Não
                        </label>
                    </div>

                    {isPlusOne && (
                        <div className={styles.inputContainerBig}>
                            <label className={styles.label}>
                                Nome do Acompanhante*:
                            </label>
                            <input
                                type="text"
                                className={plusOneName ? styles.hasValue : styles.doesNotHaveValue}
                                value={plusOneName}
                                onChange={(e) => setPlusOneName(e.target.value)}
                                required // Este campo é obrigatório
                            />
                        </div>
                    )}

                    <div className={styles.inputContainerBig}>
                        <label className={styles.label}>
                            Restrições alimentares:
                        </label>
                        <textarea
                            className={classNames(
                                styles.textarea,
                                {
                                    [styles.hasValue]: foodRestrictions,
                                    [styles.doesNotHaveValue]: !foodRestrictions,
                                    [styles.textareaFoodFocused]: textareaFoodFocused
                                }
                            )}
                            value={foodRestrictions}
                            onBlur={() => setTextareaFoodFocused(false)}
                            onFocus={() => setTextareaFoodFocused(true)}
                            onChange={(e) => setFoodRestrictions(e.target.value)}
                            rows={1} // Definir um número padrão de linhas
                        />
                    </div>

                    <div className={styles.inputContainerBig}>
                        <label className={styles.label}>
                            Sugestões musicais:
                        </label>
                        <textarea
                            className={classNames(
                                styles.textarea,
                                {
                                    [styles.hasValue]: musicSuggestions,
                                    [styles.doesNotHaveValue]: !musicSuggestions,
                                    [styles.textareaMusicFocused]: textareaMusicFocused
                                }
                            )}
                            value={musicSuggestions}
                            onBlur={() => setTextareaMusicFocused(false)}
                            onFocus={() => setTextareaMusicFocused(true)}
                            onChange={(e) => setMusicSuggestions(e.target.value)}
                            rows={1} // Definir um número padrão de linhas
                        />
                    </div>

                    <div className={styles.buttonContainer}>
                        <button
                            className={styles.primaryButton}
                            type="button"
                            onClick={() => {
                                setIsAttending(true);
                                handleSubmit();
                            }}
                        >
                            Confirmo
                        </button>
                        <button
                            className={styles.secondaryButton}
                            type="button"
                            onClick={() => {
                                setIsAttending(false);
                                handleSubmit();
                            }}
                        >
                            Não Confirmo
                        </button>
                    </div>


                    {error && <p style={{color: 'red'}}>{error}</p>}
                    {successMessage && <p style={{color: 'green'}}>{successMessage}</p>}

                </form>

            </div>

        </div>
    );
};

export default WeddingInviteForm;