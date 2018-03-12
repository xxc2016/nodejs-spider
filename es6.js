/**
 * Created by xxc on 2018/3/9.
 */
const mailer=require('./sendmail');
const url=require('url');
const fs=require('fs');
const JSDOM=require('jsdom').JSDOM;
//https://detail.tmall.com/item.htm?spm=a230r.1.14.6.68624507tWuF7E&id=560257961625&cm_id=140105335569ed55e27b&abbucket=18&sku_properties=10004:709990523
let index=0;//递归次数
module.exports = ()=> {
    geturl('http://ssdut.dlut.edu.cn/index/bkstz.htm', data => {
        //console.log(data);
        //fs.writeFile('./23131.html',data);
        const dom = new JSDOM(data);
        const myDate = new Date().toLocaleDateString();
        let arr = [];
        let date = dom.window.document.querySelectorAll('.c56628_date');
        let title = dom.window.document.querySelectorAll('.c56628');
        for (let i in date) {
            //console.log(date[i].textContent);
            if (date[i].textContent.trim() == myDate)
                arr.push(title[i].textContent,'http://ssdut.dlut.edu.cn/'+title[i].href);
                //console.log(title[i].href);
            else
                break;
        }
        //console.log(dom.window.document.querySelector('.c56628').textContent);
        //arr.push(dom.window.document.querySelector('.c56628').textContent);
        let str = arr.join("\n");
        //console.log(str);
        mailer(str);
    });
};

function geturl(surl,succ) {
    let urlobj=url.parse(surl);
    let http;
    if(urlobj.protocol=='http:'){
        http=require('http');
    }
    else{
        http=require('https');
    }
    let req=http.request({
        'hostname':urlobj.hostname,
        'path':urlobj.path
},res=>{
        if(res.statusCode==200) {
            let str = '';
            res.on('data', chunk => {
                str += chunk;
                //str.push(chunk);
            });
            res.on('end', () => {
                //buffer=Buffer.concat(str);

                succ && succ(str);
            });
        }
    else if(res.statusCode==302||res.statusCode==301) {
            //index++;
            geturl(res.headers.location, succ);
        }
    });
    req.end();
    req.on('error',()=>{
        console.log(404);
    });
}
