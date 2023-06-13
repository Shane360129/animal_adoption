// SWAL介紹網址 https://pluscdev.com/tutorial-sweetalert2/

const updateNametext = document.getElementById('product_update_name');
const showUpdateNameAlert = () => {
    Swal.fire({
        title: '修改名稱',
        text: '原品名：',
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


// // 更新名稱
// const productUpdateNameBtn = document.querySelector('#product_update_name_btn');
// const productUpdateName = document.querySelector('#product_update_name');
// function openModal() {
//     // 創建modal元素
//     const modal = document.createElement('div');
//     modal.classList.add('modal-window');
//     modal.innerHTML = `
//         <div class="flex flex-col  items-center">
//             <a href="#" title="Close" class="modal-close">
//             <i class="fa-solid fa-xmark fa-xl" style="color: #ffffff;"></i>
//             關閉</a>
//             <h1 class="text-2xl text-center">編輯品名</h1>
//             <p>品名：<span>{舊品名}</span></p>
//             <input type="text" placeholder="請輸入新品名" id="product_update_name_input" class="h-12 w-4/5">
//             <button type="button" id="product_update_name_confirm">確定</button>
//             <button type="button" id="product_update_clear_all">清除</button>
//         </div>
//     `;

//     // 添加關閉按鈕的點擊事件
//     modal.querySelector('.modal-close').addEventListener('click', function (event) {
//         event.preventDefault();
//         closeModal();
//     });

//     // 添加確定按鈕的點擊事件
//     modal.querySelector('#product_update_name_confirm').addEventListener('click', function () {
//         const productUpdateNameInput = document.querySelector('#product_update_name_input');
//         const productUpdateName = document.querySelector('#product_update_name');
//         productUpdateName.innerHTML = productUpdateNameInput.value;
//         closeModal();
//     });

//     // 添加清除按鈕的點擊事件
//     modal.querySelector('#product_update_clear_all').addEventListener('click', function () {
//         var productUpdateNameInput = document.querySelector('#product_update_name_input');
//         productUpdateNameInput.value = '';
//     });

//     // 將modal添加到頁面中
//     document.body.appendChild(modal);
// }

// function closeModal() {
//     // 刪除modal元素
//     var modal = document.querySelector('.modal-window');
//     if (modal) {
//         modal.remove();
//     }
// }

// // 為打開按鈕添加點擊事件
// productUpdateNameBtn.addEventListener('click', function () {
//     openModal();
// });

