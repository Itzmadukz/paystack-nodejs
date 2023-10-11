document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById('contact-form')
    const submitBttn = form.querySelector("input[type='submit']")

    const userData = {}

    submitBttn.addEventListener('click', function () {
        const inputs = form.querySelectorAll("input:not([type='submit'])")
        inputs.forEach(input => {
            userData[input.name] = input.value
        })
    })
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
    let handler = PaystackPop.setup({
        key: 'Your_PUBLIC_KEY',
        email: user.email,
        currency: 'NGN',
        amount: userData.amout * 100,
        ref: 'Your Reference',
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