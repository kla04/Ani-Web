import Link from 'next/link'
import styles from '../styles/Home.module.css'

const Navbar = () => (
    <div className={styles.center}>
        <h1  className={styles.header}>Animes Information</h1>
        <Link href="/"><a> Home </a></Link> |
        <Link href="/showAnimes"><a>Daily Animes </a></Link> |
        <Link href="/login"><a>Manage Animes </a></Link> |
        <Link href="/register"><a> Register </a></Link>  |
        <Link href="/logout"><a> Logout </a></Link> 
        
    </div>
)

export default Navbar