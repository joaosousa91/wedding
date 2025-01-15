import "@aws-amplify/ui-react/styles.css";
import Card from "./widgets/Card";
import Countdown from "./widgets/Countdown"
import Separator from "./widgets/Separator";
import Local from "./widgets/Local"
import WeddingInviteForm from "./widgets/WeddingInviteForm";
import DressCode from "./widgets/DressCode.tsx";


function App() {
    return <>
        <Card />
        <Countdown />
        <Separator />
        <Local />
        <DressCode />
        <Separator />
        <WeddingInviteForm />
    </>
}

export default App;