import * as fs from "fs";
import axios from "axios";
// Toma parametro de url path relativo md
const absolutePath = process.argv[2];
let isValidate, isStats = false
process.argv.map((item)=>{
  if (item == "--validate") isValidate = true 
  if (item == "--stats") isStats = true 
});

export function readMarkdownFile(filename) {
  try {
    const fileContent = fs.readFileSync(filename, 'utf-8');
    return fileContent;
  } catch (error) {
    console.error(`Error al leer el archivo: ${filename}`);
    return null;
  }
}
export function findLinksInMarkdown(content) {
  const linkRegex = /\[([^\]]+)\]\((http[s]?:\/\/[^\)]+)\)/g;
  const links = [];
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    const [, text, url] = match;
    links.push({ text, url, absolutePath});
  }
  return links;
}
function checkLinkStatus(link) {
  return axios
    .head(link.url)
    .then((response) => {
      const statusCode = response.status;
      return  { ...link, statusCode, ok:response.status !==404 ? "ok" : "fail"};
    })
    .catch((error) => {
      const statusCode = error.response ? error.response.status : -1;
      return  { ...link, statusCode, ok:"fail" };
    });
}
function checkLinks(links) {
  const linkPromises = links.map((link) => checkLinkStatus(link));
  return Promise.all(linkPromises);
}

function countDiferentsLinks(obj) {
  const urlsCount = new Set(); 

  for (let i = 0; i < obj.length; i++) {
    urlsCount.add(obj[i].url); 
  }
  return urlsCount.size;
}

function countlinkBroke(links) {
  let errorCount = 0;

  const promises = links.map(link => {
    return axios.head(link.url)
    .then(response => {
      if (response.status === 404) {
        errorCount++;
      }
    })
    .catch(error => {
      errorCount++;
    });
  });
  return Promise.all(promises)
    .then(() => errorCount)
    .catch(error => {
      throw new Error('Error HEAD:', error);
    });
}

function resumenLinks(links, isValidate){
  let resumen = `Total: ${links.length}\nUnique: ${countDiferentsLinks(links)}`
  if(isValidate){
    return countlinkBroke(links).then((result) => resumen+`\nBroken: ${result}`)
  }else{
      return resumen
    }
}

export function mdLinks(filename){
  const markdownContent = readMarkdownFile(filename);
  if (!markdownContent && filename == "") return new Promise((resolve, rejects) => {
    resolve("error al leer el arhcivo")
  });

  const links = findLinksInMarkdown(markdownContent);

  if(isValidate && !isStats) {
    return checkLinks(links)
  }else if(isStats && !isValidate){
    return new Promise((resolve, rejects) =>{
      resolve(resumenLinks(links, false))
    })
  }else if(isStats && isValidate){
    return resumenLinks(links, true)
  }
  else{
    return new Promise((resolve, rejects)=>{
      resolve(links)
    })
  }
}

mdLinks(absolutePath)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error('Error al verificar los enlaces:', error);
  });
