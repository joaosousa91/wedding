import styles from "./Local.module.css";

export interface LocalProps {
    id?: string; // Define o tipo da prop id para ser opcional
}

function Local({id}: LocalProps) {

    return(
        <div id={id}>
            <div>

                <div className={styles.localContainer}>Horas/ Local</div>
                <div className={styles.localPlace}>Às 16h00 no Farol da Guia</div>
                <div className={styles.localAddress}>Avenida Rei Humberto II de Itália,<br /> 2750 641 CASCAIS.</div>
                <div className={styles.localButton} onClick={
                    () => {
                        window.location.href="https://www.waze.com/en/live-map/directions/farol-da-guia-cascais?place=w.229769603.-1997598946.8845787";
                    }
                }>Localização
                </div>

            </div>
        </div>
    );
}

export default Local;