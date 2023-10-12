let Paystack = require('paystack-node')
const environment = process.env.NODE_ENV
const paystack_key = process.env.PAYSTACK_KEY
const paystack = new Paystack(paystack_key, environment)

exports.verify = async (req, res) => {
    console.log("===========Paystack==============")

    const ref = req.params.ref;
    // ==== Paystack verify call ===== ///
    let output;
    let status;

    await paystack.verifyTransaction({
        reference: ref
    })

        .then(function (response) {
            console.log(response.body.data);
            output = response.body.data;
            status = 200
        }).catch(function (error) {
            status = 400
            output = {
                status: 'failed',
                error: error
            };
            console.log(error)
        })


    // Note: You will need to install express session or a session package
    // to make the out put accessible in the confirmation route or can use alternative methods

    //session payload
    req.session.output = output

    res.redirect('/confirmation')
}
