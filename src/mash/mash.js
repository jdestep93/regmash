const { longestCommonSubstring } = require('string-algorithms');
const { InvalidArgumentsError } = require('../errors');

function mash(arrStrings) {
    if (!arrStrings || !arrStrings.length) {
        throw new InvalidArgumentsError('Array of strings is required.');
    }

    const replacements = {};

    let i = 0;
    let currentStrs = [...arrStrings];

    main_loop:
    while (true) {
        let hasQ = false;
        let validStrs = currentStrs.filter(cs => !!cs);

        if (!validStrs.length) {
            break;
        }

        // find the first longest common substring
        const lcsArr = longestCommonSubstring(validStrs);

        // if no common substrings, return
        if (!lcsArr || !lcsArr.length) {
            const values = validStrs.join('|');

            if (i === 0) {
                return values;
            } else {
                replacements[`$${i}`] = values;
            }

            break;
        }

        for (let j = 0; j < lcsArr.length; j++) {
            const lcs = lcsArr[j];

            debugger;

            if (currentStrs.every(cs => cs.startsWith(lcs))) {
                currentStrs = currentStrs.map(cs => {
                    const nextStr = cs.slice(cs.indexOf(lcs) + lcs.length);

                    if (!nextStr && !hasQ) {
                        hasQ = true;
                    }

                    return nextStr;
                });

                replacements[`$${i}`] = `${lcs}($${i + 1})${hasQ ? '?' : ''}`;
            } else if (currentStrs.every(cs => cs.endsWith(lcs))) {
                currentStrs = currentStrs.map(cs => {
                    const nextStr = cs.slice(0, cs.indexOf(lcs));

                    if (!nextStr && !hasQ) {
                        hasQ = true;
                    }

                    return nextStr;
                });

                replacements[`$${i}`] = `($${i + 1})${hasQ ? '?' : ''}${lcs}`;
            } else if (j === lcsArr.length - 1) {
                const values = validStrs.join('|');

                if (i === 0) {
                    return values;
                } else {
                    replacements[`$${i}`] = values;
                    break main_loop;
                }
            }
        }

        i++;
    }

    return Object.keys(replacements).reduce((s, r) => s.replace(r, replacements[r]), '$0');
}

module.exports = mash;
