const express = require('express')
const router = express.Router()

router.get('/:id', (req, res) => {
    res.render('pages/movies', {
        title: 'Movies Page',
        movie_id: req.params.id
    })
})

// POST
//     / movie / { movie_id } / rating

router.post('/:id/rating', (req, res) => {
    //insert into db
    res.send('pages/movies', {
        title: 'Movies Page',
        movie_id: req.params.id,
        //use session here
        session_id: req.session.id
    })
})

module.exports = router