import axios from 'axios'
import fs from 'fs'
import 'colors'
import path from 'path'


const dirname = fs.realpathSync('.');
const PREFIX = "[Paper-Downloader] create by rocka.gg ->".bgWhite.black.italic

async function getLinkDownload(version,release){
    return `https://papermc.io/api/v2/projects/paper/versions/${version}/builds/${release}/downloads/paper-${version}-${release}.jar`
}

export async function getVersions({version = "1.17"}){
    let res = await axios.get(`https://papermc.io/api/v2/projects/paper/versions/${version}`);
    let data = await res.data;
    return data.builds.reverse()
}

export async function download({pathStr = "", version = "1.17",relesa, name = `paper-${version}-${relesa}.jar`}){
    if(pathStr.length <= 1) throw new Error("No have a path/s")
    if(name.length <= 1) name = `paper-${version}-${relesa}.jar`
    
    let paths = pathStr.split(",")
    let Promises = []

    for(let i = 0; i < paths.length; i++) {
        
        const sym = path.resolve(dirname, paths[i], name)
        let writer = await fs.createWriteStream(sym);

        let res = await axios({
            url: await getLinkDownload(version,relesa),
            method: "GET",
            responseType: "stream"
        });

        await res.data.pipe(writer)
        Promises.push(     
            new Promise((resolve, reject) => {
            writer.on('finish', () => console.log(PREFIX+` The N-${i+1} is ready on ${sym}`.cyan))
            writer.on('error', reject => console.log(PREFIX+` Error N-${i+1} info ${reject}`))

        }))
    }
    return Promises
}