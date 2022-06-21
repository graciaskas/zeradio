#!/bin/env node

const dns = require('dns');
const util = require('util');
const resolveSrv = util.promisify(dns.resolveSrv);
const express = require("express");
const axios = require("axios");

const server = express();

const uri = "https://at1.api.radio-browser.info/json/stations?limit=1";
const hostname = '127.0.0.1';
const port = 8092;

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.get("/", async function(req,res){
    try {
        const { data } = await axios.get(uri);
        res.json({ 
            data,
            message: "success",
            status: res.status,
            path: req.url,
            method: req.method
        });
    } catch (error) {
        console.log(error);
        res.json({ 
            error :error.message
        });
    }
});

server.use(function(req,res){
    res.status = 404;
    res.json({ 
        data: null,
        message: "url not found",
        status: res.status,
        path: req.url,
        method: req.method
    });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

/**
 * Get a list of base urls of all available radio-browser servers
 * Returns: array of strings - base urls of radio-browser servers
 */
function get_radiobrowser_base_urls() {
    return resolveSrv("_api._tcp.radio-browser.info").then(hosts => {
        hosts.sort();
        return hosts.map(host => "https://" + host.name);
    });
}

/**
 * Get a random available radio-browser server.
 * Returns: string - base url for radio-browser api
 */
function get_radiobrowser_base_url_random() {
    return get_radiobrowser_base_urls().then(hosts => {
        var item = hosts[Math.floor(Math.random() * hosts.length)];
        return item;
    });
}

get_radiobrowser_base_urls().then(hosts => {
    for (let host of hosts)
        console.log(host);
    
    return get_radiobrowser_base_url_random();
    }).then(random_host => {
        // console.log("Random base url")
        // console.log("------------------")
        // console.log(random_host);
    });