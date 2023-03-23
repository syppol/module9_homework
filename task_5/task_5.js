/* Задание 5.

Написать код приложения, интерфейс которого состоит из двух input и кнопки. В input можно ввести любое число.

Заголовок первого input — «номер страницы».
Заголовок второго input — «лимит».
Заголовок кнопки — «запрос».
При клике на кнопку происходит следующее:

Если число в первом input не попадает в диапазон от 1 до 10 или не является числом 
— выводить ниже текст «Номер страницы вне диапазона от 1 до 10»;

Если число во втором input не попадает в диапазон от 1 до 10 или не является числом 
— выводить ниже текст «Лимит вне диапазона от 1 до 10»;

Если и первый, и второй input не в диапазонах или не являются числами 
— выводить ниже текст «Номер страницы и лимит вне диапазона от 1 до 10»;

Если числа попадают в диапазон от 1 до 10 — сделать запрос по URL https://picsum.photos/v2/list?page=1&limit=10, 
где GET-параметр page — это число из первого input, а GET-параметр limit — это введённое число второго input.

Пример. Если пользователь ввёл 5 и 7, то запрос будет вида https://picsum.photos/v2/list?page=5&limit=7.
После получения данных вывести список картинок на экран.

Если пользователь перезагрузил страницу, то ему должны показываться картинки из последнего успешно выполненного запроса 
(использовать localStorage).
*/
const page = document.querySelector("#page");
const limit = document.querySelector("#limit");
const btn = document.querySelector(".btn");
const resultNode = document.querySelector('.j-result');

let currUrl = localStorage.getItem("currData");

if (currUrl) {
    displayImg(JSON.parse(currUrl));
}

btn.addEventListener('click', () => {
    const isPageNumCorrect = verifyEnteredNumbers(page.value);
    const isLimitNumCorrect = verifyEnteredNumbers(limit.value);

    if (!isPageNumCorrect) {
        resultNode.innerHTML = `<div class="result j-result">Номер страницы вне диапазона от 1 до 10</div>`;
    }

    if (!isLimitNumCorrect) {
        resultNode.innerHTML = `<div class="result j-result">Лимит вне диапазона от 1 до 10</div>`;
    }

    if (!isPageNumCorrect && !isLimitNumCorrect) {
        resultNode.innerHTML = `<div class="result j-result">Номер страницы и лимит вне диапазона от 1 до 10</div>`;
    }

    if (isPageNumCorrect && isLimitNumCorrect) {
        fetch(`https://picsum.photos/v2/list?page=${+page.value}&limit=${+limit.value}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                localStorage.setItem("currData", JSON.stringify(data));
                displayImg(data);
            })
            .catch((error) => {
                console.log('error', error)
            });
    }
});

function verifyEnteredNumbers(number) {
    if (Number.isInteger(+number) && (number > 0) && (number < 11) && (number !== '') && !isNaN(+number)){
        return true;
    }
    return false;
}

function displayImg(apiData) {
    let cards = '';
    apiData.forEach(item => {
        const cardBlock = `
        <div class="card">
          <img
            src="${item.download_url}"
            class="card-image"
          />
        </div>
      `;
        cards = cards + cardBlock;
    });

    resultNode.innerHTML = cards;
}