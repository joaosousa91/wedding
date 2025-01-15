import styles from "./DressCode.module.css"
import {Image} from "@aws-amplify/ui-react";

function DressCode(){

    return <>
        <div className={styles.dressCodeContainer}>
            <div className={styles.photoContainer}>
                <Image
                    alt="Beatriz & João na escadaria"
                    src="/assets/DressCode.png"
                    width="100%"
                />
            </div>
            <div className={styles.separatorContainer}>
                <Image
                    alt=""
                    src="/assets/VerticalSeparator.png"
                    height="100%"
                    width="15%"
                />
            </div>
        </div>
        <div className={styles.dressCodeInfoContainer}>
            <div className={styles.dressCodeHeader}>Dress Code</div>
            <div className={styles.dressCodeText}>Summer cocktail attire Chique e Colorido</div>
            <div className={styles.colorContainer}>
                <div className={styles.colorContainerLine}>
                    <Image
                        alt=""
                        src="/assets/Line.png"
                        height="2%"
                        width="100%"
                    />
                </div>
                <div className={styles.colorContainerText}>Cores a evitar</div>
                <div className={styles.colorContainerLine}>
                    <Image
                        alt=""
                        src="/assets/Line.png"
                        height="2%"
                        width="100%"
                    />
                </div>
            </div>
            <div className={styles.circlesContainer}>
                <div className={styles.circlesBlockContainer}>
                    <div className={styles.circleWhite}></div>
                    <div className={styles.circleText}>Branco</div>
                </div>
                <div className={styles.circlesBlockContainer}>
                    <div className={styles.circleRed}></div>
                    <div className={styles.circleText}>Vermelho</div>
                </div>
                <div className={styles.circlesBlockContainer}>
                    <div className={styles.circleBlack}></div>
                    <div className={styles.circleText}>Preto</div>
                </div>
            </div>
        </div>
    </>

}

export default DressCode;