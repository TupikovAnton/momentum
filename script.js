const time = document.querySelector('.time');
const toDay = document.querySelector('.toDay');
const greenting = document.querySelector('.greeting');
const name = document.querySelector('.name');
const focus = document.querySelector('.focus');


const dayOfWeek = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


function showTime() {
    let today = new Date();
    time.innerHTML = today.toLocaleTimeString();
    if (toDay.innerHTML !== showDate(today)) {
        toDay.innerHTML = showDate(today);
    }
    setTimeout(showTime, 1000);
}

function showDate(today) {
let day = today.getDate()
    if (today.getDate() === 1 || today.getDate() === 21 || today.getDate() === 31) {
        day += 'st'
    } else if (today.getDate() === 2 || today.getDate() === 22) {
        day += 'nd'
    } else if (today.getDate() === 3 || today.getDate() === 23) {
        day += 'rd'
    } else {
        day += 'th'
    }
    return `${dayOfWeek[today.getDay()]}, ${day} of ${months[today.getMonth()]}`;
}
function getGreeting() {
    let hour = new Date().getHours();

    if (hour >= 6 && hour < 12) {
        greenting.textContent = 'Good Morning, ';
    } else if (hour >=12 && hour < 18) {
        greenting.textContent = 'Good Afternoon, ';
    } else if (hour >= 18 && hour < 24) {
        greenting.textContent = 'Good Evening, ';
    } else {
        greenting.textContent = 'Good Night, '
    }
}

showTime();
getGreeting();
