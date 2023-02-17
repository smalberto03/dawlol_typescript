export default function () {
  const keys = {
      posts: [{ nombre: 'Pulgarcito', unique: true }],
      projects: [{ nombre: 'hola', unique: true }],
  };

  let db!: IDBDatabase;

  const request = indexedDB.open('data', 1);

  request.onerror = (err) => console.error(`Error al inciar: ${request.error}`, err);
  request.onsuccess = () => (db = request.result);

  request.onupgradeneeded = () => {
      const db = request.result;
      const postsStore = db.createObjectStore('postsStore', { keyPath: keys.posts[0].nombre });
      const projectsStore = db.createObjectStore('projectsStore', { keyPath: keys.projects[0].nombre });
      keys.posts.forEach((key) => postsStore.createIndex(key.nombre, key.nombre, { unique: key.unique }));
      keys.projects.forEach((key) => projectsStore.createIndex(key.nombre, key.nombre, { unique: key.unique }));
  };

  return db;
}