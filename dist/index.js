!function(e,t){if("function"==typeof define&&define.amd)define(["exports"],t);else if("undefined"!=typeof exports)t(exports);else{var n={};t(n),e.index=n}}(this,function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.render=function t(e){var n=e.el,r=e.attributes,o=e.children,s=void 0;s=r&&r.showLabel?new n(null,!0):new n;var i=[];return r&&("string"==typeof r.class&&(i=r.class.split(" ")),r.onClick&&"function"==typeof r.onClick&&s.addEventListener("select",r.onClick),r.onKeyPress&&"function"==typeof r.onKeyPress&&s.addEventListener("keypress",r.onKeyPress),r.src&&"string"==typeof r.src&&"function"==typeof s.setSrc&&s.setSrc(r.src),r.ref&&"function"==typeof r.ref&&r.ref(s),r.background&&"function"==typeof s.setBackgroundImage&&s.setBackgroundImage(r.background)),o&&o.forEach(function(e){if("string"==typeof e||"number"==typeof e){if("function"!=typeof s.setText)throw new TypeError("You're trying to set text content on a non-Label element");s.setText(e.toString())}else s.setContent?s.setContent(t(e)):s.appendChildWidget(t(e))}),i.forEach(function(e){return s.addClass(e)}),s},e.taljsx=function(e,t){for(var n=arguments.length,r=Array(2<n?n-2:0),o=2;o<n;o++)r[o-2]=arguments[o];var s;return{el:e,attributes:t,children:r.length?(s=[]).concat.apply(s,r):null}}});