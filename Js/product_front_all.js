const showProductArea = document.querySelector('#show_product_area');

const productIdArr = [];
let productCard = "";


fetch("http://localhost:8080/find_all")
    .then(res => res.json())
    .then(data => {
        data.productList.forEach((item) => {
            // productIdArr[index] = item;
            console.dir(item);
            productCard += `
            <a href="./product_info_1.html">
                <div id="product_card" class="bg-pri-pink p-8 rounded-2xl m-5 relative">
                    <img id="product_img" class=" h-48" src="../../img/pruductWall_img/pruductWall_${item.productId}.jpg" alt="">
                    <p id="product_Name" class=" mt-2 text-2xl">${item.productName}</p>
                    <p id="product_price" class=" mb-12 text-lg">$ ${item.price}</p>
                    <button id="add_cart${item.productId}" class="h-8 w-8 bg-white absolute bottom-5 right-8" type="button">🛒</button>
                </div>
            </a>
            `;
        })
        //展示清單在頁面上
        showProductArea.innerHTML = productCard;
    })


const searchBtn = document.querySelector('#search_btn');

searchBtn.addEventListener('click', function () {
    const serchKeyword = document.querySelector('#serch_keyword').value;

    body = {
        key
    }
    fetch('http://localhost:8080/search_product', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputId)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const dataProductName = data.product.productName;
            const dataCategory = data.product.category;
            const dataStock = data.product.stock;
            const dataPrice = data.product.price;

            productName.innerText = dataProductName;
            productCategory.innerText = "分類：" + dataCategory;
            productPrice.innerText = "售價：" + dataPrice;
            productStock.innerText = "庫存：" + dataStock;
        })
        .catch(error => {
            //報錯時要做的事情
            console.error('Error:', error);
        });

})
