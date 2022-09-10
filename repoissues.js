const request=require("request");
const cheerio=require("cheerio");
const fs=require("fs");
const path=require("path");
const pdfkit=require("pdfkit");
function allIssues(url,topic,repoName){
    request(url,cb);
    function cb(err,Response,html){
        if(err){
            console.log(err);
        }
        else if(Response.statusCode==404){
            console.log("page not found");
        }
        else{
            // console.log("-----------------------------------");
            issuesfile(html);
        }
    }
    function issuesfile(html){
        let $=cheerio.load(html);
        let issuesnameList=$(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
        let arr=[];
        // console.log(repoName);
        for(let i=0;i<issuesnameList.length;i++){
            let name=$(issuesnameList[i]).text();
            let link=$(issuesnameList[i]).attr("href");
            // console.log(name);
            // arr.push(name);
            // console.log(link);
            arr.push(link);
        }
        // console.table(arr);
        let folderpath=path.join(__dirname,topic);
        dirCreator(folderpath);
        let filePath=path.join(folderpath,repoName+".pdf");
        let text=JSON.stringify(arr);
        let pdfDoc=new pdfkit();
        pdfDoc.pipe(fs.createWriteStream(filePath));
        pdfDoc.text(text);
        pdfDoc.end();
        // fs.writeFileSync(filePath,JSON.stringify(arr));
    }
}
function dirCreator(folderpath){
    if(fs.existsSync(folderpath)==false){
        fs.mkdirSync(folderpath);
    }
}
module.exports=allIssues;