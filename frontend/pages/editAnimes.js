import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
import styles from '../styles/std.module.css'
import axios from 'axios'
import aniAuth from '../components/aniAuth'
import config from '../config/config'
import useSWR, { mutate } from 'swr'

const URL = `${config.URL}/animes`
const fetcher = url => axios.get(url).then(res => res.data)
const editAnimes = ({ token }) => {

    const [anime, setAnime] = useState('')
    const [title, setTitle] = useState('')
    const [studios, setStudios] = useState('')
    const [eps, setEps] = useState('')
    const [source, setSource] = useState('')
    const [rating, setRating] = useState('')
    const [genres, setGenres] = useState('')
    const [day, setDay] = useState('')

    const { data } = useSWR(URL, fetcher)
    if (!data) return <div>Loading...</div>

    const printAnimes = (animes) => {
        console.log('Animes:', animes)
        if (animes && animes.length)
            return (animes.map((anime, index) =>
            (<li key={index} className={styles.listItem}>
                ID : {(anime) ? anime.id : '-'} <br></br>
                Title : {(anime) ? anime.title : '-'} <br></br>
                <img src={`http://localhost:8080/files/${anime.id}.jpg`} width={200} height={250} />
                Studios : {(anime) ? anime.studios : '-'} <br></br>
                Episodes : {(anime) ? anime.eps : '-'} <br></br>
                Source : {(anime) ? anime.source : '-'} <br></br>
                Rating : {(anime) ? anime.rating : '-'} <br></br>
                Genres : {(anime) ? anime.genres : '-'} <br></br>
                Day : {(anime) ? anime.day : '-'}
                <button onClick={() => updateAnime(anime.id)} className={`${styles.button} ${styles.btnEdit}`}>Update</button>
                <button onClick={() => deleteAnime(anime.id)} className={`${styles.button} ${styles.btnDelete}`}> Delete </button>
            </li>)
            ))
        else {
            return (<h2>No animes</h2>)
        }
    }

    const addAnime = async (title, studios, eps, source, rating, genres) => {
        const result = await axios.post(URL, { title, studios, eps, source, rating, genres })
        console.log(result.data)
        mutate(URL)
    }

    const deleteAnime = async (id) => {
        const result = await axios.delete(`${URL}/${id}`)
        console.log(result.data)
        mutate(URL)
    }
    const updateAnime = async (id) => {
        const result = await axios.put(`${URL}/${id}`, {
            title,
            studios,
            eps,
            source,
            rating,
            genres,
            day
        })
        console.log('anime id update: ', result.data)
        mutate(URL)
    }


    // const upload = (file) => {
    //     console.log(file)

    //     fetch('http://localhost:8080/upload', {
    //         method: 'POST',
    //         body: file 
    //     }).then(
    //         response => response.json() // if the response is a JSON object
    //     ).then(
    //         success => console.log(success) // Handle the success response object
    //     ).catch(
    //         error => console.log(error) // Handle the error response object
    //     );

    // };

    return (
        <Layout>
            <Head>
                <title>animes</title>
            </Head>
            <div className={styles.container}>
                <Navbar />

                <ul className={styles.list}>
                    {printAnimes(data.list)}
                </ul>
                <h1>Add anime</h1>
                <div className={styles.list}>
                    Title : <input type="text" onChange={(e) => setTitle(e.target.value)} className={styles.textInput} />
                    Studios : <input type="text" onChange={(e) => setStudios(e.target.value)} className={styles.textInput} />
                    Episodes : <input type="text" onChange={(e) => setEps(e.target.value)} className={styles.textInput} />
                </div>
                <div className={styles.list}>
                    Source : <input list="source" onChange={(e) => setSource(e.target.value)} className={styles.textInput} />
                    <datalist id="source">
                        <option value="Manga" />
                        <option value="Light novel" />
                        <option value="Original" />
                        <option value="Web manga" />
                        <option value="Game" />
                        <option value="Novel" />
                        <option value="Other" />
                    </datalist>
                    Rating : <input list="rating" onChange={(e) => setRating(e.target.value)} className={styles.textInput} />
                    <datalist id="rating">
                        <option value="None" />
                        <option value="PG" />
                        <option value="PG-13" />
                        <option value="R - 17+" />
                        <option value=" R+" />
                    </datalist>
                    Genres : <input type="text" onChange={(e) => setGenres(e.target.value)} className={styles.textInput} />
                    Day : <input list="day" onChange={(e) => setDay(e.target.value)} className={styles.textInput} />
                    <datalist id="day">
                        <option value="Monday" />
                        <option value="Tuesday" />
                        <option value="Wednesday" />
                        <option value="Thursday" />
                        <option value="Friday" />
                        <option value="Saturday" />
                        <option value="Sunday" />
                    </datalist>
                </div>


                <button onClick={() => addAnime(title, studios, eps, source, rating, genres)} className={`${styles.button} ${styles.btnAdd}`}>Add new anime</button>
                {/* <input  type="file" name="file" onChange={(e)=>upload(e.target.value)}/> */}
            </div>
        </Layout>
    )
}

export default aniAuth(editAnimes)

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}
