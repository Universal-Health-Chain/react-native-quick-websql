
// exporting types
export * from './websql-database'

// exporting class
export { SQLitePlugin } from "./sqlite-plugin";

// The SQLitePlugin class is exported instead of exporting an initialized object by default.
// The SQLitePlugin shall be initialized by a react native project
// only if a native platform is detected (ios/android)
// but not in case of web platform (other puglin will be used in that case).
// import { SQLitePlugin } from "./sqlite-plugin";
// export default new SQLitePlugin()
