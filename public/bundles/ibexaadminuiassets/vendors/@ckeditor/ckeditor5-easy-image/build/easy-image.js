/*!
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */
window.CKEditor5=window.CKEditor5||{},window.CKEditor5.easyImage=function(e){var t={};function r(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,r),i.l=!0,i.exports}return r.m=e,r.c=t,r.d=function(e,t,o){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(o,i,function(t){return e[t]}.bind(null,i));return o},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=4)}([function(e,t,r){e.exports=r(1)("./src/core.js")},function(e,t){e.exports=CKEditor5.dll},function(e,t,r){e.exports=r(1)("./src/upload.js")},function(e,t,r){e.exports=r(1)("./src/utils.js")},function(e,t,r){"use strict";r.r(t),r.d(t,"EasyImage",(function(){return u})),r.d(t,"CloudServicesUploadAdapter",(function(){return a}));var o=r(0),i=r(3),n=r(2);class a extends o.Plugin{static get pluginName(){return"CloudServicesUploadAdapter"}static get requires(){return["CloudServices",n.FileRepository]}init(){const e=this.editor,t=e.plugins.get("CloudServices"),r=t.token,o=t.uploadUrl;r&&(this._uploadGateway=e.plugins.get("CloudServicesCore").createUploadGateway(r,o),e.plugins.get(n.FileRepository).createUploadAdapter=e=>new l(this._uploadGateway,e))}}class l{constructor(e,t){this.uploadGateway=e,this.loader=t}upload(){return this.loader.file.then(e=>(this.fileUploader=this.uploadGateway.upload(e),this.fileUploader.on("progress",(e,t)=>{this.loader.uploadTotal=t.total,this.loader.uploaded=t.uploaded}),this.fileUploader.send()))}abort(){this.fileUploader.abort()}}class u extends o.Plugin{static get requires(){return[a,"ImageUpload"]}init(){const e=this.editor;e.plugins.has("ImageBlockEditing")||e.plugins.has("ImageInlineEditing")||Object(i.logWarning)("easy-image-image-feature-missing",e)}static get pluginName(){return"EasyImage"}}}]);