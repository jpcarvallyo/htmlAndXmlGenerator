var xml2js = require('xml2js');
const fs = require('fs');
const { start } = require('repl');
const { config } = require('process');


// Characteristics of ambrosia JSON
// Units and/or Courses are the main container (this houses the lessons)
// Lessons house a collection of screens (html pages)
// Screens are basically an HTML page


// This object must have the following in order to meet opf requirements.
// 

let obj = {
    // Tag
    'package': {
        // Attribute of PACKAGE tag
        $: {
            'xmlns': 'http://www.idpf.org/2007/opf'
        },
        // (Child of PACKAGE tag)
        // (Start of PACKAGE tag)
        // METADATA (Has 5 essential properties)
        'metadata': {
            $: {
                'xmlns:dc': 'http://purl.org/dc/elements/1.1/'
            },
            // (Child of METADATA tag)
            // (Start of META tag [list item])
            'meta': {
                $: {
                    'name': 'Test opf File Generator'
                }
            },
            // (Sibling of META tag [fellow list item])
            'dc:title': {
                // This is the INNER TEXT of the DC:TITLE tag
                // The underscore indicates the INNER TEXT
                _: "Test Generator Title"
            }

            // 
        },
        // MANIFEST

        // SPINE

    }
}

// Needs ability to read certain properties and do something based off of that (i.e. know when an attribute tag is being invoked)

// let opfObj = {
//     'package': {
//         // Immediate children of package tag
//         'metadata': {
//             // There needs to be an attribute data structure

//             // There needs to be children
//         },
//         'manifest': {

//         },
//         'spine': {

//         }
//     }
// }


// create new tag 
// Ex:   
//    createTag(
//      'metadata' (tag name: string), 
//      {
//          xmls: 'http://www.idpf.org/2007/opf',
//          xmls:dc: 'http://purl.org/dc/elements/1.1'
//      } *** attributes: object ***, 
//      'Example text in tag' *** textContent ***
//    )
// Outputs:      <metadataNew>... </metadataNew>
const metaTagConfigObj = {
    desiredTagName: "metadata",
    attributesObj: {},
    innerText: "",
    isSelfClosing: false
}

function createTagNew(configObj) {
    // Expects an object
    // with the following keys (desiredTagName, attributesObj, innerText, isSelfClosing)
    let completedTag;
    const { desiredTagName, attributesObj, innerText, isSelfClosing } = configObj;
    //     // create tag off of first arg
    //     // if the element has the ":" character make sure it translates to the corresponding unicode character value "0x3A"
    //     // arguments array
    //     //  
    function isEmpty(object) {
        return Object.keys(object).length === 0 ? true : false;
    }
    let startTag = attributesObj ? `<${desiredTagName} ` : `<${desiredTagName}>`;

    if (isEmpty(attributesObj) && startTag[startTag.length - 1] === " ") {
        console.log("WHOA");
        startTag = startTag.trimEnd()
    }

    const endTag = desiredTagName[0] === "?" || isSelfClosing ? "" : `</${desiredTagName}>`;
    // create attributes for the tag based off of the object passed in
    // NOTE: Be sure to properly stringify this or you will get errors
    // it must be a valid XML string in the end (serialization must be done)
    // console.log(Array.from(attributesObj));

    function createAttributes() {
        if (attributesObj) {
            const attributesArr = [];
            let string;
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

    const attributesString = createAttributes();

    function createInnerContent(innerText) {
        if (innerText) {
            return innerText;
        } else {
            return ""
        }
    }

    return `${startTag}${attributesString}${createInnerContent(innerText)}${endTag}`
}

function createTag(desiredTagName, attributesObj, innerText, isSelfClosing) {
    let completedTag;
    // create tag off of first arg
    // if the element has the ":" character make sure it translates to the corresponding unicode character value "0x3A"
    // arguments array
    //  
    function isEmpty(object) {
        return Object.keys(object).length === 0 ? true : false;
    }
    let startTag = attributesObj ? `<${desiredTagName} ` : `<${desiredTagName}>`;

    if (isEmpty(attributesObj) && startTag[startTag.length - 1] === " ") {
        console.log("WHOA");
        startTag = startTag.trimEnd()
    }

    const endTag = desiredTagName[0] === "?" || isSelfClosing ? "" : `</${desiredTagName}>`;
    // create attributes for the tag based off of the object passed in
    // NOTE: Be sure to properly stringify this or you will get errors
    // it must be a valid XML string in the end (serialization must be done)
    // console.log(Array.from(attributesObj));

    function createAttributes() {
        if (attributesObj) {
            const attributesArr = [];
            let string;
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

    const attributesString = createAttributes();

    function createInnerContent(innerText) {
        if (innerText) {
            return innerText;
        } else {
            return ""
        }
    }

    return `${startTag}${attributesString}${createInnerContent(innerText)}${endTag}`
}




// update property on tag 
// Ex:   updateTag('metadata', 'metadataNew')
// Outputs:      <metadataNew>... </metadataNew>
// UNICODE character for ":" is "0x3A"


// var builder = new xml2js.Builder();
// var xml = builder.buildObject(obj);


// console.log(xml)
// // This writes the xml STRING to the file
// fs.writeFile(
//     `content.opf`,
//     xml,
//     function (err) {
//         if (err) return console.log(err);
//         console.log("Wrote to opf file");
//     }
// );

function createXMLHeader() {
    return createTag('?xml', { version: "1.0", encoding: "UTF-8", standalone: "yes" })
}

const packageTag = createTag('package', {
    xmlns: 'http://www.idpf.org/2007/opf'
}, createTag('metadata', {
    'xmlns:dc': 'http://purl.org/dc/elements/1.1'
}, createTag('meta', {
    name: 'Test opf File Generator'
}, "", true) + createTag('dc:title', {}, "Test Generator Title")))


// 
const siblingsGenerator = (configArray) => {
    // configArray will x items that will need to be converted using the createTag function
    return configArray.map(item => createTag(...item))
}

// Make the Metadata block
function createMetadataBlock() {
    const metadataArr = [['meta', {
        name: 'Test opf File Generator'
    }, "", true], 'dc:title', {}, "Test Generator Title"]

    //
    console.log(siblingsGenerator(metadataArr))

    createTag('metadata', {
        'xmlns:dc': 'http://purl.org/dc/elements/1.1'
    }, createTag('meta', {
        name: 'Test opf File Generator'
    }, "", true) + createTag('dc:title', {}, "Test Generator Title"))

    return
}

// Generate Generic OPF file
function createBasicOPF() {
    // Need to create the doctype: 
    // <?xml version="1.0" encoding="UTF-8" standalone="yes"?>

    //





    return createXMLHeader() + packageTag; // 
}

console.log(createBasicOPF())

// const packageTag = createTag('package', {
//     xmlns: 'http://www.idpf.org/2007/opf'
// }, createTag('metadata', {
//     xmlns: 'http://www.idpf.org/2007/opf',
//     'xml:dc': 'http://purl.org/dc/elements/1.1'
// }, createTag('meta', {
//     name: 'Test opf File Generator'
// }, "", true)))

// console.log(packageTag);


// const metadataTag = createTag('metadata', {
//     xmlns: 'http://www.idpf.org/2007/opf',
//     'xml:dc': 'http://purl.org/dc/elements/1.1'
// }, createTag('meta', {
//     name: 'Test opf File Generator'
// }, "", true))

// console.log(metadataTag);

// const metaTag = createTag('meta', {
//     name: 'Test opf File Generator'
// })