const express = require('express')
const router = express.Router()

router.get('/:id',(req,res)=>{
    res.render('pages/movies',{
        title:'Movies Page',
        movie_id: req.params.id
    })
})

module.exports = router