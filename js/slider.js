const sliderTrack = document.querySelector('.slider-track');
const sliderBtnNext = document.querySelector('.slider-next > button');
const sliderBtnPrev = document.querySelector('.slider-prev > button');
const sliderIndicators = document.querySelectorAll('.slider-indicators > button');
let currentSlider = 0;
let loopSlider;

function enableLoopSlider() {
    loopSlider = setInterval(nextSlide, 3000);
}

function disableLoopSlider() {
    clearInterval(loopSlider);
}

function changeSlide(slide) {
    if(slide > 2) slide = 0;
    else if (slide < 0) slide = 2;
    sliderIndicators.forEach(sliderIndicator => sliderIndicator.classList.remove('bg-primary'));
    sliderIndicators[slide].classList.add('bg-primary');
    sliderTrack.style.transform = `translateX(${-slide * 100}vw)`;
    currentSlider = slide;
}

function nextSlide() {
    disableLoopSlider();
    changeSlide(currentSlider + 1);
    enableLoopSlider();
}

function prevSlide() {
    disableLoopSlider();
    changeSlide(currentSlider - 1);
    enableLoopSlider();
}

function changeIndicators(slide) {
    disableLoopSlider();
    changeSlide(slide);
    enableLoopSlider();
}

sliderBtnNext.addEventListener('click', nextSlide);
sliderBtnPrev.addEventListener('click', prevSlide);
sliderIndicators.forEach((sliderIndicator, index) => sliderIndicator.addEventListener('click', () => changeIndicators(index)));
enableLoopSlider();



