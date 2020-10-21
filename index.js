const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const { connect} = require('mongoose')
const { success, error } = require('consola')

const {DB, PORT} = require('./config')
const userRouter = require('./routes/users')

// Initialize the application
const app = express()

// Middlewares
app.use(cors());
app.use(bodyParser.json())

app.use('/api/users', userRouter)

const startApp = async () => {
    try {

        // Connect with DB
        await connect(DB, {
            useFindAndModify: true,
            useUnifiedTopology: true,
            useNewUrlParser: true
        })

        success({ 
            message: `Successfully connected with the Database \n ${DB}`
        }) 
        
        // Server star on Port
        app.listen(PORT, () => 
            success({ message: `Server started on http://localhost:${PORT}`})
        )
    } catch (err) {


        error({
            message: `Unable to connect with Database \n ${err}`
        }) 

        startApp()
    }
    
}

startApp()
