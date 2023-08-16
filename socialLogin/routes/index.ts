import googleAuthRoute from "../routes/google/google.auth";
import googleCallbackRoute from '../routes/google/google.callback'

export default (app: any) => {
  app.use("/api/auth/google", googleAuthRoute);
  app.use('/api/auth/google/callback', googleCallbackRoute);
};
