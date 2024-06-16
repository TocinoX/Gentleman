//const menuDialog = document.querySelector('.menu').parentElement;
const searchBar = document.querySelector('.search');
const btnOpenSearch = document.querySelector('.nav-search');
const btnCloseSearch = document.querySelector('.search-close');
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