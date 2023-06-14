const sendOrderDOM = document.getElementById("sendOrder")
const resultContainer = document.getElementById("resultContainer");
let productCard = "";

const cartData = {
    member:
    {
        memberId: sessionStorage.getItem("member_id")
    }
};

fetch("http://localhost:8080/findMemberCart", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(cartData)
})
    .then(function (response) {
        return response.json();
    })
    .then(data => {
        let shoppingCartMap = JSON.parse(data.message);
        console.log(shoppingCartMap)
        selectedProducts = data.cartList
        data.cartList.forEach(item => {
            console.dir(item);
            const key = item.productId;
            const value = shoppingCartMap[key];
            productCard +=
                `
                    <div class="product_bg flex justify-center items-center h-48 w-auto bg-pri-green rounded-xl m-5" id="father${item.productId}">
                    <input type="checkbox" data-click="0" data-check="${item.productId}" name="${item.productId}" id="product${item.productId}">
                        <div class="w-1/4">
                            <img src="../../img/logo.jpg" id="product_img" style="width: 50px;">
                        </div>
                        <div class="w-1/2">
                            <div class="d">
                                <p class="bg-white rounded-md p-1 mx-1 mb-2">名稱：
                                    <span id="product_show_name">${item.productName}</span>
                                </p>
                            </div>
                            <div class="d flex" name="sales" id="w">
                                <p class="bg-white rounded-md p-1 m-1 w-1/2" id="q">
                                    我要買：
                                    <span id="sale${item.productId}">${value}</span>
                                    個
                                </p>
                            </div>
                        </div>
                    </div>
                    `;
        });
        resultContainer.innerHTML = productCard;
    })
    .catch(function (error) {
        console.log("An error occurred:", error);
    });



let selectedProducts = [];
let selectedProducts2 = [];
resultContainer.addEventListener("click", function (e) {
    for (let i = 0; i < selectedProducts.length; i++) {
        const resultContainer = document.getElementById("father" + selectedProducts[i].productId).children[0];
        const productShowQuantity = document.querySelector("#sale" + selectedProducts[i].productId);
        if (resultContainer.checked) {
            console.log(productShowQuantity.textContent)
            const i = resultContainer.firstChild
            // const item = { productId: selectedProducts[i].productId, sales: productShowQuantity.textContent }
            selectedProducts2.push(item);
        }
    }
    console.log(selectedProducts2)
});

function removeDuplicate(arr) {
    const empty = []
    arr.forEach(item => {
        empty.includes(item) ? '' : empty.push(item)
    })
    return empty
}
sendOrderDOM.addEventListener("click", function () {
    let selectedProducts3 = removeDuplicate(selectedProducts2)
    const requestData =
    {
        member:
        {
            memberId: sessionStorage.getItem("member_id")
        },
        productId: selectedProducts3
    };

    fetch("http://localhost:8080/checkout", {
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