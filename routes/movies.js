const express = require('express')
const db = require('../database')
const router = express.Router()
router.get('/:id', (req, res) => {
    if (req.session.userId) {
        res.render('pages/movies', {
            title: 'Movies Page',
            movie_id: req.params.id,
            session: req.session
        })
    } else {
        res.render('pages/movies', {
            title: 'Movies Page',
            movie_id: req.params.id
        })
    }
})

// POST
//     / movie / { movie_id } / rating
// router.get('/:id/rating', (req, res) => {
//     //get from db
//     db.any("SELECT rating FROM ratings WHERE movie_id = $1 , [req.params.id] ")
//         .then((ratingValue) => {
//             res.render('pages/movies', {
//                 title: 'Movies Page',
//                 movie_id: req.params.id,
//                 //use session here
//                 session: req.session,
//                 ratingValue: ratingValue
//             })

//         })
//         .catch((error) => {
//             console.log(error)
//             res.send(error)
//         })

// })

// router.post('/:id/rating', (req, res) => {
//     if (!user) { res.send("please log in to rate") }
//     else {
//         db.one("INSERT INTO ratings (rating, movie_id, user_id) VALUES ($1, $2, $3) RETURNING id, rating, movie_id,  created_at", [req.body.rating, req.params.id])
//             .then((data) => {
//                 res.send({
//                     ...data,
//                     success: true
//                 })
//             })
//             .catch((error) => {
//                 console.log(error)
//                 res.send(error)
//             })
//     }
// })



module.exports = router


