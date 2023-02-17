"use strict";
exports.__esModule = true;
function default_1() {
    var keys = {
        posts: [{ nombre: 'Pulgarcito', unique: true }],
        projects: [{ nombre: 'hola', unique: true }]
    };
    var db;
    var request = indexedDB.open('data', 1);
    request.onerror = function (err) { return console.error("Error al inciar: ".concat(request.error), err); };
    request.onsuccess = function () { return (db = request.result); };
    request.onupgradeneeded = function () {
        var db = request.result;
        var postsStore = db.createObjectStore('postsStore', { keyPath: keys.posts[0].nombre });
        var projectsStore = db.createObjectStore('projectsStore', { keyPath: keys.projects[0].nombre });
        keys.posts.forEach(function (key) { return postsStore.createIndex(key.nombre, key.nombre, { unique: key.unique }); });
        keys.projects.forEach(function (key) { return projectsStore.createIndex(key.nombre, key.nombre, { unique: key.unique }); });
    };
    return db;
}
exports["default"] = default_1;
