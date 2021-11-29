const express = require('express')
const router = express.Router()
const db = require("../database");

/* Encrypting the password */
const bcrypt = require("bcryptjs");

//Regex for validation
const emailRegex = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/
const passwordRegex = /^[^<>]{6,}$/
const regexForNumbers = /\d/
const regexForSpecialCharacters = /[-|$|=|_|(|)|{|}|:|;|'|"|.|>|<|,|!|@|#|%|^|&|?|\/|\\|\||~|`|*]/

//Method for valid inputs
const isValid = (value, regex) => {
  return regex.test(value);
};

//trim and lowercase email
const cleanEmail = (email) => {
  return email ? email.toLowerCase().trim() : "";
};

router.get('/',(req,res)=>{
    res.render('pages/register',{
        title:'Register Page'
    })
})

router.post('/',(req,res)=>{
    /* res.render('pages/register',{
        title:'Register Page'
    }) */
    const { fname, lname, email, password, confirmPassword } = req.body
    const cleanedEmail = cleanEmail(email);
    const error = []
    //input validation
    if (!fname || !lname || !email || !password || !confirmPassword)
    { 
        error.push({message:"Please enter all fields"})
        res.render('pages/register',{
            title:'Register Page',
            errors: error
        })
    }

    //check if first name is valid
    else if(regexForNumbers.test(fname)||regexForSpecialCharacters.test(fname)){
        error.push({message:"Enter a valid first name"})
        res.render('pages/register',{
            title:'Register Page',
            errors: error
        })
       }

    //check if last name is valid
    else if(regexForNumbers.test(lname)||regexForSpecialCharacters.test(lname)){
        error.push({message:"Enter a valid last name"})
        res.render('pages/register',{
            title:'Register Page',
            errors: error
        })
       }

    //check if email is valid   
    else if(!isValid(cleanedEmail, emailRegex)) 
    {
        error.push({message:"Email not valid"});
        res.render('pages/register',{
            title:'Register Page',
            errors: error
        })
    }
    //check if password is valid
    else if(!isValid(password, passwordRegex)) 
    {
        error.push({message:"Password must be 6 characters or more"});
        res.render('pages/register',{
            title:'Register Page',
            errors: error
        })
    }
    //check if password matches 
    else if(password !== confirmPassword) 
    {
        error.push({message:"Passwords don't match"});
        res.render('pages/register',{
            title:'Register Page',
            errors: error
        })
    }
    else{
        //checking if email exists
    db.oneOrNone("SELECT email FROM users WHERE email = $1;", [cleanedEmail])
    .then((user)=>{
        if (user){
            error.push({message:"User already exists"});
            res.render('pages/register',{
                title:'Register Page',
                errors: error
            })
        }
        else{
            //hash password
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            console.log(req.body);
            db.none(
                "INSERT INTO users (fname, lname, email, password) VALUES ($1, $2, $3, $4);",
                [fname, lname, cleanedEmail, hash]
            )
                .then(() => {
                res.redirect("/login");
                })
                .catch((err) => {
                // error inserting into db
                console.log(err);
                res.send(err.message);
                });
        }
    })
    .catch((err)=>{
        res.send(err)
    })
    }
        
})

module.exports = router