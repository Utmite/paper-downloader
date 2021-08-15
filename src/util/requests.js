import axios from 'axios'
import links from './urls'

export async function getVersionsAvailable() {
    let res = await axios.get(links.VersionsAvailable);
    return res.data.versions.reverse();
}

async function verifyVersion(version){
    if(!version) throw new Error('No version provied')

    const versions = await getVersionsAvailable()

    if(versions.indexOf(version) === -1) throw new Error("This version is not Available")
}

export async function getVersions({version}){

    verifyVersion(version)

    let res = await axios.get(`https://papermc.io/api/v2/projects/paper/versions/${version}`);

    return await res.data.builds.reverse()
}