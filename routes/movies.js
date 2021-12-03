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



router.post('/:id', (req, res) => {

    const user_id = req.session.userId
    const movie_id = req.params.id
    const rating = req.body.rating;


    if (!req.session.userId) { res.send("please log in to rate") }
    else {

        db.one(
            "INSERT INTO ratings (rating, movie_id, user_id) VALUES ($1, $2, $3) RETURNING rating,id",
            [rating, movie_id, user_id])

            .then((data) => {
                res.send({
                    ...data,
                    success: true,
                    userId: req.session.userId,
                    rating: req.body.rating
                });
            })
            .catch((error) => {
                console.log(error);
                res.send(error);
            });
    }

})



module.exports = router


