const { createTag, createXMLHeader, createBasicOPF, } = require("./index");


const configObj = {
    "desiredTagName": "guide",
    "attributesObj": {},
    "innerText": "",
    "isSelfClosing": false,
    "children": [
        {
            "desiredTagName": "reference",
            "attributesObj": {
                "title": "Cover page",
                "type": "cover",
                "href": "Text/cover.xhtml"
            },
            "innerText": "",
            "isSelfClosing": true,
            "children": []
        },
        {
            "desiredTagName": "reference",
            "attributesObj": {
                "title": "Table of content",
                "type": "toc",
                "href": "toc.xhtml"
            },
            "innerText": "",
            "isSelfClosing": true,
            "children": []
        }
    ]
}

console.log(createTag(configObj));
console.log(createXMLHeader());

createBasicOPF('testImportFile')