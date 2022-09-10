let url="https://github.com/topics";
const request=require("request");
const cheerio=require("cheerio");
const getReposPageHtml=require("./reposPage");
request(url,cb);
function cb(err,Response,html){
    if(err){
        console.log(err);
    }
    else{
        // console.log(html);
        getTopicLink(html);
    }
}

function getTopicLink(html){
    let $=cheerio.load(html);
    let linkElem=$(".no-underline.d-flex.flex-column.flex-justify-center");
    for(let i=0;i<linkElem.length;i++){
        let link=$(linkElem[i]).attr("href");
        let topic=link.split("/").pop();
        let fullLink=`https://github.com/${link}`
        // let fullLink="https://github.com/"+link;
        // console.log(fullLink);
        getReposPageHtml(fullLink,topic);
    }
}