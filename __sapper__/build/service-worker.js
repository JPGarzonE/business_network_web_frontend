!function(e){var n={};function s(t){if(n[t])return n[t].exports;var i=n[t]={i:t,l:!1,exports:{}};return e[t].call(i.exports,i,i.exports,s),i.l=!0,i.exports}s.m=e,s.c=n,s.d=function(e,n,t){s.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,n){if(1&n&&(e=s(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(s.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var i in e)s.d(t,i,function(n){return e[n]}.bind(null,i));return t},s.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(n,"a",n),n},s.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},s.p="",s(s.s=0)}([function(e,n,s){"use strict";s.r(n);const t=["client/48fe6c20a5c8690f63df/index.4.js","client/48fe6c20a5c8690f63df/login.5.js","client/48fe6c20a5c8690f63df/main.js","client/48fe6c20a5c8690f63df/market.7.js","client/48fe6c20a5c8690f63df/profile_$username.8.js","client/48fe6c20a5c8690f63df/signup.9.js","client/48fe6c20a5c8690f63df/vendors~index~login~market~profile_$username~signup.0.js","client/48fe6c20a5c8690f63df/vendors~index~login~profile_$username~signup.1.js","client/48fe6c20a5c8690f63df/vendors~index~profile_$username~signup.2.js","client/48fe6c20a5c8690f63df/vendors~index~signup.3.js","client/48fe6c20a5c8690f63df/vendors~profile_$username.10.js","client/vendors~index~login~profile_$username~signup.1.css","client/vendors~index~profile_$username~signup.2.css","client/vendors~index~signup.3.css","client/vendors~profile_$username.10.css"].concat(["service-worker-index.html","favicon.ico","fonts/Metropolis-Regular.otf","fonts/Roboto-Bold.ttf","fonts/Roboto-Medium.ttf","fonts/Roboto-Regular.ttf","images/404.png","images/500.png","images/_icons.scss","images/add_icon.svg","images/appsco-ally.png","images/delete_icon.svg","images/down_icon.svg","images/edit_icon.svg","images/feature-device-1.png","images/feature-device-2.png","images/feature-ss-1.png","images/feature-ss-2.png","images/innomake-ally.png","images/landing-main-banner.png","images/location_icon.svg","images/logo-192.png","images/mail_icon.svg","images/mail_white_icon.svg","images/market-main-banner.png","images/mintic-ally.png","images/next_icon.svg","images/previous_icon.svg","images/profile_icon.svg","images/submit_loader.gif","images/tel_icon.svg","images/tel_white_icon.svg","images/upload_icon.svg","images/verified_icon.svg","images/white_wordmark.png","manifest.json","styles/button.css","styles/form.css","styles/global.css","styles/icons.css"]),i=new Set(t);self.addEventListener("install",e=>{e.waitUntil(caches.open("cache1603418861222").then(e=>e.addAll(t)).then(()=>{self.skipWaiting()}))}),self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(async e=>{for(const n of e)"cache1603418861222"!==n&&await caches.delete(n);self.clients.claim()}))}),self.addEventListener("fetch",e=>{if("GET"!==e.request.method||e.request.headers.has("range"))return;const n=new URL(e.request.url);n.protocol.startsWith("http")&&(n.hostname===self.location.hostname&&n.port!==self.location.port||(n.host===self.location.host&&i.has(n.pathname)?e.respondWith(caches.match(e.request)):"only-if-cached"!==e.request.cache&&e.respondWith(caches.open("offline1603418861222").then(async n=>{try{const s=await fetch(e.request);return n.put(e.request,s.clone()),s}catch(s){const t=await n.match(e.request);if(t)return t;throw s}}))))})}]);