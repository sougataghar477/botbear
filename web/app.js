(async function() {
    require('dotenv').config();
    const sql = require('./../sql/index.js');
    const Redis = require('./../tools/redis.js');

    await Redis.Get().Connect();
    
    const sql_opts = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        connectTimeout: 10000,
    };

    await sql.New(sql_opts);
                        
    const port = 3000;

    const routes = [
        { router: 'commands', path: '/' },
        { router: 'suggestions', path: '/suggestions'},
        { router: 'eventsub', path: '/eventsub' }
    ];
    
    const express = require('express');
    const favicon = require('express-favicon');
    const { join } = require('path');

    const app = express();
    
    app.use(favicon(join(__dirname, 'public/img/LETSPEPE.png')));
    app.use(express.static('./public'));
    app.use('/css', express.static(join(__dirname, 'public/css')));
    app.use('/js', express.static(join(__dirname, 'public/js')));
    
    app.set('views', join(__dirname, 'views'));
    app.set('view engine', 'ejs');
    
    for (const route of routes) {
        app.use(route.path, await require(`./routes/${route.router}`));
    }

    app.get('*', (req, res) => res.sendStatus(404).end());

    app.listen(port, () => console.log(`Listening on port ${port}`));
})();