// SWAL介紹網址 https://pluscdev.com/tutorial-sweetalert2/

// 父層
const showProduct = document.getElementById("show_product");

//填滿商品(暫不考慮分頁)
const productIdArr = [];
let productCard = "";
fetch("http://localhost:8080/find_all")
    .then(res => res.json())
    .then(data => {
        data.productList.forEach((item) => {
            console.dir(item);
            productCard +=
                `
                    <div class="product_bg flex justify-center items-center h-48 w-auto bg-pri-green rounded-xl m-5">
                        <div class="w-1/4 flex flex-col justify-center items-center">
                            <img src="../../img/pruductWall_img/pruductWall_${item.productId}.jpg" id="product_img${item.productId}" class=" w-2/3">
                        </div>
                        <div class="w-1/2">
                        <p>商品編號：${item.productId}</p>
                            <div class="d">
                                <p class="bg-white rounded-md p-1 mx-1 mb-2">名稱：
                                    <span id="product_show_name${item.productId}">${item.productName}</span>
                                </p>
                            </div>
                            <div class="d">
                                <p class="bg-white rounded-md p-1 m-1">分類：<span id="product_show_cate${item.productId}">${item.category}</span>
                                </p>
                            </div>
                            <div class="d flex">
                                <p class="bg-white rounded-md p-1 m-1 w-1/2">
                                    庫存：
                                    <span id="product_show_stock${item.productId}">${item.stock}</span>
                                </p>
                                <p class="bg-white rounded-md p-1 m-1 w-1/2">
                                    價格：
                                    <span id="product_show_price${item.productId}">${item.price}</span>
                                </p>
                            </div>
                        </div>
                        <a href="./product_bg_update.html?productId=${encodeURIComponent(item.productId)}">
                            <button type="button" class=" m-5 bg-pri-pink">
                            修改資訊
                            </button>
                        </a>
                    </div>
                    `;
        })
        console.dir(productIdArr);
        //展示清單在頁面上
        showProduct.innerHTML = productCard;


        //把ID傳給update頁面!!!
        showProduct.addEventListener('click', function (event) {
            if (event.target.tagName === 'BUTTON') {
                const productCard = event.target.closest('.product_bg');
                const productId = productCard.querySelector('p[id^="product_show_name"]').id.replace('product_show_name', '');
                window.location.href = `../product_bg_update.html?productId=${encodeURIComponent(productId)}`;
            }
        });
    })

