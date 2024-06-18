const searchBar = document.querySelector('.search');
const btnOpenSearch = document.querySelector('.nav-search');
const btnCloseSearch = document.querySelector('.search-close');
const inputSearch = document.querySelector('#search');
const btnSearchProduct = document.querySelector('.btn-search_product');
let isSearchBarOpen = false;

function openSearchBar() {
    closeBlock.style.visibility = 'visible';
    closeBlock.style.zIndex = '90';
    searchBar.style.transform = 'translateY(0)';

    isSearchBarOpen = true;
}

function closeSearchBar() {
    closeBlock.style.visibility = 'hidden';
    closeBlock.style.zIndex = '900';
    searchBar.style.transform = 'translateY(-100%)';

    isSearchBarOpen = false;
}

btnOpenSearch.addEventListener('click', () => isSearchBarOpen ? closeSearchBar() : openSearchBar());
btnCloseSearch.addEventListener('click', closeSearchBar);
closeBlock.addEventListener('click', closeSearchBar);

function searchProduct() {
    let search = inputSearch.value;
    sessionStorage.setItem('searchFilter', search);
    window.location.assign("./products.html");
}

btnSearchProduct.addEventListener('click', searchProduct);
document.addEventListener('keydown', (event) => {if(event.key == 'Enter' && isSearchBarOpen) searchProduct()});
