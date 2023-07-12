const url = "http://maksym.space:5000";
const alphabet = document.getElementById("alphabet");
const words_list = document.getElementById("words-list")
const determination = document.getElementById("determination")

printHome()

function printHome() {
    alphabet.classList.remove('hide');
    words_list.classList.remove('hide');
    determination.classList.add('hide');
    alphabet.innerHTML = '';
    fetch(`${url}/words`)
        .then((response) => response.json())
        .then((data) => {
            data.sort(alphabeticalNameSort);
            var previousLetter = '';
            var k = 0;
            for (var item in data) {
                k++;
                if (previousLetter !== data[item].name[0]) {
                    k = 1;
                    previousLetter = data[item].name[0];
                    alphabet.innerHTML += `
                        <li><a href="#${data[item].name[0]}">${data[item].name[0]}</a></li>
                `
                    words_list.innerHTML += `
                        <div class="words-list__line">
                        <div class="words-list__line__letter">
                            <p class="main-letter">${data[item].name[0]}${data[item].name[0].toLowerCase()}</p>
                            <p class="description" id="${data[item].name[0]}-terms">2 термина</p>
                        </div>
                        <div class="words-list__line__terms" id="${data[item].name[0]}">  
                    `
                }
                document.getElementById(data[item].name[0]).innerHTML += `
                    <li><a href="#" onclick="getWordByID(${data[item].id})">${data[item].name}</a></li>
                `
                document.getElementById(`${data[item].name[0]}-terms`).innerHTML = `Терминов: ${k}
                `
            }
        })

}

function getWordByID(id) {
    alphabet.classList.add('hide');
    words_list.classList.add('hide');
    determination.classList.remove('hide');
    determination.innerHTML = '';

    fetch(`${url}/words/${id}`)
        .then((response) => response.json())
        .then((data) => {
            var englishWord = '';
            if (data.english !== '') {
                englishWord = `(${data.english})`
            }
            determination.innerHTML = `
                <div class="determination__header">
                    <h2>${data.name}</h2>
                    <p>${englishWord}</p>
                </div>
                <div class="determination__info">
                    <p>${data.description}</p>
                </div>
                <button class="determination__button" onclick="showHome()">Вернуться ко всем словам</button>
            `
        })
}

function search() {
    let word = document.getElementById('input-word').value;
    alphabet.classList.add('hide');
    words_list.classList.add('hide');
    determination.classList.remove('hide');
    determination.innerHTML = '';

    fetch(`${url}/words/search/${word}`)
        .then((response) => response.json())
        .then((data) => {
            for (var item in data) {
                var englishWord = '';
                if (data[item].english !== '') {
                    englishWord = `(${data[item].english})`
                }

                determination.innerHTML += `
                <div class="determination__header">
                    <h2>${data[item].name}</h2>
                    <p>${englishWord}</p>
                </div>
                <div class="determination__info">
                    <p>${data[item].description}</p>
                </div>
                
            `
            }
            determination.innerHTML += `<button class="determination__button" onClick="showHome()">Вернуться ко всем словам</button>`
            })


}

function showHome() {
    alphabet.classList.remove('hide');
    words_list.classList.remove('hide');
    determination.classList.add('hide');
}

function alphabeticalNameSort(a,b) {
    if (a.name < b.name) { return -1; }
    if (a.name > b.name) { return  1; }
    return 0;
}