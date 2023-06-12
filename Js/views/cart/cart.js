const sendOrderDOM = document.querySelector("#sendOrder")

const product1DOM = document.querySelector("#product1")
const product2DOM = document.querySelector("#product2")
const product3DOM = document.querySelector("#product3")
const product4DOM = document.querySelector("#product4")

const quantity11DOM = document.querySelector("quantity1")
const quantity21DOM = document.querySelector("quantity2")
const quantity31DOM = document.querySelector("quantity3")
const quantity41DOM = document.querySelector("quantity4")



sendOrderDOM.addEventListener("click", function () {
    const memberId = "E123456789";
    const products = [];

    if (product1DOM.checked) {
        const productId = product1DOM.getAttribute("name");
        const quantity = parseInt(quantity1DOM.value);
        products.push({ productId, quantity });
        console.log(productId)
    }

    if (product2DOM.checked) {
        const productId = product2DOM.getAttribute("name");
        const quantity = parseInt(quantity2DOM.value);
        products.push({ productId, quantity });
    }

    if (product3DOM.checked) {
        const productId = product3DOM.getAttribute("name");
        const quantity = parseInt(quantity3DOM.value);
        products.push({ productId, quantity });
    }

    if (product4DOM.checked) {
        const productId = product4DOM.getAttribute("name");
        const quantity = parseInt(quantity4DOM.value);
        products.push({ productId, quantity });
    }

    const requestData = {
        member: {
            memberId: memberId
        },
        products: products
    };

    fetch("http://localhost:8080/addCart", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            alert(data.message);
        })
        .catch(function (error) {
            console.log("An error occurred:", error);
        });
});