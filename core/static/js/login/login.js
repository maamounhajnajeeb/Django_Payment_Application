let form = document.forms[0];

form.onsubmit = (e) => {
    e.preventDefault();

    const csrfToken = form.firstElementChild.value;
    const url = "http://127.0.0.1:8000/api/v1/login/";

    const data = {
        username: form.children[1].value,
        password: form.children[2].value
    };

    fetch(url, {
        method: "POST",
        headers: {
            'Content-Type' : 'application/json',
            'X-CSRFToken' : csrfToken
        },
        body: JSON.stringify(data)
    }).then((response) => response.json())
    .then((data) => {
        window.localStorage.setItem("token", data["token"]);
    });
};
