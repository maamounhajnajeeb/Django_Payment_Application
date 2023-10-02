let stripe = {{ publishable_key }}

let elements = stripe.elements();

let style = {
    base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        '::placeholder': {
            color: '#aab7c4',
        }
    },

    invalid: {
        color: "#fa755a",
        iconColor: "#fa775a",
    },
};

let card = elements.create("card", {style: style});

card.mount("#card-element");

card.addEventListener("change", (e) => {
    let displayError = document.getElementById("card-errors");
    if (e.error) {
        displayError.textContent = e.error.message;
    } else {
        displayError.textContent = '';
    }
});

let form = document.getElementById("payment-form");
form.addEventListener("submit", (e) => {
    e.preventDefault();

    stripe.createToken(card)
    .then( (result) => {
        if (result.error) {
            let errorElement = document.getElementById("card-errors");
            errorElement.textContent = result.error.message;
        } else {
            stripTokenHandler(result.token);
        }
    });
});

function stripTokenHandler(token) {
    let form = document.getElementById("payment-form");
    let hiddenInput = document.createElement("input");
    hiddenInput.setAttribute("type", "hidden");
    hiddenInput.setAttribute("name", "stripeToken");
    hiddenInput.setAttribute("value", token.id);

    form.appendChild(hiddenInput);

    form.submit();
}
