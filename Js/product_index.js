// 父層
const sltr = document.querySelector('#product-new-arrival-slide-track');

let productCard = "";
fetch("http://localhost:8080/find_all")
    .then(res => res.json())
    .then(data => {
        data.productList.forEach((item) => {
            console.dir(item);
            productCard += `
            <div class="product-new-arrival-slide">
                <a href="./product_info.html?productId=${encodeURIComponent(item.productId)}">
                    <img src="../../img/pruductWall_img/pruductWall_${item.productId}.jpg" height="100" width="250" alt="圖片" />
                </a>
            </div>
            `;
        })
        //把ID傳遞給product_info.html
        const productCards = document.querySelectorAll('.product-new-arrival-slide');
        productCards.forEach(card => {
            const productId = card.querySelector('a').getAttribute('data-productid');
            card.addEventListener('click', function () {
                window.location.href = `../product_info.html?productId=${encodeURIComponent(productId)}`;
            });
        });



        // Flickity輪播功能
        const elem = document.querySelector('.carousel');
        const flkty = new Flickity(elem, {
            // options
            cellAlign: 'left',
            contain: true,
            autoPlay: 3000,
            prevNextButtons: true,
            pageDots: false,
            wrapAround: true,
        });

        //呈現到畫面上
        sltr.innerHTML = productCard;
    })
    .catch(error => {
        console.error(error);
    });


//最新商品：fetch GET功能 取得最新的12個商品
// const productCard = ""
// fetch("http://localhost:8080/show_top12_new_product")
// then(res => res.json())
// then(data => {
//     data.forEach(item => {
//         productCard += `
//         <div class="product-new-arrival-slide">
//             <a href="./product_info.html">
//             <img src="../oo.jpg"
//             alt="" /></a>
//         </div>
//         `
//     });
// })

