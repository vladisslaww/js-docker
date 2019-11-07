export enum DockerfileKeyWords {
    FROM = "FROM ",
    WORKDIR = "WORKDIR ",
    RUN = "RUN ",
    COPY = "COPY ",
    EXPOSE = "EXPOSE ",
    CMD = "CMD "
}

export interface DockerComposeFile {
    version: string,
    services: { [name: string] : DockerComposeService}
}

export interface DockerComposeService {
    container_name?: string,
    hostname?: string
    build?: string
    volumes?: Array<string>
    ports?: Array<string>
    environment?: Array<string>
}