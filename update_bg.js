const images = [
    './images/background/1.jpg',
    './images/background/2.jpg',
    './images/background/3.jpg',
    './images/background/4.jpg',
    './images/background/5.jpg',
];
let imagePossition = 0;

const updateBtn = document.getElementById('update');

document.body.style.backgroundImage = `url(${images[imagePossition]})`;

function updateImageIndex() {
    imagePossition++;
    if (imagePossition === images.length) {
        imagePossition = 0;
    }
}

function updateBackground() {
    updateImageIndex();
    const imgObj = new Image();
    imgObj.src = images[imagePossition];
    imgObj.addEventListener('load', () => {
        document.body.style.backgroundImage = `url(${imgObj.src})`;
    })

}

updateBtn.addEventListener('click', () => {
    updateBackground();
    updateQuote();
})


