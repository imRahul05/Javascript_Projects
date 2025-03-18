function generateID(mail, id) {
    const remain = extractMail(mail);
    let concatenated = id + remain;
    concatenated = concatenated.toLowerCase();

    let oddIndexesValues = oddIdx(concatenated);
   // console.log(oddIndexesValues)
   let arr = processCharacters(oddIndexesValues);
   //console.log(arr)
let result = addEND(arr);
   console.log("Generated ID:", result);
}

function processCharacters(str) {
    const chars = 'faukmr';
    let processed = [];
    for (let char of str) {
        if (chars.includes(char)) {
            let val = char.charCodeAt(0) - 96;
            processed.push(val);
        } else if (char === '_') {
            processed.push(1);
        } else {
            processed.push(char);
        }
    }
    return processed;
}

function addEND(arr) {
    // Convert all elements to their digits as strings and flatten
    const digits = [];
    for (const element of arr) {
        const str = String(element);
        for (const c of str) {
           // console.log(c)
            digits.push(c);
        }
    }

    let result = [];
    const length = digits.length;
    const middleIndex = Math.floor(length / 2);

    // Pair first and last elements moving towards the center
    for (let i = 0; i < middleIndex; i++) {
        const first = digits[i];
        const last = digits[length - 1 - i];
        result.push(first + last);
    }

    // Add the middle element if the length is odd
    if (length % 2 !== 0) {
        result.push(digits[middleIndex]);
    }

    return result.join('');
}

function oddIdx(str) {
    let temp = '';
    for (let i = 0; i < str.length; i++) {
        if (i % 2 === 0) // since indexes start at 0, even indices are 0, 2, 4, etc.
            temp += str[i];
    }
    return temp;
}

function extractMail(mail) {
    let str = '';
    for (let i = 0; i < mail.length; i++) {
        if (mail[i] === '@')
            return str;
        str += mail[i];
    }
    return str;
}

// Example usage:
const mail = 'rahulkumar20000516@gmail.com';
const student_code = 'fs41_430489';
generateID(mail, student_code);