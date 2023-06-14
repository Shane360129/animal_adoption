// SWAL介紹網址 https://pluscdev.com/tutorial-sweetalert2/

// 父層
const showProduct = document.getElementById("show_product");

//填滿商品(暫不考慮分頁)
const productIdArr = [];
let productCard = "";
fetch("http://localhost:8080/find_all")
    .then(res => res.json())
    .then(data => {
        data.productList.forEach((item, index) => {
            console.dir(item);
            productCard +=
                `
                    <div class="product_bg flex justify-center items-center h-48 w-auto bg-pri-green rounded-xl m-5">
                        <div class="w-1/4 flex flex-col justify-center items-center">
                            <img src="../../img/pruductWall_img/pruductWall_${item.productId}.jpg" id="product_img" class=" w-2/3">
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

                        <button onclick="showAlert(${item})"
                        id="product_update_btn_${item.productId}" type="button" class="w-1/5 m-5 bg-pri-pink">
                        修改資訊
                        </buttom>
                    </div>
                    `;
            // 放入陣列
            productIdArr[index] = `product_update_btn_${item.productId}`;
        })
        console.dir(productIdArr);
        //展示清單在頁面上
        showProduct.innerHTML = productCard;
    })


// const showAlert = (item) => {
//     Swal.fire({
//         title: '修改商品資訊',
//         text: ``,
//         html: `<h5>原品名：${item.productName}</h5>

//         `,
//         input: 'text',
//         showConfirmButton: true,
//         backdrop: true,
//         confirmButtonText: "關閉",

//     }).then((result) => {
//         console.log(result)
//         if (result.isConfirmed) {
//             const inputtext = Swal.getInput()
//             updateNametext.innerText = inputtext.value;
//             Swal.fire({
//                 icon: 'success',
//                 title: '修改完成',
//             })
//         }

//     })
// }


//測試按鈕
const show1Alert = () => {
    Swal.fire({
        title: '修改商品資訊',
        html: `
        <button id="name_edit"
        class="bg-pri-light py-1 w-90 h-24 flex justify-between items-center mx-5 my-5">
            <img class="w-20 pl-2"
            src="https://3.bp.blogspot.com/-KqVSsXF1vFo/U9zpEUYEahI/AAAAAAAAkBY/00oPpgvnFlE/s1600/hiragana_01_a.png">
            <div class=" px-5">
                <p class="text-xs">【商品名稱】</p>
                <p class="mt-2 text-xl text-clip" id="product_update_name">
                    品名
                </p>    
            </div>
            <i class="fa-solid fa-pen-to-square fa-lg pr-5" style="color: #757575;"></i>
        </button> 
        <div id="name_edit_area" style="display:none" class="justify-center items-center">
            <input id="name_edit_input" type="text" class="h-12 w-1/2 border-2" placeholder="輸入新商品名">
            <button id="name_edit_btn" type="button" class="m-2">確定</button>
        </div>


        <div id="category_edit" 
        class="bg-pri-light py-1 w-90 flex justify-between items-center mx-5 my-5">
            <img class="w-20 pl-2"
            src="https://4.bp.blogspot.com/-yn703BXL-3U/VuKMXoMqr0I/AAAAAAAA4zA/Qcz_Kz6o0nkp6t1JrsNkdQDFozoBWrSng/s400/computer_folder.png">
            <div class=" px-5">
                <p class="text-xl">【分類】</p>
                <p class="mt-2 text-xs text-clip" id="product_update_category">
                    分類, 分類, 分類, 分類
                </p>
            </div>
            <i class="fa-solid fa-pen-to-square fa-lg pr-5" style="color: #757575;"></i>
        </div>

        <div id="stock_edit" 
        class="bg-pri-light py-1 w-90 flex justify-between items-center mx-5 my-5">
            <img class="w-20 pl-2"
            src="https://1.bp.blogspot.com/--ol-eoqhFHg/Xhwqi1LSKwI/AAAAAAABXBE/KNxAF4TB3FoUUXA5aHbRrdAlB_W7CZDQACNcBGAsYHQ/s400/nimotsu_box_close_bad.png">
            <div class=" px-5">
                <p class="text-xl">【庫存】</p>
                <p class="mt-2 text-xs" id="product_update_stock">
                    13456231
                </p>
            </div>
            <i class="fa-solid fa-pen-to-square fa-lg pr-5" style="color: #757575;"></i>
        </div> 
        <div id="price_edit" 
        class="bg-pri-light py-1 w-90 flex justify-between items-center mx-5 my-5">
            <img class=" w-20 pl-2"
            src="https://1.bp.blogspot.com/-KtVIPGzqFaU/VbnRnEF5z7I/AAAAAAAAwNo/WXdX-AlKG8I/s400/mark_yen_okaikei.png">
            <div class=" px-5">
                <p class="text-xl">【價格】</p>
                <p class="mt-2 text-xs" id="product_update_price">
                    9999999
                </p>
            </div>
            <i class="fa-solid fa-pen-to-square fa-lg pr-5" style="color: #757575;"></i>
        </div> 
        
        `,
        showConfirmButton: true,
        showCancelButton: false,
        backdrop: true,
        confirmButtonText: "關閉",
    })
    //品名
    const productUpdateName = document.getElementById("product_update_name")
    const nameEdit = document.getElementById("name_edit")
    console.log(nameEdit)
    nameEdit.addEventListener('click', () => {
        const nameEditArea = document.getElementById("name_edit_area")
        const nameEditInput = document.getElementById('name_edit_input');
        const nameEditBtn = document.getElementById('name_edit_btn');
        //如果隱藏就顯示出來
        if (nameEditArea.style.display === 'none') {
            nameEditInput.style.borderColor = "gray"
            nameEditInput.value = "";
            nameEditArea.style.display = 'flex';
            nameEditBtn.addEventListener('click', () => {
                if (!nameEditInput.value || nameEditInput.value.trim().length === 0) {
                    nameEditInput.style.borderColor = "red";
                    console.log("錯誤");
                } else {
                    nameEditInput.style.borderColor = "gray";
                    console.log(nameEditInput.value);
                    productUpdateName.innerText = nameEditInput.value;
                }
            })
        }
        //如果顯示就隱藏出來
        else {
            nameEditArea.style.display = 'none';
        }

    })
}




//單擊個別icon後，跳出視窗個別進行編輯
const updateNametext = document.getElementById('product_update_name');
const showUpdateNameAlert = (ppName) => {
    Swal.fire({
        title: '修改名稱',
        text: "原品名：" + ppName,
        input: 'text',
        showConfirmButton: true,
        showCancelButton: true,
        backdrop: true,
        confirmButtonText: "確認修改",
        cancelButtonText: "取消"

    }).then((result) => {
        console.log(result)
        if (result.isConfirmed) {
            const inputtext = Swal.getInput()
            updateNametext.innerText = inputtext.value;
            Swal.fire({
                icon: 'success',
                title: '修改完成',
            })
        }

    })
}

const updateCategorytext = document.getElementById('product_update_category');
const showUpdateCategoryAlert = () => {
    Swal.fire({
        title: '修改分類',
        text: '原分類：',
        input: 'text',
        showConfirmButton: true,
        showCancelButton: true,
        backdrop: true,
        confirmButtonText: "確認修改",
        cancelButtonText: "取消"

    }).then((result) => {
        console.log(result)
        if (result.isConfirmed) {
            const inputtext = Swal.getInput()
            updateCategorytext.innerText = inputtext.value;
            Swal.fire({
                icon: 'success',
                title: '修改完成',
            })
        }

    })
}
const updateStocktext = document.getElementById('product_update_stock');
const showUpdateStockAlert = () => {
    Swal.fire({
        title: '修改庫存',
        text: '目前庫存：',
        input: 'number',
        showConfirmButton: true,
        showCancelButton: true,
        backdrop: true,
        confirmButtonText: "確認修改",
        cancelButtonText: "取消"

    }).then((result) => {
        console.log(result)
        if (result.isConfirmed) {
            const inputtext = Swal.getInput()
            if (inputtext.value < 0 || inputtext.value === null) {
                Swal.fire({
                    icon: 'error',
                    title: '不可為負數',
                })
                return;
            }
            updateStocktext.innerText = inputtext.value;
            Swal.fire({
                icon: 'success',
                title: '修改完成',
            })
        }

    })
}
const updatePricetext = document.getElementById('product_update_price');
const showUpdatePriceAlert = () => {
    Swal.fire({
        title: '修改價格',
        text: '現在價格：',
        input: 'number',
        showConfirmButton: true,
        showCancelButton: true,
        backdrop: true,
        confirmButtonText: "確認修改",
        cancelButtonText: "取消"

    }).then((result) => {
        console.log(result)
        if (result.isConfirmed) {
            const inputtext = Swal.getInput()
            if (inputtext.value <= 0 || inputtext.value === null) {
                Swal.fire({
                    icon: 'error',
                    title: '不可為負數或0',
                })
                return;
            }
            updatePricetext.innerText = inputtext.value;
            Swal.fire({
                icon: 'success',
                title: '修改完成',
            })
        }

    })
}
