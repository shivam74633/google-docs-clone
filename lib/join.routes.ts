import glob from "glob-promise";
import fs from "fs";
import _ from "lodash";

/**
 * Mount the routes for each file in the  routeFolderName folder, It should be parellel to root folder.
 * @param {String} modulePath - Folder where all the modules exists
 * @param {String} routeFolderName - Folder where all the routes are exists.
 */
async function readRoutes(modulePath: string, routeFolderName: string) {
  if (!modulePath || !fs.existsSync(modulePath)) {
    throw new Error("Invalid module path.");
  }
  const options = { cwd: modulePath, realpath: true };
  const pattern = `**/${routeFolderName}/**/*.ts`;

  try {
    const files = await glob(pattern, options);
    return files;
  } catch (error) {
    throw new Error("Invalid Route");
  }
}

/**
 * @param {String} modulePath - Folder where all the modules exists
 * @param {String} routeFolderName - Folder where all the routes are exists.
 * @param {*} app - Express instance
 * @return {Promise} - router
 */
async function joinRoutes(
  modulePath: string,
  routeFolderName: string,
  app: any
) {
  const routes = await readRoutes(modulePath, routeFolderName);
  routes.forEach((routePath) => {
    const route = require(routePath);
    if (route) {
      // Mount Routes.
      if (_.isArray(route)) {
        route.forEach((ele) => ele(app));
      } else {
        route(app);
      }
    } else {
      throw new Error("Invalid Route Path" + " " + routePath);
    }
  });
}

export default joinRoutes;
