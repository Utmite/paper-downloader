import fs from 'fs'
import 'colors'
import path from 'path'
import axios from 'axios'

const dirname = fs.realpathSync('.');
const PREFIX = "[Paper-Downloader] ->".bgWhite.black.italic


export async function download({pathStr, proyect, version, release, name}){


    if(pathStr.length <= 0) throw new Error("No have a path/s")

    if(name.length <= 1) name = `${proyect}-${version}-${release}.jar`
    
    let paths = pathStr.split(",")
    let promises = []

    console.log("          NOT CLOSE          ".bgYellow.red.bold)

    createFiles(proyect, version, release, paths, name, promises)

    return promises
}

async function getLinkDownload(proyect, version, release){
    
    console.log(PREFIX+` Get Files from: https://api.papermc.io/v2/projects/${proyect}/versions/${version}/builds/${release}/downloads/${proyect}-${version}-${release}.jar`.green)
    return `https://api.papermc.io/v2/projects/${proyect}/versions/${version}/builds/${release}/downloads/${proyect}-${version}-${release}.jar`
}
async function createFiles(proyect, version, release, paths, name, promises){
    for(let i = 0; i < paths.length; i++) {
        
        const sym = path.resolve(dirname, paths[i], name)

        let writer = await createWriteStream(sym)

        let res = await getStreamPaper(proyect,version, release)

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

async function getStreamPaper(proyect,version, release){
    let res = await axios({
        url: await getLinkDownload(proyect,version,release),
        method: "GET",
        onDownloadProgress: (evt) => {
            console.log("hola")
        },
        responseType: "stream"
    });
    return res;
}

