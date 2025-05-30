const fs = require("fs");

// Sync call
// fs.writeFileSync("./test.txt", "hello world");

// Async call
// fs.writeFile("./test.txt", "hello, how are you?", (err) => {})

// const res = fs.readFileSync('./test.txt', "utf-8")
// console.log(res)

// fs.readFile("./test.txt", "utf-8", (err, res) => {
//   if (err) {
//     console.log("ERROR:", err);
//   } else {
//     console.log(res);
//   }
// });

// fs.appendFileSync("./test.txt", `${Date.now()} Hey There\n`)

// fs.cpSync("./test.txt", "./copy.txt")

// fs.unlinkSync('./copy.txt')

// console.log(fs.statSync('./test.txt'))

const os = require('os')
console.log(os.cpus().length)