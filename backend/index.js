
const express = require('express'),
    app = express(),
    passport = require('passport'),
    port = process.env.PORT || 80,
    cors = require('cors'),
    cookie = require('cookie')

const bcrypt = require('bcrypt')

const db = require('./database.js')
let users = db.users

let animes = {
    list:
        [
            {
                id: 1,
                title: `I Shaved. Then I Brought a High School Girl Home., Higehiro`,
                studios: 'Project No.9',
                eps: 13, source: 'Light novel',
                rating: 'PG-13 ', aired: 'TV - Apr 5, 2021, 22:30 (JST)',
                genres: ' Drama, Romance',
                day: 'Monday'
            },
            {
                id: 2,
                title: 'To Your Eternity',
                studios: `Brain's Base`,
                eps: 20, source: ' Manga',
                rating: 'None',
                aired: 'TV - Apr 12, 2021, 22:50 (JST)',
                genres: ' Adventure, Supernatural, Drama, Shounen',
                day: 'Monday'
            },

        ]
}

require('./passport.js')

const router = require('express').Router(),
    jwt = require('jsonwebtoken')

app.use('/api', router)
router.use(cors({ origin: 'http://localhost:3000', credentials: true }))
// router.use(cors())
router.use(express.json())
router.use(express.urlencoded({ extended: false }))

//-----------------------------------------------------------------------------------------// 
//Anime

router.route('/animes')
    .get((req, res) => res.json(animes))
    .post((req, res) => {
        console.log(req.body)
        //let id = (animes.list.length)? animes.list[animes.list.length-1].id+1:1
        let newAnime = {}
        newAnime.id = (animes.list.length) ? animes.list[animes.list.length - 1].id + 1 : 1
        newAnime.title = req.body.title
        newAnime.studios = req.body.studios
        newAnime.eps = req.body.eps
        newAnime.rating = req.body.rating
        newAnime.aired = req.body.aired
        newAnime.genres = req.body.genres
        newAnime.day = req.body.day
        animes = { list: [...animes.list, newAnime] }
        res.json(animes)
    })

router.route('/animes/:anime_id') //params
    .get((req, res) => {
        let id = animes.list.findIndex((item) => (+item.id === +req.params.anime_id))

        if (id === -1) {
            res.send('Not Found')
        }
        else {
            res.json(animes.list[id])
        }


    })
    .put((req, res) => {
        let id = animes.list.findIndex((item) => (+item.id === +req.params.anime_id))
        if (id === -1) {
            res.send('Not Found')
        }
        else {
            animes.list[id].title = req.body.title
            animes.list[id].studios = req.body.studios
            animes.list[id].eps = req.body.eps
            animes.list[id].rating = req.body.rating
            animes.list[id].aired = req.body.aired
            animes.list[id].genres = req.body.genres
            animes.list[id].day = req.body.day
            res.json(animes)
        }


    })
    .delete((req, res) => {

        let id = animes.list.findIndex((item) => (+item.id === +req.params.anime_id))
        if (id === -1) {
            res.send('Not Found')
        }
        else {
            animes.list = animes.list.filter((item) => +item.id !== +req.params.anime_id)
            res.json(animes)
        }
    })


//-----------------------------------------------------------------------------------------// 


router.post('/login', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        console.log('Login: ', req.body, user, err, info)
        if (err) return next(err)
        if (user) {
            const token = jwt.sign(user, db.SECRET, {
                expiresIn: (req.body.rememberme === "on") ? '7d' : '1d'
            })
            // req.cookie.token = token
            res.setHeader(
                "Set-Cookie",
                cookie.serialize("token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== "development",
                    maxAge: 60 * 60,
                    sameSite: "strict",
                    path: "/",
                })
            );
            res.statusCode = 200
            return res.json({ user, token })
        } else
            return res.status(422).json(info)
    })(req, res, next)
})

router.get('/logout', (req, res) => {
    res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", '', {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: -1,
            sameSite: "strict",
            path: "/",
        })
    );
    res.statusCode = 200
    return res.json({ message: 'Logout successful' })
})

/* GET user profile. */
router.get('/profile',
    passport.authenticate('jwt', { session: false }),
    (req, res, next) => {
        res.send(req.user)
    });

router.post('/register',
    async (req, res) => {
        try {
            const SALT_ROUND = 10
            const { username, email, password } = req.body
            if (!username || !email || !password)
                return res.json({ message: "Cannot register with empty string" })
            if (db.checkExistingUser(username) !== db.NOT_FOUND)
                return res.json({ message: "Duplicated user" })

            let id = (users.users.length) ? users.users[users.users.length - 1].id + 1 : 1
            hash = await bcrypt.hash(password, SALT_ROUND)
            users.users.push({ id, username, password: hash, email })
            res.status(200).json({ message: "Register success" })
        } catch {
            res.status(422).json({ message: "Cannot register" })
        }
    })

//router.get('/alluser', (req,res) => res.json(db.users.users))

router.get('/', (req, res, next) => {
    res.send('Respond without authentication');
});


// Error Handler
app.use((err, req, res, next) => {
    let statusCode = err.status || 500
    res.status(statusCode);
    res.json({
        error: {
            status: statusCode,
            message: err.message,
        }
    });
});

// Start Server
app.listen(port, () => console.log(`Server is running on port ${port}`))

