// SWAL介紹網址 https://pluscdev.com/tutorial-sweetalert2/

let inputId = 0
let productName = "";
let category = "";
let stock = 0;
let price = 0;
let quantity = 0;

const productUpdateName = document.getElementById('product_update_name');
const productUpdateCategory = document.getElementById('product_update_category');
const productUpdateStock = document.getElementById('product_update_stock');
const productUpdatePrice = document.getElementById('product_update_price')


// 獲取網址中的查詢參數
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// 使用 get() 方法獲取指定的查詢參數值
const productId = urlParams.get('productId');
// console.log("productId：" + productId);

//轉跳頁面直接顯示
fetch('http://localhost:8080/find_one', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: productId
})
    .then(response => response.json())
    .then(data => {
        console.log(data)
        productName = data.product.productName;
        category = data.product.category;
        stock = data.product.stock;
        price = data.product.price;

        productUpdateName.innerText = productName;
        productUpdateCategory.innerText = category;
        productUpdateStock.innerText = stock;
        productUpdatePrice.innerText = price;
    })
    .catch(error => {
        console.error('Error:', error);
        if (inputId > quantity) {
            document.getElementById('input_product_id').style.borderColor = "red"
            document.getElementById('notFound').style.display = "block";
        }
        if (isEmpty(inputId)) {
            document.getElementById('input_product_id').style.borderColor = "red"
            document.getElementById('notFound').style.display = "block";
        }
    });





// 查詢區
const inputbtn = document.getElementById('input_product_btn');
inputbtn.addEventListener('click', function () {
    inputId = document.getElementById('input_product_id').value; // 填入要查詢的產品ID

    document.getElementById('notFound').style.display = "none";
    document.getElementById('input_product_id').style.borderColor = "black"

    fetch('http://localhost:8080/find_one', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: inputId
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            productName = data.product.productName;
            category = data.product.category;
            stock = data.product.stock;
            price = data.product.price;

            productUpdateName.innerText = productName;
            productUpdateCategory.innerText = category;
            productUpdateStock.innerText = stock;
            productUpdatePrice.innerText = price;
        })
        .catch(error => {
            console.error('Error:', error);
            if (inputId > quantity) {
                document.getElementById('input_product_id').style.borderColor = "red"
                document.getElementById('notFound').style.display = "block";
            }
            if (isEmpty(inputId)) {
                document.getElementById('input_product_id').style.borderColor = "red"
                document.getElementById('notFound').style.display = "block";
            }
        });

})



//判斷輸入值為空
function isEmpty(value) {
    return (value === null || value === undefined || value.trim().length === 0);
}

// 修改區
const showUpdateNameAlert = () => {
    Swal.fire({
        title: '修改名稱',
        text: `原名稱：${productName}`,
        input: 'text',
        showConfirmButton: true,
        showCancelButton: true,
        backdrop: true,
        confirmButtonText: "確認修改",
        cancelButtonText: "取消"

    }).then((result) => {
        if (result.isConfirmed) {
            const inputtext = Swal.getInput().value;
            //判斷不得為空值
            if (isEmpty(inputtext)) {
                return;
            }
            // 存入資料庫
            let body = {
                product_id: inputId,
                product_name: inputtext
            }
            fetch('http://localhost:8080/update_product_name', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                "body": JSON.stringify(body)
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                })
                .catch(error => {
                    console.error('Error:', error);
                });

            //更新畫面文字
            productUpdateName.innerText = inputtext;

            Swal.fire({
                icon: 'success',
                title: '完成!',
            })
        }

    })
}

const showUpdateCategoryAlert = () => {
    Swal.fire({
        title: '修改分類',
        text: `原分類：${category}`,
        input: 'text',
        showConfirmButton: true,
        showCancelButton: true,
        backdrop: true,
        confirmButtonText: "確認修改",
        cancelButtonText: "取消"
    }).then((result) => {
        if (result.isConfirmed) {
            const inputtext = Swal.getInput().value;
            //判斷不得為空值
            if (isEmpty(inputtext)) {
                return;
            }
            // 存入資料庫
            let body = {
                product_id: inputId,
                category: inputtext
            }
            fetch('http://localhost:8080/update_product_category', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                "body": JSON.stringify(body)
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                })
                .catch(error => {
                    console.error('Error:', error);
                });

            //更新畫面文字
            productUpdateCategory.innerText = inputtext;

            Swal.fire({
                icon: 'success',
                title: '完成!',
            })

        }
    })
}

const showUpdateStockAlert = () => {
    Swal.fire({
        title: '修改庫存',
        text: `原庫存：${stock}`,
        input: 'number',
        showConfirmButton: true,
        showCancelButton: true,
        backdrop: true,
        confirmButtonText: "確認修改",
        cancelButtonText: "取消"

    }).then((result) => {
        if (result.isConfirmed) {
            const inputtext = Swal.getInput().value;
            //判斷不得為空值
            if (isEmpty(inputtext) || inputtext < 0) {
                return;
            }
            // 存入資料庫
            let body = {
                product_id: inputId,
                stock: inputtext
            }
            fetch('http://localhost:8080/update_product_stock', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                "body": JSON.stringify(body)
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                })
                .catch(error => {
                    console.error('Error:', error);
                });

            //更新畫面文字
            productUpdateStock.innerText = inputtext;

            Swal.fire({
                icon: 'success',
                title: '完成!',
            })
        }

    })
}

const showUpdatePriceAlert = () => {
    Swal.fire({
        title: '修改價格',
        text: `原價格：${price}`,
        input: 'number',
        showConfirmButton: true,
        showCancelButton: true,
        backdrop: true,
        confirmButtonText: "確認修改",
        cancelButtonText: "取消"

    }).then((result) => {
        if (result.isConfirmed) {
            const inputtext = Swal.getInput().value;
            //判斷不得為空值
            if (isEmpty(inputtext) || inputtext <= 0) {
                return;
            }
            // 存入資料庫
            let body = {
                product_id: inputId,
                price: inputtext
            }
            fetch('http://localhost:8080/update_product_price', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                "body": JSON.stringify(body)
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                })
                .catch(error => {
                    console.error('Error:', error);
                });

            //更新畫面文字
            productUpdatePrice.innerText = inputtext;

            Swal.fire({
                icon: 'success',
                title: '完成!',
            })
        }

    })
}
