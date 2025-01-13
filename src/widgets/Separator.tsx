import { Image } from "@aws-amplify/ui-react"
import styles from "./Separator.module.css"

function Separator() {
    return (
        <div className={styles.separatorContainer}>

            <Image
                alt="separator"
                src="/assets/Separator.png"
                height="100%"
                width="100%"
            />

        </div>
    );
}

export default Separator;