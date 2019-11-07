#!/usr/bin/env node

import program from "commander";
import fs from "fs";
import DockerFileBuilder from "./docker/dockerFileBuilder";
import {DockerComposeService, DockerfileKeyWords} from "./types/dockerGeneric";
import DockerComposeFileBuilder from "./docker/dockerComposeFileBuilder";
import yaml from "js-yaml";

program
    .version('0.1.0')
    .option('-p, --path [path]', 'Path to project root');

program.parse(process.argv); //TODO work with path

const dockerFileBuilder = new DockerFileBuilder(
    [DockerfileKeyWords.FROM, 'node:10.15.3-alpine'],
    [DockerfileKeyWords.WORKDIR, '/app'],
    [DockerfileKeyWords.COPY, 'package*.json ./'], //TODO work with path
    [DockerfileKeyWords.RUN, 'npm install'],
    [DockerfileKeyWords.COPY, '. /app'], //TODO work with path
    [DockerfileKeyWords.CMD, '[ "npm", "run", "serve" ]'] //TODO prompt to get command
);

fs.writeFile('Dockerfile', dockerFileBuilder.getContents(), function (err) {
    if (err) throw err;
    console.log('Dockerfile is created successfully.');
});

const dockerComposeFileBuilder = new DockerComposeFileBuilder();
const clientService: DockerComposeService = {};

clientService.container_name = "client";
clientService.build = '.'; //TODO work with path
clientService.volumes = ['.:/app', '/app/node_modules']; //TODO work with path
clientService.ports = ['80:8080']; //TODO prompt to get port
clientService.environment = ['CHOKIDAR_USEPOLLING=true'];

dockerComposeFileBuilder.addService('client', clientService);

fs.writeFile('docker-compose.yaml', yaml.dump(dockerComposeFileBuilder.getContents()), function (err) {
    if (err) throw err;
    console.log('docker-compose.yaml is created successfully.');
});