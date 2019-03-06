#! /usr/bin/env node
'use strict';

const fs = require('fs');
const chalk = require('chalk');
const tokenizer = require('./src/parser/tokenizer.js');
const parser = require('./src/parser/parser.js');
const transformer = require('./src/transformer/transformer.js');

const args = process.argv;
const [nodeLocation, karcLocation, ...options] = args;

const entryPoint = options.length != 0
    ? options[0]
    : '../compil/src/main.java';

if (fs.existsSync(entryPoint)) {
    try {
        var tokens = tokenizer(fs.readFileSync(entryPoint, 'utf8'));
        console.log("\n--- Tokens ----------\n");
        console.log(tokens);
        console.log("\n--- AST -------------\n");
        var AST = parser(tokens);
        console.log(AST);
        console.log("\n--- Transformation --\n");
        var rapport = transformer(AST);
        console.log(rapport);
    } catch (e) {
        printError(e);
    }
} else {
    printError(`Could not find the entry point \`${chalk.magenta(entryPoint)}\``)
}

function printError(err) {
    console.log(`${chalk.red('Error')} ${err}`);
}