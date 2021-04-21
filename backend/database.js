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