const showProductArea = document.querySelector('#show_product_area');

const productIdArr = [];
let productCard = "";

fetch("http://localhost:8080/find_all")
    .then(res => res.json())
    .then(data => {
        data.productList.forEach((item) => {
            console.dir(item);
            productCard += `
            <a href="./product_info.html?productId=${encodeURIComponent(item.productId)}">
                <div class="product_card bg-pri-pink p-8 rounded-2xl m-5 relative">
                    <img class="product_img h-48" src="../../img/pruductWall_img/pruductWall_${item.productId}.jpg" alt="">
                    <p class="product_Name mt-2 text-2xl">${item.productName}</p>
                    <p class="product_price mb-12 text-lg">$ ${item.price}</p>
                    <button class="add_cart h-8 w-8 bg-white absolute bottom-5 right-8" type="button" data-productid="${item.productId}">🛒</button>
                </div>
            </a>
            `;
        })
        //展示清單在頁面上
        showProductArea.innerHTML = productCard;

        //把ID傳遞給product_info.html
        const productCards = document.querySelectorAll('.product_card');
        productCards.forEach(card => {
            const productId = card.querySelector('.add_cart').getAttribute('data-productid');
            card.addEventListener('click', function () {
                window.location.href = `../product_info.html?productId=${encodeURIComponent(productId)}`;
            });
        });
    });



    //搜尋一直報錯 先不用
// const searchBtn = document.querySelector('#search_btn');

// searchBtn.addEventListener('click', function () {
//     const searchKeyword = document.querySelector('#search_keyword').value;
//     console.log(searchKeyword)

//     fetch('http://localhost:8080/search_product', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         "body": JSON.stringify({ keyword: searchKeyword })
//     })
//         .then(response => response.json())
//         .then(data => {
//             console.log(data)
//             // productCard = "";
//             // productCard += `
//             // <a href="./product_info_1.html">
//             //     <div id="product_card" class="bg-pri-pink p-8 rounded-2xl m-5 relative">
//             //         <img id="product_img" class=" h-48" src="../../img/pruductWall_img/pruductWall_${data.product.productId}.jpg" alt="">
//             //         <p id="product_Name" class=" mt-2 text-2xl">${data.product.productName}</p>
//             //         <p id="product_price" class=" mb-12 text-lg">$ ${data.product.price}</p>
//             //         <button id="add_cart${data.product.productId}" class="h-8 w-8 bg-white absolute bottom-5 right-8" type="button">🛒</button>
//             //     </div>
//             // </a>
//             // `;
//             //展示清單在頁面上
//             // showProductArea.innerHTML = productCard;

//         })
//         .catch(error => {
//             //報錯時要做的事情
//             console.error('Error:', error);
//             console.error("錯誤!");
//         });

// })
