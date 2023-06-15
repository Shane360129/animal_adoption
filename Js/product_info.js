const showDetailArea = document.querySelector('#show_detail_area');

let inputId = 1;

const productName = document.querySelector('#product_name');
const productCategory = document.querySelector('#product_category');
const productPrice = document.querySelector('#product_price');
const productStock = document.querySelector('#product_stock');

//找出資料庫的資料：用input去改
fetch('http://localhost:8080/find_one', {
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
        productPrice.innerText = "售價：" + dataStock;
        productStock.innerText = "庫存：" + dataPrice;
    })
    .catch(error => {
        //報錯時要做的事情
        console.error('Error:', error);
    });




//點下加入購物車之後的動作
const addCart = document.querySelector('#add_cart');
addCart.addEventListener('click', function () {

})