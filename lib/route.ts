import * as _ from 'lodash';
const asyncback = require('asyncback');

interface Meta {
  isPublic: boolean;
}



/**
 * Mounts async handler on app for given method at given path.
 * @param {string} method HTTP method
 * @param {string} path route path
 * @param {function/Object} handler handler async function or object
 * @param {Meta} meta meta info of route
 * @param {Application} app express/router instance
 */
function mount(method: string, path: string, handler: Function | Object, meta: Meta, app: any) {
  let p = '/api' + path;
  if (meta && meta.isPublic) {
    p = '/api/public' + path;
  }
  console.log(p);
  if (_.isPlainObject(handler)) {
    app[method](
        p,
    );
  } else {
    app[method](p, asyncback(handler as Function));
  }
}

// supported HTTP methods
const methods: string[] = ['get', 'put', 'post', 'delete'];

const exportedMethods: { [key: string]: (path: string, handler: Function | Object, meta?: Meta) => Function } = {};

// add route methods to exports
methods.forEach((method) => {
  exportedMethods[method] = (path: string, handler: Function | Object, meta: Meta = {isPublic: false}) =>
    _.partial(mount, method, path, handler, meta);
});

export default exportedMethods;