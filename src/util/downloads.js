import fs from 'fs'
import 'colors'
import path from 'path'
import axios from 'axios'

const dirname = fs.realpathSync('.');
const PREFIX = "[Paper-Downloader] ->".bgWhite.black.italic


export async function download({pathStr = "",project="paper" ,version = "1.17",relesa, name = `paper-${version}-${relesa}.jar`}){
    if(pathStr.length <= 0) throw new Error("No have a path/s")
    if(name.length <= 1) name = `${project}-${version}-${relesa}.jar`
    
    let paths = pathStr.split(",")
    let promises = []

    console.log("          NOT CLOSE          ".bgYellow.red.bold)

    createFiles(project, version, relesa, paths, name, promises)

    return promises
}

async function getLinkDownload(project, version, release){
    console.log(PREFIX+` Get Files from: https://papermc.io/api/v2/projects/${project}/versions/${version}/builds/${release}/downloads/${project}-${version}-${release}.jar`.green)
    return `https://papermc.io/api/v2/projects/${project}/versions/${version}/builds/${release}/downloads/${project}-${version}-${release}.jar`
}

async function createFiles(project, version, relesa, paths, name, promises){
    for(let i = 0; i < paths.length; i++) {
        
        const sym = path.resolve(dirname, paths[i], name)

        let writer = await createWriteStream(sym)

        let res = await getStreamPaper(project,version, relesa)

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

async function getStreamPaper(project,version, relesa){
    let res = await axios({
        url: await getLinkDownload(project,version,relesa),
        method: "GET",
        onDownloadProgress: (evt) => {
            console.log("hola")
        },
        responseType: "stream"
    });
    return res;
}

