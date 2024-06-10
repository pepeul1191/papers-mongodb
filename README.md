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


```javascript
db.papers.aggregate([
  {
    $lookup: {
      from: "key_words",
      localField: "key_words",
      foreignField: "_id",
      as: "key_words_data"
    }
  },
  {
    $project: {
      _id: { $toString: "$_id" },
      authors: 1,
      author_abstract: 1,
      my_abstract: 1,
      year: 1,
      source: 1,
      source_url: 1,
      my_ranking: 1,
      key_words: 1,
      doi: 1,
      file_url: 1,
      //updated: 1,
      //created: 1,
      created: { $dateToString: { format: "%d/%m/%Y %H:%M:%S", date: "$created", timezone: "-05:00" } },
      updated: { $dateToString: { format: "%d/%m/%Y %H:%M:%S", date: "$updated", timezone: "-05:00" } },
      // Agrega aquí todos los campos necesarios que no deseas cambiar
      key_words: {
        $map: {
          input: "$key_words_data",
          as: "kw",
          in: {
            _id: { $toString: "$$kw._id" },
            name: "$$kw.name",
            // Agrega aquí los campos adicionales de key_words si los hay
          }
        }
      }
    }
  }
]);
```

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
