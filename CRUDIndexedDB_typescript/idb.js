"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.removeElement = exports.editElement = exports.addElement = exports.getElement = void 0;
var db;
var getElement = function (store, key) {
    var open = indexedDB.open('data');
    return new Promise(function (resolve, reject) {
        open.onsuccess = function () {
            var request;
            db = open.result;
            if (__spreadArray([], db.objectStoreNames, true).find(function (nombre) { return nombre === store; })) {
                var transaction = db.transaction(store);
                var objectStore = transaction.objectStore(store);
                if (key === 'all') {
                    request = objectStore.getAll();
                }
                else {
                    request = objectStore.get(key);
                }
                request.onerror = function () { return reject(request.error); };
                request.onsuccess = function () { return resolve(request.result); };
                transaction.oncomplete = function () { return db.close(); };
            }
            else {
                indexedDB.deleteDatabase('data');
            }
        };
    });
};
exports.getElement = getElement;
var addElement = function (store, payload) {
    var open = indexedDB.open('data');
    open.onsuccess = function () {
        db = open.result;
        if (__spreadArray([], db.objectStoreNames, true).find(function (nombre) { return nombre === store; })) {
            var transaction = db.transaction(store, 'readwrite');
            var objectStore = transaction.objectStore(store);
            var serialized = JSON.parse(JSON.stringify(payload));
            var request_1 = objectStore.add(serialized);
            request_1.onerror = function () { return console.error(request_1.error); };
            transaction.oncomplete = function () { return db.close(); };
        }
        else {
            indexedDB.deleteDatabase('data');
        }
    };
};
exports.addElement = addElement;
var editElement = function (store, key, payload) {
    var open = indexedDB.open('data');
    return new Promise(function (resolve, reject) {
        open.onsuccess = function () {
            var request;
            db = open.result;
            if (__spreadArray([], db.objectStoreNames, true).find(function (nombre) { return nombre === store; })) {
                var transaction = db.transaction(store, 'readwrite');
                var objectStore_1 = transaction.objectStore(store);
                if (key === 'all')
                    request = objectStore_1.getAll();
                else
                    request = objectStore_1.get(key);
                request.onerror = function () { return reject(request.error); };
                request.onsuccess = function () {
                    var serialized = JSON.parse(JSON.stringify(payload));
                    var updateRequest = objectStore_1.put(serialized);
                    updateRequest.onsuccess = function () { return resolve(request.result); };
                };
                transaction.oncomplete = function () { return db.close(); };
            }
            else {
                indexedDB.deleteDatabase('data');
            }
        };
    });
};
exports.editElement = editElement;
var removeElement = function (store, key) {
    var open = indexedDB.open('data');
    open.onsuccess = function () {
        var request;
        db = open.result;
        if (__spreadArray([], db.objectStoreNames, true).find(function (nombre) { return nombre === store; })) {
            var transaction = db.transaction(store, 'readwrite');
            var objectStore = transaction.objectStore(store);
            if (key === 'all')
                request = objectStore.clear();
            else
                request = objectStore["delete"](key);
            request.onerror = function () { return console.error(request.error); };
            transaction.oncomplete = function () { return db.close(); };
        }
        else {
            indexedDB.deleteDatabase('data');
        }
    };
};
exports.removeElement = removeElement;
