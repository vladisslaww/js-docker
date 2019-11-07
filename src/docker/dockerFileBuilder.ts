import {DockerfileKeyWords} from "../types/dockerGeneric";

export default class DockerFileBuilder {
    private fileContents: Array<string>;

    constructor(...args: any[]){
        this.fileContents = [];
        const lines = [...arguments];
        for (let i = 0; i < lines.length; i++ ) {
            this.createLine(lines[i][0], lines[i][1]);
        }
    }

    public createLine(keyWord: DockerfileKeyWords, contents: string): void {
        this.fileContents.push(keyWord + contents);
    }

    public getContents(): string {
        return this.fileContents.join("\n");
    }
}