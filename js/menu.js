const closeBlock = document.querySelector('.close');
const navMenu = document.querySelector('.menu');
const btnOpenMenu = document.querySelector('.nav-open_menu');
const btnCloseMenu = document.querySelector('.menu-close_menu');

function openMenu() {
    closeSearchBar();    
    closeBlock.style.visibility = 'visible';
    navMenu.style.transform = 'translateX(0)';

    document.body.style.overflow = "hidden";
}

function closeMenu() {
    closeBlock.style.visibility = 'hidden';
    navMenu.style.transform = 'translateX(-400px)';

    document.body.style.overflow = "scroll";
}

btnOpenMenu.addEventListener('click', openMenu);
btnCloseMenu.addEventListener('click', closeMenu);
closeBlock.addEventListener('click', closeMenu);

const btnOpenSubList = document.querySelectorAll('.menu-open_sub_list');
const menuSubList = document.querySelectorAll('.menu-sub_list');

let isMenuSubListOpen = [];
for (x of Array(menuSubList.length)) isMenuSubListOpen.push(false);


function openMenuSubList(index) {
    let displace = menuSubList[index].clientHeight - 32;

    menuSubList[index].style.visibility = 'visible';
    menuSubList[index].style.transform = 'scale(1)';
    btnOpenSubList[index].parentElement.style.paddingBottom = displace + 'px';

    isMenuSubListOpen[index] = true;
}

function closeMenuSubList(index) {
    menuSubList[index].style.visibility = 'hidden';
    menuSubList[index].style.transform = 'scale(0)';
    btnOpenSubList[index].parentElement.style.paddingBottom = '24px';

    isMenuSubListOpen[index] = false;
}

btnOpenSubList.forEach((btn, index) => btn.addEventListener('click', () => isMenuSubListOpen[index] ? closeMenuSubList(index) : openMenuSubList(index)));

const menuFilter = document.querySelectorAll('.menu-filter');

menuFilter.forEach(item => item.addEventListener('click', () => {
    sessionStorage.setItem('menuFilter', (item.innerHTML).toLowerCase());
}));