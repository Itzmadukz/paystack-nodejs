const express = require('express')
const router = express.Router()

const middleware = require('../middlewares/middlewares')
const paystack = require('../controller/paystack')

//middlewares
router.use(middleware);

router.get('/', (req, res) => {
    res.render('home')
})

//paystack verify payment
router.post('/verify/:ref', paystack.verify)

router.get('/confirmation', (req, res) => {
    const output = req.session.output

    console.log("===========confirmation==============")
    console.log(output.status)
    res.render('confirmation', { ...output })
})

module.exports = router