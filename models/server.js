const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.path = {
            auth: '/auth',
            parkingInfo: '/parkingInfo',
            reserve: '/reserve',
            users: '/users',
        }

        this.connectDB();

        this.middlewares();

        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(cors());

        this.app.use(express.json());

        this.app.use(express.static('public'));

    }

    routes() {
        this.app.use(this.path.auth, require('../routes/auth'));
        this.app.use(this.path.parkingInfo, require('../routes/parking'));
        this.app.use(this.path.reserve, require('../routes/reserve'));
        this.app.use(this.path.users, require('../routes/users'));
    }

    listen() {

        this.app.listen(this.port, () => {
            console.log('Server running on: ', this.port);
        });
    }
}

module.exports = Server;