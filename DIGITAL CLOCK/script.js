const clock = document.getElementById('clock');

function updateTime() {
    const date = new Date();
    const timeString = date.toLocaleTimeString();
    clock.innerHTML = timeString;
}

setInterval(updateTime, 1000);

updateTime();
