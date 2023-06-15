
const saveBtnDOM = document.querySelector('#product_add_save_btn')

//監聽按鈕按下儲存
saveBtnDOM.addEventListener('click', function () {
    const body = {
        product_name: document.querySelector('#product_name'),
        category: document.querySelector('#category'),
        price: document.querySelector('#stock'),
        stock: document.querySelector('#price')
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






