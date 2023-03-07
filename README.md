![logo](https://avatars.githubusercontent.com/u/57396025?s=200&v=4)

# **React Native Quick WebSQL Plugin**

Forked from https://github.com/craftzdog/react-native-quick-websql to solve some problems with Jest and to allow using other packages for web (to be used in Expo).

```
Jest Error:
node_modules/@craftzdog/pouchdb-adapter-websql-core/src/index.js:2
    import {
    ^^^^^^
    SyntaxError: Cannot use import statement outside a module
```

To solve this error, it exports the class instead of an instantiated object.

Example:

- instead of the original
```js
import WebSQLite from "react-native-quick-websql";
const db = WebSQLite.openDatabase('mydb.db')
```

- now you can use it as follows
``` js
// first import the class
import { SQLitePlugin } from "react-native-quick-websql-plugin";

// then you can check if Platform.OS !== "web" before instantiating the SQLite plugin for react native
const pluginSQLite = new SQLitePlugin()

// now you can open the database
const db = pluginSQLite.openDatabase('mydb.db')
```


![cover](https://repository-images.githubusercontent.com/486860084/27ea3b8e-30c4-4acb-9c2c-691b37d9e2a2)

This library provides a [WebSQL](http://www.w3.org/TR/webdatabase/)-compatible API to store data in a react native app, by using a fast [JSI](https://formidable.com/blog/2019/jsi-jsc-part-2/) implementation of the SQLite driver [react-native-quick-sqlite](https://github.com/ospfranco/react-native-quick-sqlite).

## Installation

```sh
expo install @universal-health-chain/react-native-quick-websql-plugin react-native-quick-sqlite
```
or
```sh
npm i @universal-health-chain/react-native-quick-websql-plugin react-native-quick-sqlite
```
or
```sh
yarn add @universal-health-chain/react-native-quick-websql-plugin react-native-quick-sqlite
```

and then:
```sh
npx pod-install
```

## Usage

See [an example project](./example/src/App.tsx) for more detail.

```js
import { SQLitePlugin } from "@universal-health-chain/react-native-quick-sqlite";
// check if Platform.OS !== "web"
const pluginSQLite = new SQLitePlugin() // initializing the class  
const db = pluginSQLite.openDatabase('mydb.db')
db.transaction(
  (txn) => {
    console.log('Running transaction')
    txn.executeSql('DROP TABLE IF EXISTS Users', [])
    txn.executeSql(
      'CREATE TABLE IF NOT EXISTS Users(user_id INTEGER PRIMARY KEY NOT NULL, name VARCHAR(30))',
      []
    )
    txn.executeSql('INSERT INTO Users (name) VALUES (:name)', [
      'nora',
    ])
    txn.executeSql('INSERT INTO Users (name) VALUES (:name)', ['takuya'])
    txn.executeSql('SELECT * FROM `users`', [], function (_tx, res) {
      for (let i = 0; i < (res.rows?.length || 0); ++i) {
        console.log('item:', res.rows?.item(i))
      }
    })
  },
  (e) => {
    console.error(e)
  }
)
```


## Limitations & Debugging

As the library uses JSI for synchronous native methods access, remote debugging (e.g. with Chrome) is no longer possible.
Instead, you should use [Flipper](https://github.com/facebook/flipper).

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT by Takuya Matsuyama
