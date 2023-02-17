var db_name = 'myTasks';
var DB_VERSION = 1;
var dbRequest = indexedDB.open(db_name, DB_VERSION);
dbRequest.onupgradeneeded = function (event) {
    var db = event.target.result;
    var taskStore = db.createObjectStore('tasks', { keyPath: 'id', autoIncrement: true });
    taskStore.createIndex('name', 'name', { unique: false });
    taskStore.createIndex('dueDate', 'dueDate', { unique: false });
};
function addTask(task) {
    var transaction = dbRequest.result.transaction('tasks', 'readwrite');
    var taskStore = transaction.objectStore('tasks');
    var request = taskStore.add(task);
    request.onsuccess = function (event) {
        console.log('Task added successfully');
    };
    request.onerror = function (event) {
        console.error('Error adding task');
    };
}
function getTasks() {
    return new Promise(function (resolve, reject) {
        var transaction = dbRequest.result.transaction('tasks', 'readonly');
        var taskStore = transaction.objectStore('tasks');
        var request = taskStore.getAll();
        request.onsuccess = function (event) {
            var tasks = request.result;
            resolve(tasks);
        };
        request.onerror = function (event) {
            reject('Error retrieving tasks');
        };
    });
}
function updateTask(task) {
    var transaction = dbRequest.result.transaction('tasks', 'readwrite');
    var taskStore = transaction.objectStore('tasks');
    var request = taskStore.put(task);
    request.onsuccess = function (event) {
        console.log('Task updated successfully');
    };
    request.onerror = function (event) {
        console.error('Error updating task');
    };
}
function deleteTask(id) {
    var transaction = dbRequest.result.transaction('tasks', 'readwrite');
    var taskStore = transaction.objectStore('tasks');
    var request = taskStore["delete"](id);
    request.onsuccess = function (event) {
        console.log('Task deleted successfully');
    };
    request.onerror = function (event) {
        console.error('Error deleting task');
    };
}
