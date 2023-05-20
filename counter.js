// ==UserScript==
// @name         Counter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.youtube.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function () {
    'use strict';


    let div = document.createElement('div');
    div.className = '';
    div.style.color = "#fff";
    div.style.background = "red";
    div.style.width = "100px";
    div.innerHTML = 'Open channel name';
    div.id = 'ololo112';

    let timerId = setInterval(() => {
        if (document.querySelector("#logo > a")) {
            stopTimer();
        }
    }, 700);

    let firstURL = window.location.href(); //задаем первичный URL при входе в видео
    let startTimeWatch = new Date(); //засекли время открытия канала

    function stopTimer() {
        clearInterval(timerId);
        document.querySelector("#logo > a").after(div);


    }

    function getNameChannel() {
        return document.querySelector("#text > a").innerHTML
    }







//с комментариями то, что я написал сегодня, но что-то не догоняю последовательность


    let timerCoparsion = setInterval(() => {
        let secondURL = window.location.href();
        if (firstURL != secondURL) {
            let endTimeWatch = new Date; // остановка измерения
            let result = (endTimeWatch - startTimeWatch)
        }
    }, 10000); //сравниваем каждые 10 сек первичный URL со вторичным, так мы узнаем закрыто ли видео(канал), и останавливаем таймер и выдаем, сколько мс был открыт канал


    function stopTimerCoparsion() {
        clearInterval(timerCoparsion)
        localStorage.setItem(getNameChannel(), result); //тут мы вносим в localStorage имя канал и время когда открыт
        
    }



    div.addEventListener('click', () => {
        console.log("Название канала - ", getNameChannel())
        window.alert('Вы смотрите этот канал уже: ' + 'время разницы')
    });
})();


// Это референс. но полагаю, так лучше не делать.

// // Получаем элементы
// const videoPlayer = document.getElementById('videoPlayer');
// const checkTimeButton = document.getElementById('checkTimeButton');

// let videoStartTime = 0;

// // Обработчик события, вызывается при загрузке нового видео
// videoPlayer.addEventListener('loadedmetadata', function() {
//   videoStartTime = videoPlayer.currentTime;
// });

// // Обработчик события, вызывается при переходе на другую ссылку
// window.addEventListener('beforeunload', function(event) {
//   const videoEndTime = videoPlayer.currentTime;
//   const videoDuration = videoEndTime - videoStartTime;
//   event.returnValue = `Вы просмотрели видео ${videoDuration} секунд.`;
// });

// // Обработчик события для кнопки "Проверить время"
// checkTimeButton.addEventListener('click', function() {
//   const currentTime = videoPlayer.currentTime;
//   const videoDuration = currentTime - videoStartTime;
//   alert(`Прошло ${videoDuration} секунд.`);
// });
