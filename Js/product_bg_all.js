

// 所有商品
const showProduct = document.getElementById("show_product");

let productCard = "";
fetch("http://localhost:8080/find_all")
    .then(res => res.json())
    .then(data => {
        data.productList.forEach(item => {
            console.dir(item);
            productCard +=
                `
                    <div class="product_bg flex justify-center items-center h-48 w-auto bg-pri-green rounded-xl m-5">
                        <div class="w-1/4">
                            <img src="../../img/pruductWall_img/pruductWall_1.jpg" id="product_img" class="p-3">
                        </div>
                        <div class="w-1/2">
                            <div class="d">
                                <p class="bg-white rounded-md p-1 mx-1 mb-2">名稱：
                                    <span id="product_show_name">${item.productName}</span>
                                </p>
                            </div>
                            <div class="d">
                                <p class="bg-white rounded-md p-1 m-1">分類：<span id="product_show_cate">${item.category}</span>
                                </p>
                            </div>
                            <div class="d flex">
                                <p class="bg-white rounded-md p-1 m-1 w-1/2">
                                    庫存：
                                    <span id="product_show_stock">${item.stock}</span>
                                </p>
                                <p class="bg-white rounded-md p-1 m-1 w-1/2">
                                    價格：
                                    <span id="product_show_price">${item.price}</span>
                                </p>
                            </div>
                        </div>
                        <a href="./product_bg_update.html"><button type="button" class="w-1/5 m-5 bg-pri-pink">修改資訊</buttom></a>
                    </div>
                    `;
        });
        showProduct.innerHTML = productCard;
    })


