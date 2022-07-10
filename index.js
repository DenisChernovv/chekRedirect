const { execSync } = require('child_process');
const fs = require('fs');
const request = require("request");
const https = require('https');
// const {performance} = require('node:perf_hooks');

let listUrls = process.argv;





async function main(){
    let mass = [];
    let dataFile = getDataFromFile();
    console.log(dataFile);

    let startUrl, endUrl, getUrl = '';
    for (let i = 0; i < dataFile.length; i++){
        [startUrl, endUrl] = dataFile[i].split('\t');
        getUrl = await callCurl(startUrl);
        // if (getUrl !== endUrl) {
        //     mass.push([getUrl, endUrl]);
            // console.log('%cNOT_MATCHING', 'color:red;');
            // console.log("get = " + getUrl);
            // console.log("expect = " + endUrl);
        // }       
    }

    console.log(mass.map( (element) => {
        return ['get + ' + element[0], 'expect + ' + element[1]];
    }));
    // time = performance.now() - time;
    // console.log('Время выполнения = ', time);
    // getUrl = await callCurl(startUrl);
    // console.log(endUrl === getUrl);
    // console.log("get = " + getUrl);
    // console.log("end = " + endUrl);
    // console.log("start = " + startUrl);
};

function getDataFromFile() {
    let data = fs.readFileSync('C:\\Users\\admin\\Desktop\\checkRedirect\\urlForTest.txt', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
      });
    return data.split('\n');
}
main();



async function callCurl (startUrl){
    try {
        let we = execSync(`curl -Ls -o /dev/null -w %{url_effective} ${startUrl}`,

        function (error, stdout, stderr) {
            console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });
        // let we = execSync('echo $SHELL',
        // function (error, stdout, stderr) {
        //     console.log('stderr: ' + stderr);
        //     if (error !== null) {
        //         console.log('exec error: ' + error);
        //     }
        // });
        // var r = await request(startUrl, function (e, res) {
        //             console.log(res);
        //   });
        // let response = await fetch(startUrl, {
        //     method: 'GET',
        //  });
        console.log()

        return we.toString();
    } catch (error) {
        console.log(error.message);

        return startUrl;
    }

}






// let we = execSync('curl -Ls -o /dev/null -w %{url_effective} https://vink.dev.sibirix.ru/about/contacts/',
//     function (error, stdout, stderr) {
//         if (error !== null) {
//              console.log('exec error: ' + error);
//         }
//         result(stdout);
//     });








