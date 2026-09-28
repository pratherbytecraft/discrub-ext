# native-runtime

@transcend-io/conflux is compiled against @babel/runtime-corejs3, which pulls the
core-js-pure polyfills into main.js. The Chrome Web Store flags one of those
polyfills (object-create, which builds a script tag through a hidden iframe) as
obfuscated code. Every browser Classic runs in has the real methods, so
vite.config.ts points those imports here instead. Each file mirrors the babel
helper of the same name, minus the polyfills.
