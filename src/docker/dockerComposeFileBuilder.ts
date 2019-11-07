import {DockerComposeFile, DockerComposeService} from "../types/dockerGeneric";

export default class DockerComposeFileBuilder {
    private DockerComposeFileContents: DockerComposeFile;

    constructor () {
        this.DockerComposeFileContents = {
            version: "3",
            services: {}
        }
    }

    public addService(name: string, service: DockerComposeService) {
        this.DockerComposeFileContents.services[name] = service;
    }

    public getContents(): DockerComposeFile {
        return this.DockerComposeFileContents;
    }
}