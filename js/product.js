const btnPlus = document.querySelector('.view_product-plus');
const btnMinus = document.querySelector('.view_product-minus');
const inputAmount = document.querySelector('#amount');

btnPlus.addEventListener('click', () => ++inputAmount.value);
btnMinus.addEventListener('click', () => --inputAmount.value < 0 ? ++inputAmount.value : inputAmount.value);

const btnsSize = document.querySelectorAll('.view_product-size');
function changeSize(btn) {
    btnsSize.forEach(btnSize => btnSize.classList.remove('view_product-size--active'));
    btnsSize[btn].classList.add('view_product-size--active');

}

btnsSize.forEach((btnSize, index) => btnSize.addEventListener('click', () => changeSize(index)));

const btnsColor = document.querySelectorAll('.view_product-color');
function changeColor(btn) {
    btnsColor.forEach(btnColor => btnColor.classList.remove('view_product-color--active'));
    btnsColor[btn].classList.add('view_product-color--active');

}

btnsColor.forEach((btnColor, index) => btnColor.addEventListener('click', () => changeColor(index)));

let getJSON = function (url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        let status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};

getJSON('./js/json/products.json', function (err, products) {
    if (err !== null) {
        console.log('Something went wrong: ' + err)
    } else {
        let currentProduct = sessionStorage.getItem('currentProduct');

        const viewProductTittle = document.querySelector('.view_product-tittle');
        const viewProductBrand = document.querySelector('.view_product-brand');
        const viewProductImg = document.querySelector('.view_product-img');
        const viewProductPrice = document.querySelector('.view_product-price');

        viewProductTittle.innerHTML = products[currentProduct].name;
        viewProductBrand.innerHTML = products[currentProduct].brand;
        viewProductImg.setAttribute('src', `img/producto${products[currentProduct].id}.webp`);
        viewProductPrice.innerHTML = `S/. ${products[currentProduct].price}.00`;
    }
});