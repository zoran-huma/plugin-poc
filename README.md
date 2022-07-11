### Run

npm run dev

### Server Notes

Put \*umd.min.js and css file under server/build
Also update plugins.json `key` and `hash` to match the file

For example you have a umd file `plugin-01.e1687d4554b8ce03.umd.min.js`
set the object in plugins.json as

`{ "id": 0, "key": "plugin-01", "name": "Plugin 1", "hash": "e1687d4554b8ce03", "enabled": true }`
