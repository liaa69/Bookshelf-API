const Hapi = require('@hapi/hapi')
const routes = require('./Routes/routes.js')

const init = async () => {
    const server = Hapi.server({
        port: 9000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*']
            }
        }
    });

    server.route(routes);


    await server.start();
    console.log(`Server run at ${server.info.uri}\n`)
}
init();