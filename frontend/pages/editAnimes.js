import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
import styles from '../styles/ani.module.css'
import axios from 'axios'
import aniAuth from '../components/aniAuth'
import config from '../config/config'
import useSWR, { mutate } from 'swr'
import React, { Component } from 'react'


const URL = `${config.URL}/animes`
const fetcher = url => axios.get(url).then(res => res.data)
const editAnimes = ({ token }) => {

    const [idEdit, setidEdit] = useState('')
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
                Title : {(+idEdit !== +anime.id) ? anime.title :
                    (<input type="text" className={styles.text}

                        value={title}
                        onChange={(e) => setTitle(e.target.value)}>

                    </input >)
                } <br></br>
                <img src={`http://localhost:8080/files/${anime.id}.jpg`} width={200} height={250} />
                Studios : {(+idEdit !== +anime.id) ? anime.studios :
                    (<input type="text" className={styles.text}

                        value={studios}
                        onChange={(e) => setStudios(e.target.value)}>

                    </input >)
                } <br></br>
                Episodes : {(+idEdit !== +anime.id) ? anime.eps :
                    (<input type="text" className={styles.text}

                        value={eps}
                        onChange={(e) => setEps(e.target.value)}>

                    </input >)
                } <br></br>
                Source : {(+idEdit !== +anime.id) ? anime.source :
                    (<input list="source" className={styles.text}

                        value={source}
                        onChange={(e) => setSource(e.target.value)}>

                    </input >)

                } <br></br>
                Rating : {(+idEdit !== +anime.id) ? anime.rating :
                    (<input list="rating" className={styles.text}

                        value={rating}
                        onChange={(e) => setRating(e.target.value)}>

                    </input >)
                } <br></br>
                Genres : {(+idEdit !== +anime.id) ? anime.genres :
                    (<input type="text" className={styles.text}

                        value={genres}
                        onChange={(e) => setGenres(e.target.value)}>

                    </input >)
                } <br></br>
                Day :{(+idEdit !== +anime.id) ? anime.day :
                    (<input list="day" className={styles.text}

                        value={day}
                        onChange={(e) => setDay(e.target.value)}>

                    </input >)
                }
                <button onClick={() => editAnime(
                    data.list,
                    anime.id,
                    anime.title,
                    anime.studios,
                    anime.eps,
                    anime.source,
                    anime.rating,
                    anime.genres,
                    anime.day)}
                    className={`${styles.button} ${styles.btnEdit}`}>Edit</button>

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
    const editAnime = async (animes, id) => {
        setidEdit(id)
        let text = animes.find((anime) => +anime.id === +id)
        setTitle(text.title)
        setStudios(text.studios)
        setEps(text.eps)
        setSource(text.source)
        setRating(text.rating)
        setGenres(text.genres)
        setDay(text.day)
        if (+idEdit === +id) { //Press Edit again
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
            setidEdit(0)
        }


        mutate(URL)
    }

    const handleFileUpload = (e) => {
        var formData = new FormData()
        const file = e.target.files[0]
        formData.append('file', file)

        let xhr = new XMLHttpRequest()
        const url1 = 'http://localhost:8080/upload'
        xhr.open('post', url1, true)
        xhr.send(formData)
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

                <div>
                    <button onClick={() => addAnime(title, studios, eps, source, rating, genres)} className={`${styles.button} ${styles.btnAdd}`}>Add new anime</button>
                    <input type='file' name='file' onChange={handleFileUpload} />
                </div>

            </div>
        </Layout>
    )
}

export default aniAuth(editAnimes)

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}
