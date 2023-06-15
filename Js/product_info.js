//抓dom
const productImg = document.querySelector('#product_img');
const productName = document.querySelector('#product_name');
const productCategory = document.querySelector('#product_category');
const productPrice = document.querySelector('#product_price');
const productStock = document.querySelector('#product_stock');

//父層
const showDetailArea = document.querySelector('#show_detail_area');

// 獲取網址中的查詢參數
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// 使用 get() 方法獲取指定的查詢參數值
const productId = urlParams.get('productId');
console.log(productId);


//找出資料庫的資料：用input去改
fetch('http://localhost:8080/find_one', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: productId
})
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const dataProductName = data.product.productName;
        const dataCategory = data.product.category;
        const dataStock = data.product.stock;
        const dataPrice = data.product.price;

        productImg.src = `../../img/pruductWall_img/pruductWall_${productId}.jpg`
        productName.innerText = dataProductName;
        productCategory.innerText = "分類：" + dataCategory;
        productPrice.innerText = "售價：" + dataPrice;
        productStock.innerText = "庫存：" + dataStock;
    })
    .catch(error => {
        //報錯時要做的事情
        console.error('Error:', error);
    });

//點下加入購物車之後的動作
const addCart = document.querySelector('#add_cart');
addCart.addEventListener('click', function () {

})