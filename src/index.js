const pathModules = requiere('path');
const fsModules = requiere('fs');


const absolutePath = process.argv[2];

//Funcion recursiva
const isFileOrDirectory = (absolutePath) => {
    let arrayFileMd = [];
    if (fsModules.lstatsync(absolutePath).isFile() && pathModules.extname(absolutePath).isMd()) {
        arrayFileMd.push(absolutePath);
        console.log('es un archvo .md');
    } else if (fsModules.lstatsync(absolutePath).isDirectory()) {
        let contentArray = fsModules.readdirSync(absolutePath);
        //console.log('contentArray');
        contentArray.forEach((item) => {
            const newRoute = pathModules.join(absolutePath, item);
            arrayFileMd = arrayFileMd.concat(isFileOrDirectory(newRoute));
        });
    } else {
        //console.log(arrayFileMd);
    }
   
    return arrayFileMd;
}
 console.log(isFileOrDirectory(absolutePath));