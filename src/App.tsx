import "@aws-amplify/ui-react/styles.css";
import Card from "./widgets/Card";
import Countdown from "./widgets/Countdown"
import Separator from "./widgets/Separator";
import Local from "./widgets/Local"
import WeddingInviteForm from "./widgets/WeddingInviteForm";
import DressCode from "./widgets/DressCode";
import Gifts from "./widgets/Gifts";
import Menu from "./widgets/Menu";


function App() {
    return <>
        <Card />
        <Menu />
        <Countdown id="countdown"/>
        <Separator />
        <Local id="local"/>
        <DressCode id="dressCode"/>
        <Separator />
        <WeddingInviteForm id="rsvp"/>
        <Separator />
        <Gifts id="gift"/>
    </>
}

export default App;