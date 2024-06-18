const btnOpenFilters = document.querySelector('.btn-open_filters');
const filtersBlock = document.querySelector('.filters');
const btnsCloseFilters = document.querySelectorAll('.btn-close_filters');
let currentSliderWidth = window.innerWidth;
window.addEventListener('resize', () => currentSliderWidth = window.innerWidth);

function openFilters() {
    closeBlock.style.visibility = 'visible';
    filtersBlock.style.visibility = 'visible';

    document.body.style.overflow = "hidden";
}

function closeFilters() {
    if(currentSliderWidth < 1024) {
        closeBlock.style.visibility = 'hidden';
        filtersBlock.style.visibility = 'hidden';
    
        document.body.style.overflow = "scroll";
    }
}

btnOpenFilters.addEventListener('click', openFilters);
closeBlock.addEventListener('click', closeFilters);
btnsCloseFilters.forEach(btnCloseFilters => btnCloseFilters.addEventListener('click', closeFilters));

function filterProducts(products) {
    btnApplyFilters.addEventListener('click', () => {
        let filterProducts = [];
        let filterCategories = [];
        let filterBrands = [];
        let minPrice = inputMin.value;
        let maxPrice = inputMax.value;
        let nothingCheckbox = true;

        checkboxesCategories.forEach(checkboxCategory => {
            if(checkboxCategory.checked) {
                filterCategories.push(checkboxCategory.id);
                nothingCheckbox = false;
            }

        })

        checkboxesBrands.forEach((checkboxBrand) => {
            if(checkboxBrand.checked) {
                filterBrands.push(checkboxBrand.nextSibling.nextSibling.innerHTML);
                nothingCheckbox = false;
            }
        })

        filterProducts = products.filter(product => {
            let isFilterCategory = false;
            if(filterCategories.length == 0) isFilterCategory = true;

            filterCategories.forEach(filterCategory => {if(product.category == filterCategory) isFilterCategory = true});
            
            let isFilterBrand = false;
            if(filterBrands.length == 0) isFilterBrand = true;

            filterBrands.forEach(filterBrand => {if(product.brand == filterBrand) isFilterBrand = true});

            return isFilterCategory && isFilterBrand;
        });

        let categoriesTittle = (filterCategories.toString()).replaceAll(',', '/');
        let brandsTittle = (filterBrands.toString()).replaceAll(',', '/');

        if(filterBrands.length == 0) productsTittle.innerHTML = categoriesTittle;
        else if(filterCategories.length == 0) productsTittle.innerHTML = brandsTittle;
        else productsTittle.innerHTML = categoriesTittle + ' - ' + brandsTittle;

        if(nothingCheckbox) filterProducts = products;

        if(minPrice != '' && minPrice != ' ') filterProducts = filterProducts.filter(product => product.price >= parseInt(minPrice));
        if(maxPrice != '' && minPrice != ' ') filterProducts = filterProducts.filter(product => product.price <= parseInt(maxPrice));

        productsLayout(filterProducts);
    });
}