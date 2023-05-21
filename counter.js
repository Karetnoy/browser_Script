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
    div.style.background = "gray";
    div.style.borderRadius = "7px";
    div.style.border = "3px white solid";
    div.style.width = "60px";
    div.style.height = "30px";
    div.style.textAlign = 'center';
    div.style.padding = 'auto';
    div.style.marginTop = '10px';
    div.innerHTML = 'Watch counter';
    div.id = 'ololo112';



    let firstURL = window.location.href; //задаем первичный URL при входе в видео
    let isVideo = window.location.pathname == '/watch'
    let oldLocation = location.href;
    let startTimeWatch = new Date(); //засекли время открытия канала

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
            ; //тут мы вносим в localStorage имя канал и время когда открыт
    }

    div.addEventListener('click', () => {
        let channels = JSON.parse(localStorage.getItem('channels')) //получаем из ЛС массив каналов со временм просмотра
        let index = channels.findIndex((channel) => channel.name === getNameChannel());
        window.alert(`Вы смотрели "${channels[index].name}" за все время ${channels[index].time} мс`); //выводим сколько времени просматривали всего
        console.log("Название канала - ", getNameChannel())

    });


    if (isVideo) {
        const player = document.querySelector("video")
        let startDate = false

        setInterval(() => {
            if (player.playing) {
                if (!startDate) { startDate = new Date() }

            } else {
                if (startDate) {
                    let difference = new Date() - startDate

                    let channels = JSON.parse(localStorage.getItem('channels')) //получаем из ЛС массив каналов со временм просмотра
                    let index = channels.findIndex((channel) => channel.name === getNameChannel()) //находим объект канала в масси по индексу

                    if (index !== -1) { // проверяем есть ли канал в массиве
                        channels[index].time += difference //добавляем просмотренное время, если канал уже есть
                    } else {
                        channels.push({ name: getNameChannel(), time: difference }) // создаем новые канал
                    }
                    localStorage.setItem('channels', JSON.stringify(channels)) // записывает изменения в ЛС
                }
                startDate = false
            }
        }, 500)


    }



    function startCheckURL() {
        setInterval(function () {
            if (location.href != oldLocation) {
                isVideo = window.location.pathname == '/watch'
                oldLocation = location.href
            }
        }, 500);
    }


    startCheckURL()

    let timerId = setInterval(() => {
        if (document.querySelector("#logo > a")) {
            stopTimer();
        }
    }, 700);

    function stopTimer() {
        clearInterval(timerId);
        document.querySelector("#logo > a").after(div);
    }

    if (!localStorage.getItem('channels')) {
        localStorage.setItem('channels', JSON.stringify([]))
    }







})();


//добавляем на все объекты js внутри window прототип свойство
//которое возвращает зачение запущенно ли видео
Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
    get: function () {
        return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
    }
})

// добавить еще фичи
