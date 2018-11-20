const Hapi = require('hapi');
const rp = require('request-promise');

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

server.route({
    method: 'GET',
    path: '/asking-for-a-friend',
    handler: (request, h) => {
      const proxyUrl = `https://duckduckgo.com${request.url.search}`;
      console.log({ proxyUrl });
      return rp(proxyUrl);
    }
});

const init = async () => {
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
