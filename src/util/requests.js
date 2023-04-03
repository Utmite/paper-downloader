import axios from 'axios'
import links from './urls.js'

export async function getVersionsAvailable(project) {
    let res = await axios.get(links.ProjectsAvailable+"/"+project);

    return res.data.versions.reverse();
}

export async function getProjectsAvailable() {
    try {
    let res = await axios.get(links.ProjectsAvailable);
    return res.data.projects
    }catch (err) {
        console.error(err)
    }
}

export async function getVersions({version,project}){
    verifyVersion(version,project)

    
    let res = await axios.get(`https://papermc.io/api/v2/projects/${project}/versions/${version}`);

    return await res.data.builds.reverse()
}

async function verifyVersion(version,project){
    if(!version) throw new Error('No version provied')
    if(!project) throw new Error('No project provied')

    const versions = await getVersionsAvailable(project)

    if(versions.indexOf(version) === -1) throw new Error("This version is not Available")
}

