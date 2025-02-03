import styles from "./Menu.module.css"

function Menu(){

    return <>
        <div className={styles.menuContainer}>

            <a href="#local">Horas/ Local</a>
            <a href="#dressCode">Dress Code</a>
            <a href="#rsvp">RSVP</a>
            <a href="#gift">Prenda</a>

        </div>
    </>

}

export default Menu;