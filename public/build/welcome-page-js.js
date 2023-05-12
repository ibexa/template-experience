(self["webpackChunk"] = self["webpackChunk"] || []).push([["welcome-page-js"],{

/***/ "./assets/js/welcome.page.js":
/*!***********************************!*\
  !*** ./assets/js/welcome.page.js ***!
  \***********************************/
/***/ (() => {

(function (global, doc) {
  var btnDown = doc.querySelector('.ibexa-welcome-header__go-down');
  btnDown.addEventListener('click', function () {
    var header = doc.querySelector('.ibexa-welcome-header');
    global.scrollTo({
      top: header.offsetHeight,
      behavior: 'smooth'
    });
  });
})(window, document);

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./assets/js/welcome.page.js"));
/******/ }
]);