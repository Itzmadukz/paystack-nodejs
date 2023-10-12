document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById('contact-form')
    const submitBttn = form.querySelector("button")

    let userData = {}

    submitBttn.addEventListener('click', function () {
        const inputs = form.querySelectorAll("input:not([type='submit'])")
        inputs.forEach(input => {
            userData[input.name] = input.value
            console.log(input.name, input.value)
        })
        payWithPaystack()
    })

    //verify handler 
    function verify(ref) {
        axios.post(`/verify/${ref}`)
            .then((response) => {
                window.location.href = '/confirmation';
            })
            .catch((e) => {
                window.location.href = '/confirmation';
            })
    }

    //paystack pop-up
    function payWithPaystack(e) {
        //e.preventDefault();
        console.log("Paystack function called")
        const reference = `${Math.floor((Math.random() * 1000000000) + 1)}`
        let handler = PaystackPop.setup({
            key: 'pk_test_583bdd92a5a6d1c6f98e2d25140251220c93e1b8', // Public key
            email: userData.email,
            currency: 'NGN',
            amount: userData.amount * 100,
            ref: reference,
            metadata: {
                custom_fields: [
                    {
                        display_name: 'Name',
                        variable_name: 'name',
                        value: userData.name
                    }
                ],
            },
            onClose: function () {
                verify(reference)
            },
            callback: function (response) {
                const reference = response.reference
                verify(reference)
            }
        });
        handler.openIframe();

    }
})

