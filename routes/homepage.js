const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    if(req.session.userId){
        res.render('pages/homepage',{
            title:"Homepage",
            session: req.session
        })
    }
    else{
    res.render('pages/homepage',{
        title:'Homepage'
    })
}
    
})

module.exports = router