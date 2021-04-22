const bcrypt = require('bcrypt')

let users = {
    users: [
        { id: 1, username: 'Kitti', password: '$2b$10$0AsMSQaUB0AlLnKzgeUOfOE.hWUodtuR4NOU954XLVy2gy3lBWsdO', email: 'Kitti@gmail.com' },
        { id: 2, username: 'Kla', password: '$2b$10$1Bu4tImM/Ms9rtU.8/n/COWpzUAGFB6YlsO5xZqFih1JUxafyFFXa', email: 'Kla@gmail.com' },
    ]
}
let animes = {
    list:
        [
            {
                id: 1,
                title: `I Shaved. Then I Brought a High School Girl Home., Higehiro`,
                studios: 'Project No.9',
                eps: '13', 
                source: 'Light novel',
                rating: 'PG-13 ', 
                aired: 'TV - Apr 5, 2021, 22:30 (JST)',
                genres: ' Drama, Romance',
                day: 'Monday'
            },
            {
                id: 2,
                title: 'To Your Eternity',
                studios: `Brain's Base`,
                eps: '20', 
                source: ' Manga',
                rating: 'None',
                aired: 'TV - Apr 12, 2021, 22:50 (JST)',
                genres: ' Adventure, Supernatural, Drama, Shounen',
                day: 'Monday'
            },
            {
                id: 3,
                title: 'Fruits Basket: The Final',
                studios: `TMS Entertainment`,
                eps:  'Unknown',
                source: ' Manga',
                rating: 'PG-13',
                aired: 'TV - Apr 6, 2021, 01:30 (JST)',
                genres: 'Slice of Life, Comedy, Supernatural, Drama, Romance, Shoujo',
                day: 'Tuesday'
            },
            {
                id: 4,
                title: `The Romcom Where The Childhood Friend Won't Lose!, Osamake`,
                studios: `Doga Kobo`,
                eps: '12',
                source: 'Light novel',
                rating: 'PG-13',
                aired: 'TV - Apr 14, 2021, 21:00 (JST)',
                genres: ' Harem, Comedy, Romance, School',
                day: 'Wednesday'
            },
            {
                id: 5,
                title: 'Zombie Land Saga Revenge',
                studios: `MAPPA`,
                eps: '12', 
                source: 'Original',
                rating: ' R - 17+',
                aired: 'TV - Apr 8, 2021, 23:30 (JST)',
                genres: ' Music, Comedy, Supernatural',
                day: 'Thursday'
            },
            {
                id: 6,
                title: 'How Not to Summon a Demon Lord Ω',
                studios: `Tezuka Productions, Okuruto Noboru`,
                eps: '10', 
                source: '  Light novel',
                rating: 'PG-13',
                aired: 'TV - Apr 9, 2021, 01:28 (JST)',
                genres: '  Harem, Comedy, Magic, Ecchi, Fantasy',
                day: 'Friday'
            },
            {
                id: 7,
                title: 'My Hero Academia 5',
                studios: `Bones`,
                eps: '25', 
                source: ' Manga',
                rating: 'PG-13 ',
                aired: 'TV - Mar 27, 2021, 17:30 (JST)',
                genres: ' Action, Comedy, Super Power, School, Shounen',
                day: 'Saturday'
            },
            {
                id: 8,
                title: 'Tokyo Revengers',
                studios: `Unknown`,
                eps: 'Unknown', 
                source: ' Manga',
                rating: 'PG-13',
                aired: 'TV - Apr 11, 2021, 02:08 (JST)',
                genres: '  Action, Supernatural, Drama, School, Shounen',
                day: 'Sunday'
            },



        ]
}

const SECRET = 'your_jwt_secret'
const NOT_FOUND = -1

exports.users = users
exports.animes = animes
exports.SECRET = SECRET
exports.NOT_FOUND = NOT_FOUND

exports.setUsers = function (_users) {
    users = _users;
}
exports.setAnimes = function (_animes) {
    animes = _animes
}
// === validate username/password ===
exports.isValidUser = async (username, password) => {
    const index = users.users.findIndex(item => item.username === username)
    return await bcrypt.compare(password, users.users[index].password)
}

// return -1 if user is not existing
exports.checkExistingUser = (username) => {
    return users.users.findIndex(item => item.username === username)
}