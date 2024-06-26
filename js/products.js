const layoutProduct = document.querySelector('.layout-products');
const paginationButtons = document.querySelector('.pagination-buttons');
const btnApplyFilters = document.querySelector('.btn-apply-filters');
const checkboxesCategories = document.querySelectorAll('.checkbox-category');
const checkboxesBrands = document.querySelectorAll('.checkbox-brand');
const inputMin = document.querySelector('.input-min');
const inputMax = document.querySelector('.input-max');
const productsTittle = document.querySelector('.products-tittle');
const btnPrevPagination = document.querySelector('.btn-prev_pagination');
const btnNextPagination = document.querySelector('.btn-next_pagination');
let currentPagination = 0;

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

function createCardProduct(img, name, brand, price) {
    let newDiv = document.createElement('div');
    let newButton = document.createElement('button');
    let newA = document.createElement('a');
    let newImg = document.createElement('img');
    let newH4 = document.createElement('h4');
    let newH5 = document.createElement('h5');
    let newP = document.createElement('p');

    let divContent = newDiv.cloneNode();
    let divCard = newDiv.cloneNode();
    let divProduct = newDiv.cloneNode();

    //Botón
    newButton.textContent = 'Agregar al carrito';
    newButton.classList.add('btn');
    newButton.classList.add('btn-primary');
    newButton.classList.add('w-100');
    newButton.classList.add('mt-2');

    //Texto
    newH4.textContent = name;
    newH5.textContent = brand;
    newP.textContent = `S/. ${price}.00`;
    newH5.classList.add('py-1');

    //Imagen
    newImg.setAttribute('src', `img/producto${img}.webp`);
    newImg.classList.add('w-100');
    newA.classList.add('btn-view_product');
    newA.setAttribute('id', img);
    newA.setAttribute('href', 'product.html');
    newA.appendChild(newImg);

    divContent.classList.add('p-2');
    divContent.classList.add('product-content');
    divContent.appendChild(newH4);
    divContent.appendChild(newH5);
    divContent.appendChild(newP);
    divContent.appendChild(newButton);

    divCard.classList.add('product-card');
    divCard.appendChild(newA);
    divCard.appendChild(divContent);

    divProduct.classList.add('product');
    divProduct.appendChild(divCard);

    return divProduct;
}

function createPaginationButtons(products) {
    paginationButtons.innerHTML = '';

    let pages = Math.ceil(products.length / 9);
    
    for (let index = 1; index < pages + 1; index++) {
        let newButton = document.createElement('button');

        newButton.textContent = index;
        newButton.classList.add('btn');
        newButton.classList.add('btn-primary');
        newButton.classList.add('mx-1');
        newButton.classList.add('btn-pagination');
    
        paginationButtons.appendChild(newButton);
    }
}

function paintProducts(products, page) {
    layoutProduct.innerHTML = '';

    let pageProducts = products.slice((page * 9) , ((page + 1) * 9));

    pageProducts.forEach(product => {
        layoutProduct.appendChild(createCardProduct(product.id, product.name, product.brand, product.price));
    });

    if(products.length == 0) productsTittle.innerHTML = 'No se encontraron resultados de: ' + productsTittle.innerHTML;
    const btnsViewProduct = document.querySelectorAll('.btn-view_product');
    btnsViewProduct.forEach(btnViewProduct => btnViewProduct.addEventListener('click', () => sessionStorage.setItem('currentProduct', btnViewProduct.id)));
    console.log(sessionStorage.getItem('currentProduct'));
}

function productsLayout(products) {
    createPaginationButtons(products);

    const btnsPagination = document.querySelectorAll('.btn-pagination');
    
    btnsPagination.forEach((btnPagination, index) => btnPagination.addEventListener('click', () => paintProducts(products, index)));

    btnNextPagination.addEventListener('click', () => paintProducts(products, ++currentPagination < Math.ceil(products.length / 9) ? currentPagination : --currentPagination));
    btnPrevPagination.addEventListener('click', () => paintProducts(products, --currentPagination < 0 ? ++currentPagination : currentPagination));
    
    paintProducts(products, 0);
}

getJSON('./js/json/products.json', function (err, products) {
    if (err !== null) {
        console.log('Something went wrong: ' + err)
    } else {
        productsLayout(products);
        filterProducts(products);

        if(sessionStorage.getItem('menuFilter')) {
            productsTittle.innerHTML = sessionStorage.getItem('menuFilter');
            productsLayout(products.filter(product => product.category == sessionStorage.getItem('menuFilter')));
            sessionStorage.clear();
        }

        if(sessionStorage.getItem('searchFilter')) {
            productsTittle.innerHTML = sessionStorage.getItem('searchFilter');
            productsLayout(products.filter(product => {
                let productName = product.name.toUpperCase();
                let productBrand = product.brand.toUpperCase();
                let productCategory = product.category.toUpperCase();
                let search = sessionStorage.getItem('searchFilter').toUpperCase();
                let matchName = productName.includes(search);
                let matchBrand = productBrand.includes(search);
                let matchCategory = productCategory.includes(search);

                return matchName || matchBrand || matchCategory;
            }));
            sessionStorage.clear();
        }
    }
});