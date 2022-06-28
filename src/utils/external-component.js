import * as Vue from 'vue/dist/vue.esm-bundler';

export default async function externalComponent(url) {
  const name = url
    .split('/')
    .reverse()[0]
    .match(/^(.*?)\.umd/)[1];
  window.Vue = Vue;

  if (window[name]) return window[name];

  window[name] = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.async = true;
    script.addEventListener('load', () => {
      resolve(window[name]);
    });
    script.addEventListener('error', () => {
      reject(new Error(`Error loading ${url}`));
    });
    script.src = url;
    document.head.appendChild(script);
  });

  return window[name];
}
