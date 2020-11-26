const { longestCommonSubstring } = require('string-algorithms');
const { InvalidArgumentsError } = require('../errors');

function regex(arrStrings) {
    if (!arrStrings || !arrStrings.length) {
        throw new InvalidArgumentsError('Array of strings is required.');
    }

    let hasCommon = true;
    let currStrs = [...arrStrings];

    // bacon, reckoning, argon, carbon
    // (bac|arg|carb)on|reckoning

    // argon
    // cobaron
    // (cobar|arg)on

    const lcsStrs = longestCommonSubstring(currStrs);
    
    if (!lcsStrs || !lcsStrs.length) {
        return arrStrings.join('|');
    }

    const r = new RegExp(`(${lcsStrs.join('|')})`, 'g');
    for (const currStr of currStrs) {
        const m = currStr.match(r);

        debugger;
    }

    // cycle through the strings finding the greatest common subs
    // while (hasCommon) {
    //     const lcs = longestCommonSubstring(currStrs);
    //
    //     if (!lcs.length) {
    //         break;
    //     }
    //    
    //     const beforeArr = [];
    //     const afterArr = [];
    //
    //     for (let i = 0; i < currStrs.length; i++) {
    //         const currStr = currStrs[i];
    //         const splits = currStr.split()
    //     }
    // }

    return '';
}

module.exports = regex;
