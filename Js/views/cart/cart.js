const sendOrderDOM = document.querySelector("#sendOrder")

const product1DOM = document.querySelector("#product1")
const product2DOM = document.querySelector("#product2")
const product3DOM = document.querySelector("#product3")
const product4DOM = document.querySelector("#product4")

const quantity1DOM = document.querySelector("#quantity1")
const quantity2DOM = document.querySelector("#quantity2")
const quantity3DOM = document.querySelector("#quantity3")
const quantity4DOM = document.querySelector("#quantity4")



sendOrderDOM.addEventListener("click", function () {
    const memberId = sessionStorage.getItem("member_id");
    const products = {};

    if (product1DOM.checked) {
        // const quantity = parseInt(quantity1DOM.value);
        products[product1DOM.getAttribute("name")] = quantity1DOM.value;
        // console.log(productId)
    }

    if (product2DOM.checked) {
        const productId2 = product2DOM.getAttribute("name");
        const quantity2 = parseInt(quantity2DOM.value);
        products[product2DOM.getAttribute("name")] = quantity2DOM.value;
    }

    if (product3DOM.checked) {
        const productId3 = product3DOM.getAttribute("name");
        const quantity3 = parseInt(quantity3DOM.value);
        products[product3DOM.getAttribute("name")] = quantity3DOM.value;
    }

    if (product4DOM.checked) {
        const productId4 = product4DOM.getAttribute("name");
        const quantity4 = parseInt(quantity4DOM.value);
        products[product4DOM.getAttribute("name")] = quantity4DOM.value;
    }

    const requestData = {
        member: {
            memberId: memberId
        },
        products,
    };
    console.log(requestData)
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