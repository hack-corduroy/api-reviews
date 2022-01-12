// const fs = require('fs');
// const readline = require('readline');

// const file = readline.createInterface({
//   input: fs.createReadStream(__dirname + '/../csv/' + filename),
//   output: process.stdout,
//   terminal: false,
// });

// const logger = fs.createWriteStream(__dirname + '/../csv/cleansed.' + filename, {
//   flags: 'a', // 'a' means appending (old data will be preserved)
// });

// for await (const line of file) {
//   if (++index > start) {
//     let newLine = await callback(line);
//     logger.write(newLine + '\n');
//   }
//   if (index % 10000 === 0) {
//     console.log(filename, index);
//   }
// }