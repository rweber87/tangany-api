import http from 'http';
import { app, PORT, routes } from './app';

const server = http.createServer(app);

server.listen(PORT, () => {
  routes.forEach((route) => {
    console.log(`Routes configured for ${route.getName()}`);
  });
  console.log(`Server running at http://localhost:${PORT}`);
});
