const { mash } = require('./src') ;

// const strs = [
//     // 'baconing',
//     // 'reckoning',
//     'argon',
//     'carbon',
//     'on',
// ]

// caber
// feber
// er
// ((ca|fe)b)?er


// bacon, reckoning, argon, carbon
// (bac|arg|carb)on|reckoning

// argon
// cobaron
// (cobar|arg)on


const strs = [
    'matt',
    'matthew',
    'jon',
    'jonathan'
]

console.log(mash(strs));
