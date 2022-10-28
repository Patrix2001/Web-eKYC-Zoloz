# Web eKYC Zoloz

### Description
This is demonstration for integration Zoloz on Web Application Node.js. For more details, you can check at [here](https://docs.zoloz.com/zoloz/saas/integration/grv4bb)

### Tools
* [Node js v16.11.1](https://nodejs.org/)
* [NPM v8.10.0](https://www.npmjs.com/) (packaged by Node js)


### Instructions

* Clone this repo

* Navigate your cloned project on your directory

* Install the package

```bash
 npm install
```

* Prepare **Client ID**, **ZOLOZ transaction public key** following on [here](https://docs.zoloz.com/zoloz/saas/integration/xxs8fe#Cb1Lh)

* On root directory, copy the file **.env.example** to **.env** and fill parameters as you had prepare before.
Note: **WEB_URL** is your domain web.

* Edit variable **WEB_URL** on file index.js in the src directory.

* Store the **merchant_private_key.pem** to your root directory.

* Run the app locally

```bash
 npm run dev
```

**Expected Output**

```console
ready - started server on 0.0.0.0:80, url: http://localhost:80
info  - Loaded env from E:\Semester\7\zoloz\WebZoloz\.env.local
```

Access *http://localhost* on your web browser