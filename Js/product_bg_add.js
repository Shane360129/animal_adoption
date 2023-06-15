
const saveBtnDOM = document.querySelector('#product_add_save_btn')


//判斷輸入值為空
function isEmpty(value) {
    return (value === null || value === undefined || value.trim().length === 0);
}

//監聽按鈕按下儲存
saveBtnDOM.addEventListener('click', function () {

    const productName = document.querySelector('#product_name').value;
    const category = document.querySelector('#category').value;
    const price = document.querySelector('#price').value;
    const stock = document.querySelector('#stock').value;

    if (isEmpty(productName) || isEmpty(category) || stock < 0 || price <= 0) {
        Swal.fire({
            title: '尚有資料未輸入!',
            showConfirmButton: true,
            backdrop: true,
        })
    }

    const body = {
        product_name: productName,
        category: category,
        price: price,
        stock: stock,
    }

    fetch("http://localhost:8080/add_product", {
        method: "POST", //GET的時候不用這行
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    })
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data)
            Swal.fire({
                icon: 'success',
                title: `新增成功! 商品編號：${data.product.productId}`,
                showConfirmButton: true,
                backdrop: true,
            })
        })
})

//圖片
// const imgInput = document.querySelector('#product_img');
// imgInput.addEventListener('change', (e) => {
//     const pic = e.target.files[0];
//     console.log(e.target.files[0]);
//     const reader = new FileReader();
//     reader.readAsDataURL(pic)
//     reader.onload = function (e) {
//         console.log(e.target.result);
//     };
// })
// const imgBody = {
//     imgBase64: "e.target.files[0]",
//     sort: "",
//     id:
// }






