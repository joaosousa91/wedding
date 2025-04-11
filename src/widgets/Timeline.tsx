import styles from './Timeline.module.css';

const timelineItems = [
    { icon: 'Arch.png', label: 'Chegada', time: '16:00' },
    { icon: 'Rings.png', label: 'Cerimónia', time: '16:30' },
    { icon: 'Glasses.png', label: 'Cocktail', time: '17:30' },
    { icon: 'Forks.png', label: 'Copo de Água', time: '20:00' },
    { icon: 'Cake.png', label: 'Corte do Bolo', time: '00:00' },
    { icon: 'DiscoBall.png', label: 'Festa', time: '00:45' },
];

const Timeline = () => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Linha do tempo</h2>

            <div className={styles.timelineGrid}>
                {/* Coluna Esquerda: Ícones */}
                <div className={styles.leftColumn}>
                    {timelineItems.map((item, index) => (
                        <img
                            key={index}
                            src={`/assets/${item.icon}`}
                            alt={item.label}
                            className={styles.icon}
                        />
                    ))}
                </div>

                {/* Coluna do Meio: Imagem única */}
                <div className={styles.centerColumn}>
                    <img
                        src="/assets/VerticalDivider.png"
                        className={styles.dividerImage}
                    />
                </div>

                {/* Coluna Direita: Texto */}
                <div className={styles.rightColumn}>
                    {timelineItems.map((item, index) => (
                        <div key={index} className={styles.textBlock}>
                            <div className={styles.label}>{item.label}</div>
                            <div className={styles.time}>{item.time}</div>
                        </div>
                    ))}
                </div>
            </div>

            <p className={styles.footer}>Encerra às 3:00 da manhã</p>
        </div>
    );
};

export default Timeline;
