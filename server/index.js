// const http = require('http')
// const fs = require('fs')

// myServer = http.createServer((req, res) => {

//     if(req.url === '/favicon.ico')
//         return res.end();

//     const log = `${Date.now()}: ${req.url} requist received\n`;
//     // console.log(req.socket.remoteAddress)

//     fs.appendFile('log.txt', log, (err, data) => {

//         switch(req.url)
//         {
//             case '/': res.end('HomePage')
//             break;

//             case '/about': res.end('I am Maunil Modi')
//             break

//             default: res.end('404 Not found')
//         }

//         // res.end(`Hello from Server ${Date.now()}`)
//     })
// })

// myServer.listen(8000, () => console.log('Server Stated'))


// *************************************************************************************//

const http = require('http')
const fs = require('fs')
const url = require('url')

myServer = http.createServer((req, res) => {

    if(req.url === '/favicon.ico')
        return res.end();

    const log = `${Date.now()}: ${req.url} requist received\n`;
    // console.log(req.socket.remoteAddress)
    const myUrl = url.parse(req.url, true); // true basically parsh query parameters
    console.log(myUrl);

    fs.appendFile('log.txt', log, (err, data) => {

        // switch(req.url)
        switch(myUrl.pathname)
        {
            case '/': res.end('HomePage')
            break;

            case '/about': res.end('I am Maunil Modi')
            break

            case '/search': 
            const myName = myUrl.query.name;
            res.end(`Hi, ${myName}`)
            break;

            default: res.end('404 Not found')
        }

        // res.end(`Hello from Server ${Date.now()}`)
    })
})

myServer.listen(8000, () => console.log('Server Stated'))

