let publishable_key = "pk_test_51NkkK1Feq4GSqlxQgeZEDgdKlidDxGI9Lq2zxnHEo7yCwnVbRKKWlTwnU6AswGazL6ZSCuWXgePMi85GUpO6oydE002UjlqE77";

let stripe = Stripe(publishable_key);

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
    
    // const csrfToken = form.firstElementChild.value;
    // console.log(token.id);
    // const url = "http://127.0.0.1:8000/payment_app/api/charge/";

    // const data = {
    //     price: 5,
    //     product: "name",
    //     quantity: 5,
    // };

    // fetch(url, {
    //     method: "GET",
    //     headers: {
    //         'Authorization': `Token ${window.localStorage.getItem("token")}`,
    //         'Content-Type' : 'application/json',
    //         'X-CSRFToken' : csrfToken
    //     },
        // body: JSON.stringify(data)
    // }).then((response) => response.json())
    // .then((data) => console.log(data));

    form.submit();
}
