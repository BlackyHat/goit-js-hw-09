!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},o={},n=e.parcelRequired7c6;null==n&&((n=function(e){if(e in t)return t[e].exports;if(e in o){var n=o[e];delete o[e];var i={id:e,exports:{}};return t[e]=i,n.call(i.exports,i,i.exports),i.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){o[e]=t},e.parcelRequired7c6=n);var i=n("h6c0i");i.Notify.init({useIcon:!1});var r={form:document.querySelector(".form")};function a(e,t){return new Promise((function(o,n){setTimeout((function(){var i=Math.random()>.3,r={position:e,delay:t};i?o(r):n(r)}),t)}))}r.form.addEventListener("click",(function(e){if(e.preventDefault(),"submit"===e.target.type){e.target.toggleAttribute("disabled");for(var t=Number(r.form.delay.value),o=Number(r.form.step.value),n=Number(r.form.amount.value),u=1;u<=n;u+=1)a(u,t).then((function(e){var t=e.position,o=e.delay;i.Notify.success("✅ Fulfilled promise ".concat(t," in ").concat(o,"ms"))})).catch((function(e){var t=e.position,o=e.delay;i.Notify.failure("❌ Rejected promise ".concat(t," in ").concat(o,"ms"))})),t+=o;setTimeout((function(){e.target.toggleAttribute("disabled")}),t)}}))}();
//# sourceMappingURL=03-promises.63f355f0.js.map