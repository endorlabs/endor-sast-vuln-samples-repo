function dynamicRequire3(folder, moduleName) {
    // ruleid: js-non-literal-require
    const module = require(`${folder}/${moduleName}`);
    return module;
}

function dynamicRequire4(config) {
    // ruleid: js-non-literal-require
    const plugin = require(config.pluginPath);
    return plugin.init();
}

function dynamicRequire5(moduleId) {
    const basePath = './modules/';
    // ruleid: js-non-literal-require
    return require(basePath + moduleId);
}

function okDynamicRequire6() {
    const moduleName = 'lodash';
    // ok: js-non-literal-require
    const _ = require(moduleName);
    return _;
}

function dynamicRequire7(environment) {
    const configFile = environment === 'production' ? 'prod.config.js' : 'dev.config.js';
    // ok: js-non-literal-require
    const config = require(`./config/${configFile}`);
    return config;
}

function okDynamicRequire8() {
    const fs = require('fs');
    const path = require('path');
    const configPath = path.join(__dirname, 'config.json');
    const configContent = fs.readFileSync(configPath, 'utf8');
    const config = JSON.parse(configContent);
    // ruleid: js-non-literal-require
    return require(config.mainModule);
}

function dynamicRequire9(feature) {
    // ruleid: js-non-literal-require
    const featureModule = require(`./features/${feature}`);
    return featureModule.initialize();
}

function okDynamicRequire10() {
    const moduleNames = ['lodash', 'moment', 'axios'];
    // ruleid: js-non-literal-require
    return moduleNames.map(name => require(name));
}