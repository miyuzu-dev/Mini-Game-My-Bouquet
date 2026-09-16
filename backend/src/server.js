import {createApp} from './app.js';
const port=Number(process.env.PORT||3001);
const server=createApp().listen(port,'0.0.0.0',()=>console.log(`Game: My Bouquet API listening on port ${port}`));
process.on('SIGTERM',()=>server.close(()=>process.exit(0)));
