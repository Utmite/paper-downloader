import fs, { link } from 'fs'
import 'colors'
import path from 'path'
import axios from 'axios'

const dirname = fs.realpathSync('.');
const PREFIX = "[Paper-Downloader] ->".bgWhite.black.italic


export async function download({pathStr = "", version = "1.17",relesa, name = `paper-${version}-${relesa}.jar`}){
    if(pathStr.length <= 0) throw new Error("No have a path/s")
    if(name.length <= 1) name = `paper-${version}-${relesa}.jar`
    
    let paths = pathStr.split(",")
    let promises = []

    console.log("          NOT CLOSE          ".bgYellow.red.bold)

    createFiles(version, relesa, paths, name, promises)

    return promises
}

async function getLinkDownload(version,release){
    return `https://papermc.io/api/v2/projects/paper/versions/${version}/builds/${release}/downloads/paper-${version}-${release}.jar`
}

async function createFiles(version,relesa, paths, name, promises){
    for(let i = 0; i < paths.length; i++) {
        
        const sym = path.resolve(dirname, paths[i], name)

        let writer = await createWriteStream(sym)

        let res = await getStreamPaper(version, relesa)

        await res.data.pipe(writer)
        console.log(PREFIX+` The N-${i+1} is starting download`.green)

        promises.push(     
            new Promise((resolve, reject) => {
            writer.on('finish', () => console.log(PREFIX+` The N-${i+1} is ready on ${sym}`.cyan))
            writer.on('error', reject => console.log(PREFIX+` Error N-${i+1} info ${reject}`.red))

        }))
    }
}

async function createWriteStream(sym) { 
    let writer = await fs.createWriteStream(sym);
    return writer;
}

async function getStreamPaper(version, relesa){
    let res = await axios({
        url: await getLinkDownload(version,relesa),
        method: "GET",
        onDownloadProgress: (evt) => {
            console.log("hola")
        },
        responseType: "stream"
    });
    return res;
}

getStreamPaper("1.17.1","186")