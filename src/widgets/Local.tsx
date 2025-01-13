import styles from "./Local.module.css";

function Local() {

    return(
        <>
            <div>

                <div className={styles.localContainer}>Local</div>
                <div className={styles.localPlace}>Farol da Guia</div>
                <div className={styles.localAddress}>Avenida Rei Humberto II de Itália, 2750 641 CASCAIS.</div>
                <div className={styles.localButton} onClick={
                    () => {
                        window.location.href="https://www.waze.com/en/live-map/directions/farol-da-guia-cascais?place=w.229769603.-1997598946.8845787";
                    }
                }>Localização
                </div>

            </div>
        </>
    );
}

export default Local;