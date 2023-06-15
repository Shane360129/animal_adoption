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
        const selectedProducts = data.cartList
        data.cartList.forEach(item => {
            console.dir(item);
            const key = item.productId;
            console.log(key);
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
        resultContainer.addEventListener("click", function (e) {
            let item = e.target.getAttribute("data-check")  
            const productShowQuantity = document.querySelector("#sale" + item);
            if (e.target.checked == true) {
                selectedProducts2.push(productShowQuantity.textContent);
                products.push(item)
            } else {
                const index = selectedProducts2.findIndex(val => val === productShowQuantity.textContent); 
                if (index !== -1) {
                    selectedProducts2.splice(index, 1);
                    products.splice(index, 1);
                }
            }
            console.log(products)
            console.log(selectedProducts2)
        })
    })
    .catch(function (error) {
        console.log("An error occurred:", error);
    });


let products = [];
let selectedProducts2 = [];


sendOrderDOM.addEventListener("click", function () {
    const requestData =
    {
        member:
        {
            memberId: sessionStorage.getItem("member_id")
        },
        productId: products,
        sales: selectedProducts2
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