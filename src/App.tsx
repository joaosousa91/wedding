import "@aws-amplify/ui-react/styles.css";
import Card from "./widgets/Card";
import Countdown from "./widgets/Countdown"
import Separator from "./widgets/Separator";
import Local from "./widgets/Local"
import WeddingInviteForm from "./widgets/WeddingInviteForm";
import DressCode from "./widgets/DressCode";
import Gifts from "./widgets/Gifts";
import Menu from "./widgets/Menu";
import Timeline from "./widgets/Timeline";
import styles from "./App.module.css"


function App() {

    const now = new Date();
    const deadline = new Date("2025-04-12T23:59:59");
    const isBeforeDeadline = now <= deadline;

    return <>
        <div className={styles.mainContainer}>
            <Card />
            <Menu />
            <Countdown id="countdown"/>
            <Separator />
            <Local id="local"/>
            <DressCode id="dressCode"/>
            <Separator />
            {isBeforeDeadline ? <WeddingInviteForm id="rsvp" /> : <Timeline />}
            <Separator />
            <Gifts id="gift"/>
        </div>
    </>
}

export default App;