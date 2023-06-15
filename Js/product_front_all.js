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
                    <p id="product_Name" class=" mt-2 mb-12">${item.productName}</p>
                    <button id="add_cart${item.productId}" class="h-8 w-8 bg-white absolute bottom-5 right-8" type="button">🛒</button>
                </div>
            </a>
            `;
        })
        //展示清單在頁面上
        showProductArea.innerHTML = productCard;
    })