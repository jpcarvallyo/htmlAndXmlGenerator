const { createTag, createXMLHeader, createBasicOPF, createHTML, createXML } = require("./index");
const html = require('./testData/html.json')
const xmlConfig = require('./testData/test.json')


// const configObj = {
//     "desiredTagName": "div",
//     "attributesObj": {
//         // The elements of the style tag could be converted to a CSS stylesheet since it is an object.
//         "style": `
//             background-color: red;
//             color: black
//         `
//     },
//     "innerText": "",
//     "isSelfClosing": false,
//     "children": [
//         {
//             "desiredTagName": "h1",
//             "attributesObj": {
//                 // The elements of the style tag could be converted to a CSS stylesheet since it is an object.
//                 "style": `
//                     font-size: 32px
//                 `
//             },
//             "innerText": "Hello World",
//             "isSelfClosing": true,
//             "children": []
//         }
//     ]
// }
// console.log(html.children[0].desiredTagName);
const head = html.children[1].children[0];
const pageTitle = html.children[1].children[0].children[0].attributesObj;
console.dir(pageTitle);
const body = html.children[1].children[1];
// for (let i = 0; i < body.children.length; i++) {
//     console.log(body.children[i]);
// }
// console.dir('HEAD: ', head.children.forEach(item => console.log(item)));
// console.dir('Body: ', body.children.forEach(item => console.log(item)));


// body.children[0].innerText = 'Hi lou!'
createHTML('new', html);
// window.location.reload()
// console.log(createXML('peopleData', xmlConfig))
// console.log(createXMLHeader());
// console.log('hi');
// createBasicOPF('testDemo')