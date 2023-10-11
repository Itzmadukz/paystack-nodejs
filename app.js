const express = require ('express')
const app = express()
const routes = require("./routes/routes")
const middleware = require('./middlewares/middlewares')
const port = process.env.PORT || 8080


//middlewares
app.use(middleware);

//routes
app.use('/', routes)

//Local host port
app.listen(port, () => {
    console.log(`listening on ${port}`)
})