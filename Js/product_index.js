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

