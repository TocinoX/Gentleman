const btnsViewProduct = document.querySelectorAll('.btn-view_product');
btnsViewProduct.forEach(btnViewProduct => btnViewProduct.addEventListener('click', () => sessionStorage.setItem('currentProduct', btnViewProduct.id)));
console.log(sessionStorage.getItem('currentProduct'));