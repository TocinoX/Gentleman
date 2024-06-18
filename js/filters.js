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

