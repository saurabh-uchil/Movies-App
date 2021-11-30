const express = require('express')
const router = express.Router()
const db = require("../database");

/* Encrypting the password */
const bcrypt = require("bcryptjs");

//Regex for validation
const emailRegex = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/
const passwordRegex = /^[^<>]{6,}$/

//Method for valid inputs
const isValid = (value, regex) => {
    return regex.test(value);
  };

//trim and lowercase email
const cleanEmail = (email) => {
    return email ? email.toLowerCase().trim() : "";
  };

router.get('/',(req,res)=>{
    res.render('pages/login',{
        title:'Login Page'
    })
})

router.post('/',(req,res)=>{
    /* res.render('pages/login',{
        title:'Login Page'
    }) */
    const { email, password } = req.body
    const cleanedEmail = cleanEmail(email);
    const error = []

    //validation
    if (!email || !password){
        error.push({message:"Please enter all fields"})
        res.render('pages/login',{
            title:'Login Page',
            errors: error
        })
    }
    else if (!isValid(cleanedEmail, emailRegex)){
        error.push({message:"Email is not valid"});
        res.render('pages/login',{
            title:'Login Page',
            errors: error
        })
    }
    else if (!isValid(password, passwordRegex)){
        error.push({message:"Password is not valid"});
        res.render('pages/login',{
            title:'Login Page',
            errors: error
        })
    }
    else{
        db.oneOrNone("SELECT * FROM users WHERE email = $1;", [cleanedEmail])
        .then((user)=>{
            if(!user){
                error.push({message:"User does not exist"});
                res.render('pages/login',{
                title:'Login Page',
                errors: error
                })
            }
            //check if the password matches
            const checkPassword = bcrypt.compareSync(password, user.password)
            if(!checkPassword){
                error.push({message:"Password does not match"})
                res.render('pages/login',{
                    title:'Login Page',
                    errors: error
                    })
            }
            else{
                req.session.userId = user.user_id
                req.session.user = user.fname
                /* if(!req.session){
                    console.log("doesnot exist")
                }else{ */
                    console.log(req.session)
                /* } */
                res.render('pages/homepage',{
                    title:"Homepage",
                    session: req.session
                })
            }
        })
        .catch((err)=>{
            res.send(err)
        })
        console.log(req.body)
    }

    
})

module.exports = router