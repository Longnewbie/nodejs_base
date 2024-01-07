//CREATE SERVER
import express from 'express'
import cors from 'cors'
require('dotenv').config()
import initRoutes from './src/routes'
require('./connect_db')

const app = express()
app.use(cors({
    origin: process.env.CLIENT_URL, 
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

initRoutes(app)

const PORT = process.env.PORT || 6666

const listener = app.listen(PORT, () => {
    console.log('Server on port: ' + listener.address().port)
})