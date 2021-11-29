const express = require('express')
const app = express()
const session = require('express-session')

//Port to listen
const PORT = process.env.PORT

//Middleware to parse req.body
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//For creating and using views
app.set('view engine', 'ejs')

// For css, js and images 
app.use(express.static('public'))

//morgan
const morgan = require('morgan')
app.use(morgan('dev'))

//Session config
app.use(session({
    cookie:{
        maxAge: 1000 * 60 * 60 * 24
    },
    name: "moviesdb",
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET

}))



//Routes
const homepageRouter = require('./routes/homepage')
const moviesRouter = require('./routes/movies')
const loginRouter = require('./routes/login')
const registerRouter = require('./routes/register')

app.use('/',homepageRouter)
app.use('/movies',moviesRouter)
app.use('/login',loginRouter)
app.use('/register',registerRouter)

app.listen(PORT, ()=>{
    console.log(`App is running on port ${PORT}`)
})