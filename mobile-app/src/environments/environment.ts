// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  production: true,
  firebaseConfig : {
    apiKey: "AIzaSyBK4-M4ShJXSAeefb72uYjaO9GSeYWGx4Q",
    authDomain: "le-club-app.firebaseapp.com",
    databaseURL: "https://le-club-app-default-rtdb.firebaseio.com",
    projectId: "le-club-app",
    storageBucket: "le-club-app.appspot.com",
    messagingSenderId: "600713255665",
    appId: "1:600713255665:web:683d04d501bca2d02da750",
    measurementId: "G-0F5LE98407"

    // projectId: 'jay-dudhee',
    // appId: '1:280264084892:web:fd398a53a9681874310c59',
    // storageBucket: 'jay-dudhee.appspot.com',
    // apiKey: 'AIzaSyCijp5j0iqkRkxLGO3A5RvnZHcO7z5nZyU',
    // authDomain: 'jay-dudhee.firebaseapp.com',
    // messagingSenderId: '280264084892',
    // measurementId: 'G-B3T752S53J',
  },
  SENDGRID_API_KEY : "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"
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
