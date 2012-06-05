var config = require("./default");

config.containers.master.plugins.forEach(function(plugin) {
    if (plugin.packagePath) {
        if (/\/cloud9.core$/.test(plugin.packagePath)) {
            plugin.socketIoTransports = ["websocket", "htmlfile", "xhr-multipart", "xhr-polling"];
        }
    }
});

config.containers.master.plugins = config.containers.master.plugins.filter(function(plugin) {
   // returns false of any of these plugins are detected; lib.packed will emit them
   return !(/\/plugins-client\/cloud9.core$/.test(plugin) ||
            /\/plugins-client\/lib.ace$/.test(plugin) ||
            /\/plugins-client\/lib.apf$/.test(plugin) ||
            /\/plugins-client\/lib.treehugger$/.test(plugin) ||
            /\/plugins-client\/lib.v8debug$/.test(plugin))
});

config.containers.master.plugins.push("./../plugins-client/lib.packed");

module.exports = config;