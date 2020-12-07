const fs = require('fs');
const { start } = require('repl');
const opfConfig = require('./testData/opf');
const html = require('./testData/html.json')


const createTag = (configObj) => {
    // Expects an object
    // with the following keys (desiredTagName, attributesObj, innerText, isSelfClosing)
    let { desiredTagName, attributesObj, innerText, isSelfClosing, children, xmlOrHtml, xmlStyling } = configObj;

    function isEmpty(object) {
        return Object.keys(object).length === 0 ? true : false;
    }

    // Massage Data for startTag
    let startTag = attributesObj ? `<${desiredTagName} ` : `<${desiredTagName}>`;

    if (isEmpty(attributesObj) && startTag[startTag.length - 1] === " ") {
        // console.log("WHOA");
        startTag = startTag.trimEnd()
    }


    let endTag = desiredTagName[0] === "?" || isSelfClosing ? "" : `</${desiredTagName}>`;


    function createAttributes() {
        if (attributesObj) {
            const attributesArr = [];
            for (const [key, value] of Object.entries(attributesObj)) {

                attributesArr.push(`${key}="${value}"`);
            }
            if (isSelfClosing) {
                return attributesArr.join(" ").concat("/>")
            } else {
                return desiredTagName[0] === "?" ? attributesArr.join(" ").concat("?>") : attributesArr.join(" ").concat(">")
            }

        } else {
            return ""
        }
    }

    let attributesString = createAttributes();

    function createInnerContent(innerText) {
        if (innerText && children.length === 0) {
            return innerText;
        } else if (children === undefined) {
            return ""
        } else if (children.length >= 1) {
            // console.log(children.attributesObj);
            const childrenString = children.map(obj => {
                // console.log(obj.attributesObj);
                return createTag(obj)
            });

            return childrenString.join("")
        } else {
            return ""
        }
    }
    if (desiredTagName === "" && children[0].desiredTagName === "!DOCTYPE html") {
        // console.log("hi there", desiredTagName);
        const newTag = `<${children[0].desiredTagName}`;
        // endTag = ""
        // attributesString = ""
        // if (children[0].desiredTagName === "!DOCTYPE html") {
        //     console.log("START TAG: ", startTag);
        //     startTag = "!DOCTYPE html"
        // console.log('NEWTAG: ', newTag);
        // console.log('InnerContent: ', createInnerContent(innerText));
        return `${createInnerContent(innerText)}`.replace('/>', ">")
    } else if (desiredTagName.indexOf("?xml") !== -1 && xmlOrHtml === "xml") {
        // if (desiredTagName === "?xml") {
        //     console.log("CONFIG: ", "hi bitch");
        //     console.log("START tag: ", startTag);
        // }
        console.log(`${startTag}${attributesString}${createInnerContent(innerText)}${endTag}`.replace("/>", "?>"));
        return `${startTag}${attributesString}${createInnerContent(innerText)}${endTag}`.replace("/>", "?>")
    } else {
        return `${startTag}${attributesString}${createInnerContent(innerText)}${endTag}`
    }
}

// Need to create the doctype: 
// Example of single tag creation
// <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
const createXMLHeader = () => {
    const xmlHeaderConfig = {
        desiredTagName: "?xml",
        attributesObj: { version: "1.0", encoding: "UTF-8", standalone: "yes" },
        innerText: "",
        isSelfClosing: false,
        xmlOrHtml: "xml",
        children: []
    }
    return createTag(xmlHeaderConfig)
}

// Package contains main contents 🍄
const packageTag = createTag(opfConfig);


// Generate Generic OPF file based off of CONFIG
const createBasicOPF = (nameOfFile) => {

    // // This writes the xml STRING to the file
    fs.writeFile(
        `./output/${nameOfFile}.opf`,
        createXMLHeader() + packageTag,
        function (err) {
            if (err) return console.log(err);
            console.log(`Wrote to ${nameOfFile} file`);
        }
    );
}

const createXML = (nameOfFile, xmlConfig) => {
    // // This writes the xml STRING to the file
    fs.writeFile(
        `./output/${nameOfFile}.xml`,
        createTag(xmlConfig).replace("<>", "").replace("</>", ""),
        function (err) {
            if (err) return console.log(err);
            console.log(`Wrote to ${nameOfFile} file`);
        }
    );
}

const createHTML = (nameOfFile, htmlConfig) => {
    // // This writes the xml STRING to the file
    fs.writeFile(
        `./output/${nameOfFile}.html`,
        createTag(htmlConfig),
        function (err) {
            if (err) return console.log(err);
            console.log(`Wrote to ${nameOfFile} file`);
        }
    );
}

// Need to export methods 
// TODO: Create proper JS module
// createBasicOPF('contentPrime')

exports.createBasicOPF = createBasicOPF;
exports.createHTML = createHTML;
exports.createXMLHeader = createXMLHeader;
exports.createTag = createTag;
exports.createXML = createXML;



