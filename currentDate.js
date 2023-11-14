const time = document.querySelector('.time');
const toDay = document.querySelector('.toDay');
const greenting = document.querySelector('.greeting');
const name = document.querySelector('.name');
const focus = document.querySelector('.focus');
let backupName;
let backupFocus;


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
    } else if (hour >= 12 && hour < 18) {
        greenting.textContent = 'Good Afternoon, ';
    } else if (hour >= 18 && hour < 24) {
        greenting.textContent = 'Good Evening, ';
    } else {
        greenting.textContent = 'Good Night, '
    }
}

function init() {
    getDataFromLocalStorage();
    backupName = name.textContent;
    backupFocus = focus.textContent;
}

function setName(e) {
    if (e.keyCode === 13) {
        saveToLocalStorage('name', e.target.textContent);
        e.target.blur();
        backupName = e.target.textContent;
    }
    if (e.keyCode === 27) {
        e.target.textContent = backupName;
        e.target.blur();
    }
}
function setFocus(e) {
    if (e.keyCode === 13) {
        saveToLocalStorage('focus', e.target.textContent);
        e.target.blur();
        backupFocus = e.target.textContent;
    }
    if (e.keyCode === 27) {
        e.target.textContent = backupFocus;
        e.target.blur();
    }
}


function saveToLocalStorage(name, value) {
    localStorage.setItem(name, value);
}

function getDataFromLocalStorage() {
    let nameData = localStorage.getItem("name");
    let focusData = localStorage.getItem("focus");
    if (nameData) {
        name.textContent = nameData;
    }
    if (focusData) {
        focus.textContent = focusData;
    }
}
name.addEventListener('blur',
    (e) => {
        backupName = e.target.textContent;
        saveToLocalStorage('name', e.target.textContent);
    });
focus.addEventListener('blur',
    (e) => {
        backupFocus = e.target.textContent;
        saveToLocalStorage('focus', e.target.textContent);
    });

function clearArea(e) {
    if (backupName !== '') {
        e.target.textContent = ''
    } else {
        e.target.textContent = backupName
    }
    if (backupFocus !== '') {
        e.target.textContent = ''
    } else {
        e.target.textContent = backupFocus
    }
}
window.addEventListener('load', init);
name.addEventListener('click', clearArea);
focus.addEventListener('click', clearArea);
name.addEventListener('keyup', setName);
focus.addEventListener('keyup', setFocus);


showTime();
getGreeting();
