// License: GNU Lesser General Public License v3.0
// source (original): https://github.com/ajinabraham/njsscan/blob/master/tests/assets/node_source/true_positives/semantic_grep/ssrf/ssrf_node.js
// hash: e7a0a61
const needle = require('needle');
const axios = require('axios');
const bent = require('bent');
const getJSON = bent('json');
const getBuffer = bent('buffer');
const { request } = require('urllib');
const superagent = require('superagent');

var allowedUrls = [
    "https://example.com",
    "https://example.com/sample"
]

module.exports = function (app) {
    // http://localhost:3000/ssrf/node-ssrf/needle/1?url=https://example.com
    app.get('/ssrf/node-ssrf/needle/1', function (req, res) {
        // ruleid: rules_lgpl_javascript_ssrf_rule-node-ssrf
        needle('get', req.query.url)
            .then(function (resp) { })
            .catch(function (err) { });
        res.send('res sent from "/ssrf/node-ssrf/1"');
    });

    // http://localhost:3000/ssrf/node-ssrf/needle/2?url=https://example.com
    app.get('/ssrf/node-ssrf/needle/2', function (req, res) {
        // ruleid: rules_lgpl_javascript_ssrf_rule-node-ssrf
        needle.get(req.query.url, function (error, response, body) {
            if (error) throw error;
        });
        res.send('res sent from "/ssrf/node-ssrf/2"');
    });

    // http://localhost:3000/ssrf/node-ssrf/needle/3?url=https://example.com
    app.get('/ssrf/node-ssrf/needle/3', function (req, res) {
        // ruleid: rules_lgpl_javascript_ssrf_rule-node-ssrf
        needle
            .post(req.query.url, {}, { multipart: false })
            .on('done', function (err) { })
        res.send('res sent from "/ssrf/node-ssrf/3"');
    });

    // http://localhost:3000/ssrf/node-ssrf/needle/4?url=https://example.com
    app.get('/ssrf/node-ssrf/needle/4', function (req, res) {
        // ruleid: rules_lgpl_javascript_ssrf_rule-node-ssrf
        needle('put', req.query.url + "/sample", { password: 'god' }, { json: true })
            .then(function (response) { })
            .catch(function (err) { })
    });

    // http://localhost:3000/ssrf/node-ssrf/needle/safe/1
    app.get('/ssrf/node-ssrf/needle/safe/1', function (req, res) {
        // ok: rules_lgpl_javascript_ssrf_rule-node-ssrf
        needle('get', "https://example.com")
            .then(function (resp) { })
            .catch(function (err) { });
        res.send('res sent from "/ssrf/node-ssrf/1"');
    });

    // http://localhost:3000/ssrf/node-ssrf/needle/safe/2
    app.get('/ssrf/node-ssrf/needle/safe/2', function (req, res) {
        // ok: rules_lgpl_javascript_ssrf_rule-node-ssrf
        needle.get("https://example.com", function (error, response, body) {
        });
        res.send('res sent from "/ssrf/node-ssrf/2"');
    });

    // http://localhost:3000/ssrf/node-ssrf/needle/safe/3
    app.get('/ssrf/node-ssrf/needle/safe/3', function (req, res) {
        var url = "https://example.com";
        // ok: rules_lgpl_javascript_ssrf_rule-node-ssrf
        needle
            .post(url, {}, { multipart: false })
            .on('done', function (err) { })
        res.send('res sent from "/ssrf/node-ssrf/3"');
    });

    // http://localhost:3000/ssrf/node-ssrf/needle/safe/4
    app.get('/ssrf/node-ssrf/needle/safe/4', function (req, res) {
        var url = "https://example.com";
        // ok: rules_lgpl_javascript_ssrf_rule-node-ssrf
        needle('put', url + "/sample", { password: 'god' }, { json: true })
            .then(function (response) { })
            .catch(function (err) { })
    });

    // http://localhost:3000/ssrf/node-ssrf/axios/1?url=https://example.com
    app.get('/ssrf/node-ssrf/axios/1', function (req, res) {
        // ruleid: rules_lgpl_javascript_ssrf_rule-node-ssrf
        axios.get(req.query.url, {})
            .then(function (response) { })
            .catch(function (error) { })
    });

    // http://localhost:3000/ssrf/node-ssrf/axios/2?url=https://example.com
    app.get('/ssrf/node-ssrf/axios/2', function (req, res) {
        // ruleid: rules_lgpl_javascript_ssrf_rule-node-ssrf
        axios({
            method: 'get',
            url: req.query.url
        }).then(function (response) { })
    });

    // http://localhost:3000/ssrf/node-ssrf/axios/safe/1
    app.get('/ssrf/node-ssrf/axios/safe/1', function (req, res) {
        var url = "https://example.com";
        // ok: rules_lgpl_javascript_ssrf_rule-node-ssrf
        axios.get(url, {})
            .then(function (response) { })
            .catch(function (error) { })
    });

    // http://localhost:3000/ssrf/node-ssrf/axios/safe/2
    app.get('/ssrf/node-ssrf/axios/safe/2', function (req, res) {
        // ok: rules_lgpl_javascript_ssrf_rule-node-ssrf
        axios({
            method: 'get',
            url: "https://example.com"
        }).then(function (response) { })
    });

    // http://localhost:3000/ssrf/node-ssrf/axios/safe/3?url=KEY
    app.get('/ssrf/node-ssrf/axios/safe/3', function (req, res) {
        // ok: rules_lgpl_javascript_ssrf_rule-node-ssrf
        var isAllowed = allowedUrls.includes(req.query.name);
        if (isAllowed) {
            axios.get(url, {}).then(function (response) { }).catch(function (response) { }).finally(() => { res.send("res sent from '/ssrf/node-ssrf/axios/safe/3'") })
        }

    });

    // http://localhost:3000/ssrf/node-ssrf/bent/1?urlJSON=http://localhost:3000/ssrf/node-ssrf/sample&urlBuffer=https://gitlab.com/assets/illustrations/gitlab_logo-95e56730dc3513d2d29f49774e8a7c496bce38b491d1ce8c9e76b1e48128ccc4.svg
    app.get('/ssrf/node-ssrf/bent/1', async function (req, res) {
        // ruleid: rules_lgpl_javascript_ssrf_rule-node-ssrf
        let obj = await getJSON(req.query.urlJSON)
        // ruleid: rules_lgpl_javascript_ssrf_rule-node-ssrf
        let buffer = await getBuffer(req.query.urlBuffer)
        res.send({
            obj,
            buffer
        })
    });

    // http://localhost:3000/ssrf/node-ssrf/bent/2?urlJSON=ssrf/node-ssrf/sample
    app.get('/ssrf/node-ssrf/bent/2', async function (req, res) {
        const get = bent('http://localhost:3000/', 'GET', 'json', 200);
        // ruleid: rules_lgpl_javascript_ssrf_rule-node-ssrf
        const response = await get(req.query.urlJSON, {});
        res.send({
            response
        })
    });

    // http://localhost:3000/ssrf/node-ssrf/bent/safe/1
    app.get('/ssrf/node-ssrf/bent/safe/1', async function (req, res) {
        // ok: rules_lgpl_javascript_ssrf_rule-node-ssrf
        let obj = await getJSON("http://localhost:3000/ssrf/node-ssrf/sample")
        // ok: rules_lgpl_javascript_ssrf_rule-node-ssrf
        let buffer = await getBuffer("https://gitlab.com/assets/illustrations/gitlab_logo-95e56730dc3513d2d29f49774e8a7c496bce38b491d1ce8c9e76b1e48128ccc4.svg")
        res.send({
            obj,
            buffer
        })
    });

    // http://localhost:3000/ssrf/node-ssrf/urllib/1?url=http://localhost:3000/ssrf/node-ssrf/sample
    app.get('/ssrf/node-ssrf/urllib/1', async function (req, res) {
        // ruleid: rules_lgpl_javascript_ssrf_rule-node-ssrf
        const response = await request(req.query.url, {
            method: 'GET',
            dataType: 'json',
            data: {},
        });
        res.send({
            res: response.data
        })
    });

    // http://localhost:3000/ssrf/node-ssrf/urllib/safe/1
    app.get('/ssrf/node-ssrf/urllib/1', async function (req, res) {
        // ok: rules_lgpl_javascript_ssrf_rule-node-ssrf
        const response = await request("http://localhost:3000/ssrf/node-ssrf/sample", {
            method: 'GET',
            dataType: 'json',
            data: {},
        });
        res.send({
            res: response.data
        })
    });

    // http://localhost:3000/ssrf/node-ssrf/superagent/1?url=http://localhost:3000/ssrf/node-ssrf/sample
    app.get('/ssrf/node-ssrf/superagent/1', async function (req, res) {
        // ruleid: rules_lgpl_javascript_ssrf_rule-node-ssrf
        superagent
            .post(req.query.url)
            .send({})
            .set('accept', 'json')
            .end((err, res) => {
            });
        res.send('res sent from "/ssrf/node-ssrf/superagent/1"');
    });


    // http://localhost:3000/ssrf/node-ssrf/superagent/safe/1
    app.get('/ssrf/node-ssrf/superagent/safe/1', async function (req, res) {
        // safe: rules_lgpl_javascript_ssrf_rule-node-ssrf
        superagent
            .post("http://localhost:3000/ssrf/node-ssrf/sample")
            .send({})
            .set('accept', 'json')
            .end((err, res) => { });
        res.send('res sent from "/ssrf/node-ssrf/superagent/1"');
    });

    // http://localhost:3000/ssrf/node-ssrf/superagent/2?url=http://localhost:3000/ssrf/node-ssrf/sample
    app.get('/ssrf/node-ssrf/superagent/2', async function (req, res) {
        const url = req.query.url
        // ruleid: rules_lgpl_javascript_ssrf_rule-node-ssrf
        superagent
            .get(url)
            .send({})
            .set('accept', 'json')
            .end((err, res) => { });
        res.send('res sent from "/ssrf/node-ssrf/superagent/2"');
    });

    // http://localhost:3000/ssrf/node-ssrf/superagent/3?KEY=KEY
    app.get('/ssrf/node-ssrf/superagent/3', async function (req, res) {
        if (allowedUrls.includes(req.query.url)) {
             // ok: rules_lgpl_javascript_ssrf_rule-node-ssrf
            superagent
                .get(req.query.url)
                .send({})
                .set('accept', 'json')
                .end((err, res) => {
                });
        }
        res.send('res sent from "/ssrf/node-ssrf/superagent/3"');
    });

    // http://localhost:3000/ssrf/node-ssrf/fetch/1?url=http://localhost:3000/ssrf/node-ssrf/sample
    app.get('/ssrf/node-ssrf/fetch/1', async function (req, res) {
        const url = req.query.url
        // ruleid: rules_lgpl_javascript_ssrf_rule-node-ssrf
        const response = await fetch(url, {
            method: "GET",
        })
        res.send('res sent from "/ssrf/node-ssrf/fetch/1"');
    });


    // http://localhost:3000/ssrf/node-ssrf/fetch/safe/1
    app.get('/ssrf/node-ssrf/fetch/1', async function (req, res) {
        const url = "http://localhost:3000/ssrf/node-ssrf/sample"
        // ok: rules_lgpl_javascript_ssrf_rule-node-ssrf
        const response = await fetch(url, {
            method: "GET",
        })
        res.send('res sent from "/ssrf/node-ssrf/fetch/1"');
    });

    // http://localhost:3000/ssrf/node-ssrf/socket-io/1?url=http://localhost:3000
    app.get('/ssrf/node-ssrf/socket-io/1', async function (req, res) {
        const io = require('socket.io-client');
        // ruleid: rules_lgpl_javascript_ssrf_rule-node-ssrf
        const socket = io(req.query.url);
        socket.on('connect', () => {
            console.log('Connected to server');
            socket.emit('message', 'Hello Server!');
        });
        res.send('res sent from "/ssrf/node-ssrf/socket-io/1"');
    });

    // http://localhost:3000/ssrf/node-ssrf/socket-io/safe/1
    app.get('/ssrf/node-ssrf/socket-io/safe/1', async function (req, res) {
        const io = require('socket.io-client');

        // ok: rules_lgpl_javascript_ssrf_rule-node-ssrf
        const socket = io("http://localhost:3000");
        socket.on('connect', () => {
            console.log('Connected to server');
            socket.emit('message', 'Hello Server!');
        });
        res.send('res sent from "/ssrf/node-ssrf/socket-io/1"');
    });

    // http://localhost:3000/ssrf/node-ssrf/net/1?url=4.2.2.2
    app.get('/ssrf/node-ssrf/net/1', async function (req, res) {
        const net = require('net');
        const host = req.query.url

        var client = new net.Socket();
        // ruleid:rules_lgpl_javascript_ssrf_rule-node-ssrf
        client.connect(53, host, function () {
            console.log('Connected');
            client.destroy();
        });

        res.send('res sent from "/ssrf/node-ssrf/net/1"');
    });

    // http://localhost:3000/ssrf/node-ssrf/net/safe/1?url=4.2.2.2
    app.get('/ssrf/node-ssrf/net/safe/1', async function (req, res) {
        const net = require('net');
        const host = "4.2.2.2"

        var client = new net.Socket();
        // ok:rules_lgpl_javascript_ssrf_rule-node-ssrf
        client.connect(53, host, function () {
            console.log('Connected');
            client.destroy();
        });
        res.send('res sent from "/ssrf/node-ssrf/net/1"');
    });

    // http://localhost:3000/ssrf/node-ssrf/http/1?url=127.0.0.1
    app.get('/ssrf/node-ssrf/http/1', async function (req, res) {
        const http = require('http');
        const options = {
            hostname: req.query.url,
            port: 3000,
            path: '/ssrf/node-ssrf/sample',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        };
        // ruleid: rules_lgpl_javascript_ssrf_rule-node-ssrf
        const fk = http.get(options, function (_res) {
            _res.on('end', (data) => {
                console.log(data);
            });
        });
        res.send('res sent from "/ssrf/node-ssrf/http/1"');
    });

    // http://localhost:3000/ssrf/node-ssrf/http/2?url=http://localhost:3000/ssrf/node-ssrf/sample
    app.get('/ssrf/node-ssrf/http/2', async function (req, res) {
        const http = require('http');
        // ruleid: rules_lgpl_javascript_ssrf_rule-node-ssrf
        const fk = http.get(req.query.url, function (_res) {
            _res.on('end', (data) => {
                console.log(data);
            });
        });
        res.send('res sent from "/ssrf/node-ssrf/http/2"');
    });

    // http://localhost:3000/ssrf/node-ssrf/https/1?url=4.4.4.4
    app.get('/ssrf/node-ssrf/https/1', async function (req, res) {
        const https = require('https');
        const options = {
            hostname: req.query.url,
            path: "/sample",
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        };
        // ruleid: rules_lgpl_javascript_ssrf_rule-node-ssrf
        const call = https.get(options, function (_res) {
            _res.on('data', (data) => {
                console.log(data);
            });
        });
        res.send('res sent from "/ssrf/node-ssrf/https/1"');
    });

    // http://localhost:3000/ssrf/node-ssrf/https/2?url=https://example.com
    app.get('/ssrf/node-ssrf/https/2', async function (req, res) {
        const https = require('https');
        // ruleid: rules_lgpl_javascript_ssrf_rule-node-ssrf
        const call = https.get(req.query.url, function (_res) {
            _res.on('data', (data) => { });
        });
        res.send('res sent from "/ssrf/node-ssrf/https/2"');
    });

    // http://localhost:3000/ssrf/node-ssrf/https/safe/1
    app.get('/ssrf/node-ssrf/https/safe/1', async function (req, res) {
        const https = require('https');
        // ok: rules_lgpl_javascript_ssrf_rule-node-ssrf
        const call = https.get("https://example.com", function (_res) {
            _res.on('data', (data) => { });
        });

        res.send('res sent from "/ssrf/node-ssrf/https/2"');
    });
}

import got from 'got';
import express from "express";
import { request } from "urllib";
import bent from 'bent';

const getJSON6 = bent('json');
const getBuffer6 = bent('buffer');

const router = express.Router();

// http://localhost:3000/ssrf/node-ssrf/got/1?url=http://localhost:3000/ssrf/node-ssrf/sample
router.route("/got/1").get(async (req, res) => {
    // ruleid: rules_lgpl_javascript_ssrf_rule-node-ssrf
    const data = await got.post(req.query.url, {
        json: {}
    }).json();
    res.send("res from /got/1")
});


// http://localhost:3000/ssrf/node-ssrf/got/2?url=http://localhost:3000/ssrf/node-ssrf/sample
router.route("/got/2").get(async (req, res) => {
    const url = req.query.url;
    // ruleid: rules_lgpl_javascript_ssrf_rule-node-ssrf
    const data = await got.get(url).json();
    res.send("res from /got/1")
});

// http://localhost:3000/ssrf/node-ssrf/got/safe/1
router.route("/got/safe/1").get(async (req, res) => {
    // ok: rules_lgpl_javascript_ssrf_rule-node-ssrf
    const data = await got.post("http://localhost:3000/ssrf/node-ssrf/sample", {
        json: {}
    }).json();
    res.send("res from /got/1")
});

// http://localhost:3000/ssrf/node-ssrf/got/safe/2
router.route("/got/safe/2").get(async (req, res) => {
    var url = "http://localhost:3000/ssrf/node-ssrf/sample"
    // ok: rules_lgpl_javascript_ssrf_rule-node-ssrf
    const data = await got.post(url, {
        json: {}
    }).json();
    res.send("res from /got/1")
});

// http://localhost:3000/ssrf/node-ssrf/urllib/1?url=http://localhost:3000/ssrf/node-ssrf/sample
router.route("/urllib/1").get(async (req, res) => {
    // ruleid: rules_lgpl_javascript_ssrf_rule-node-ssrf
    const response = await request(req.query.url, {
        method: 'GET',
        dataType: 'json',
        data: {},
    });
    res.send({
        res: response.data
    })
});

// http://localhost:3000/ssrf/node-ssrf/bent/1?hostName=http://localhost:3000/&path=ssrf/node-ssrf/sample&jsonPath=http://localhost:3000/ssrf/node-ssrf/sample&bufferPath=https://gitlab.com/assets/illustrations/gitlab_logo-95e56730dc3513d2d29f49774e8a7c496bce38b491d1ce8c9e76b1e48128ccc4.svg
router.route("/bent/1").get(async (req, res) => {
    // ruleid: rules_lgpl_javascript_ssrf_rule-node-ssrf
    const get = bent(req.query.hostName, 'GET', 'json', 200);
    // ruleid: rules_lgpl_javascript_ssrf_rule-node-ssrf
    const response = await get(req.query.path, {});
    console.log(response)

    // ruleid: rules_lgpl_javascript_ssrf_rule-node-ssrf
    let obj = await getJSON6(req.query.jsonPath)
    // ruleid: rules_lgpl_javascript_ssrf_rule-node-ssrf
    let buffer = await getBuffer6(req.query.bufferPath)

    res.send({
        response,
        obj,
        buffer
    })
});

export default router;