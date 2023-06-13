

const form = document.querySelector("#checkoutForm")

const cartData = {
    member:
    {
        memberId: "E123456789"
    }
};
console.log(cartData)
fetch("http://localhost:8080/getCartProduct", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(cartData)
})
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        alert(data.message);
        console.log(data)
    })
    .catch(function (error) {
        console.log("An error occurred:", error);
    });
function renderResult(data) {

    const resultContainer = document.getElementById("resultContainer");

    const resultHTML = `<p>${data.message}</p>`;


    resultContainer.innerHTML = resultHTML;
}