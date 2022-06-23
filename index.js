const { execSync } = require('child_process');
const fs = require('fs');
// const {performance} = require('node:perf_hooks');



async function callCurl (startUrl){
    try {
        let we = execSync(`curl -Ls -o /dev/null -w %{url_effective} ${startUrl}`,
        function (error, stdout, stderr) {
            console.log('stderr: ' + stderr);
            if (error !== null) {
                 console.log('exec error: ' + error);
            }
        });
        return we.toString();
    } catch (error) {
        console.log(error.message);

        return startUrl;
    }

}


async function main(){
    let mass = [];
    console.time('script')
    let data = fs.readFileSync('/Users/sibirixdeveloper/Desktop/S3.txt', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
      });
      
    let arr = data.split('\n');
    
    let startUrl, endUrl, getUrl = '';
    for (let i = 0; i < 5; i++){
        [startUrl, endUrl] = arr[i].split('\t');
        getUrl = await callCurl(startUrl);

        if (getUrl !== endUrl) {
            mass.push([getUrl, endUrl]);
            // console.log('%cNOT_MATCHING', 'color:red;');
            // console.log("get = " + getUrl);
            // console.log("expect = " + endUrl);
        }       
    }

    console.log(mass.map( (element) => {
        return ['get + ' + element[0], 'expect + ' + element[1]];
    }));
    // time = performance.now() - time;
    // console.log('Время выполнения = ', time);
    console.timeEnd('script');
    // getUrl = await callCurl(startUrl);
    // console.log(endUrl === getUrl);
    // console.log("get = " + getUrl);
    // console.log("end = " + endUrl);
    // console.log("start = " + startUrl);
};

main();







// let we = execSync('curl -Ls -o /dev/null -w %{url_effective} https://vink.dev.sibirix.ru/about/contacts/',
//     function (error, stdout, stderr) {
//         if (error !== null) {
//              console.log('exec error: ' + error);
//         }
//         result(stdout);
//     });








