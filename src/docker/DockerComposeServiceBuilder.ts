import {DockerComposeService} from "../types/dockerGeneric";

export default class DockerComposeServiceBuilder {
    private service: DockerComposeService;

    constructor () {
        this.service = {};
    }
}