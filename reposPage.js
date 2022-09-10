const request=require("request");
const cheerio=require("cheerio");
const allIssues=require("./repoissues");
function getReposPageHtml(url,topic){
    request(url,cb);
    function cb(err, Response,html){
        if(err){
            console.log(err);
        }
        else{
            getReposLink(html);
            // console.log(html);
        }
    }
    function getReposLink(html){
       let $= cheerio.load(html);
       let linkElem=$(".text-bold.wb-break-word");
    //    console.log(topic);
       for(let i=0;i<8;i++){
            let link=$(linkElem[i]).attr("href");
            // console.log(link);
            let fullLink="https://github.com/"+link+"/issues";
            let repoName=link.split("/").pop();
            // console.log(fullLink);
            allIssues(fullLink,topic,repoName);
       }
    }
}
module.exports=getReposPageHtml;