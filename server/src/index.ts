import envs from './config/configuration';
import HttpServer from './server';
console.log(envs);

const httpServer = new HttpServer(envs);

httpServer.bootstrap();
httpServer.run();
