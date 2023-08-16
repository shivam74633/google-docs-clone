import joinRoutes from "../lib/join.routes"

export default async (app: any, routeFolderName: any, modulePath: any) => {
  await joinRoutes(modulePath, routeFolderName, app);
};
