/* Задание 1.

Вам дана заготовка и результат, который вы должны получить. 
Ваша задача — написать код, который будет преобразовывать XML в JS-объект и выводить его в консоль.

 XML:

<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>


JS-объект:

{
  list: [
    { name: 'Ivan Ivanov', age: 35, prof: 'teacher', lang: 'en' },
    { name: 'Петр Петров', age: 58, prof: 'driver', lang: 'ru' },
  ]
}
*/
const parser = new DOMParser();
const xmlString = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`;

const xmlDOM = parser.parseFromString(xmlString, "text/xml");

const result = {
    list: []
};

const students = xmlDOM.querySelectorAll("student");

students.forEach((element) => {
  const firstName = element.querySelector("first");
  const secondName = element.querySelector("second");
  const age = element.querySelector("age");
  const prof = element.querySelector("prof");
  const lang = nameNode.getAttribute("lang");

  const student = {
    name: `${firstName.textContent} ${secondName.textContent}`,
    age: Number(age.textContent),
    prof: prof.textContent,
    lang: lang
  };
  
  result.list.push(student);
});

console.log(result);