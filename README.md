# Express Base


Archivo <b>.env</b>

DB="sqlite:///db/demo.db"
ENV="local"
MAIL_PORT=465
MAIL_USER="xyz@gmail.com"
MAIL_PASS="asdfas"
MAIL_HOST="smtp.google.com"

### Migraciones

Migraciones con DBMATE - accesos/sqlite3:

    $ npm run dbmate:new <<nombre_de_migracion>>
    $ npm run dbmate:up
    $ npm run dbmate:rollback

---

Fuentes:

+ https://expressjs.com/es/starter/generator.html
+ https://www.sitepoint.com/understanding-module-exports-exports-node-js/
+ https://getbootstrap.com/docs/4.0/examples/carousel/
+ https://libraries.io/bower/socket.io-client
+ https://stackoverflow.com/questions/24609991/using-socket-io-in-express-4-and-express-generators-bin-www
+ https://stackoverflow.com/questions/29511404/connect-to-socket-io-server-with-specific-path-and-namespace
+ https://socket.io/docs/v3/server-api/index.html
+ https://stackoverflow.com/questions/42379952/combine-sockets-and-express-when-using-express-middleware
