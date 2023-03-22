/* 
Задание 4

Напишите код приложения, интерфейс которого представляет собой 2 input и кнопку submit. В input можно ввести любое число.

При клике на кнопку происходит следующее:

Если оба числа не попадают в диапазон от 100 до 300 или введено не число — 
выводить ниже текст «одно из чисел вне диапазона от 100 до 300»;
Если числа попадают в диапазон от 100 до 300 — сделать запрос c помощью fetch по URL https://picsum.photos/200/300, 
где первое число — ширина картинки, второе — высота.
После получения данных вывести ниже картинку на экран.
*/

const width = document.querySelector("#input1");
const height = document.querySelector("#input2");
const btn = document.querySelector(".btn");
const resultNode = document.querySelector('.j-result');

btn.addEventListener('click', () => {
    if ((width.value >= 100 && width.value <= 300) &&
        (height.value >= 100 && height.value <= 300)) {
            fetch(`https://picsum.photos/${+width.value}/${+height.value}`)
                .then((response) => {
                    const imgBlock = `
                    <div class="img">
                    <img
                        src="${response.url}"
                    />
                    </div>
                    `;
                    resultNode.innerHTML = imgBlock;
                })
                .catch(() => { 
                    console.log('error')
                });
        } else {
            const falseBlock = `<div class="result j-result">Одно из чисел вне диапазона от 100 до 300</div>`;
            resultNode.innerHTML = falseBlock;
        }
});