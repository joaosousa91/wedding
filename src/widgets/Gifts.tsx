import styles from "./Gifts.module.css"
import {Image} from "@aws-amplify/ui-react";

export interface GiftProps {
    id?: string; // Define o tipo da prop id para ser opcional
}

function Gifts({id}:GiftProps){
    return <div id={id} className={styles.giftContainer}>

        <div className={styles.giftImageContainer}>

            <Image
                alt="separator"
                src="/assets/Gift.png"
                width="100%"
            />

        </div>

        <div className={styles.giftInfoContainer}>
            <div className={styles.giftTitle}>Prenda</div>
            <div className={styles.giftText}>Se desejarem contribuir para a nossa nova <br/>vida a dois, podem
                fazê-lo através da nossa conta. Qualquer ajuda será muito apreciada <br/> e tornará este
                momento ainda mais especial.
            </div>
            <div className={styles.giftSubTitle}>IBAN do casal</div>
            <div className={styles.giftIban}>PT50 0018 0003 6394 1249 0207 9</div>
        </div>

        <div className={styles.giftSeparator}>

            <Image
                alt="separator"
                src="/assets/Separator.png"
                height="100%"
                width="100%"
            />

        </div>

        <div className={styles.thanksText}>
            Muito obrigado, até já
        </div>




    </div>
}

export default Gifts;