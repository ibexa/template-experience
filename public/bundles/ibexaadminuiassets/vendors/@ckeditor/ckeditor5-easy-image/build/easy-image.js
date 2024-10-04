/*!
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */(()=>{var e={704:(e,t,r)=>{e.exports=r(79)("./src/core.js")},448:(e,t,r)=>{e.exports=r(79)("./src/upload.js")},209:(e,t,r)=>{e.exports=r(79)("./src/utils.js")},79:e=>{"use strict";e.exports=CKEditor5.dll}},t={};function r(o){var a=t[o];if(void 0!==a)return a.exports;var i=t[o]={exports:{}};return e[o](i,i.exports,r),i.exports}r.d=(e,t)=>{for(var o in t)r.o(t,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var o={};(()=>{"use strict";r.r(o),r.d(o,{CloudServicesUploadAdapter:()=>i,EasyImage:()=>l});var e=r(704),t=r(209),a=r(448);class i extends e.Plugin{static get pluginName(){return"CloudServicesUploadAdapter"}static get requires(){return["CloudServices",a.FileRepository]}init(){const e=this.editor,t=e.plugins.get("CloudServices"),r=t.token,o=t.uploadUrl;if(!r)return;const i=e.plugins.get("CloudServicesCore");this._uploadGateway=i.createUploadGateway(r,o),e.plugins.get(a.FileRepository).createUploadAdapter=e=>new s(this._uploadGateway,e)}}class s{constructor(e,t){this.uploadGateway=e,this.loader=t}upload(){return this.loader.file.then((e=>(this.fileUploader=this.uploadGateway.upload(e),this.fileUploader.on("progress",((e,t)=>{this.loader.uploadTotal=t.total,this.loader.uploaded=t.uploaded})),this.fileUploader.send())))}abort(){this.fileUploader.abort()}}class l extends e.Plugin{static get pluginName(){return"EasyImage"}static get requires(){return[i,"ImageUpload"]}init(){const e=this.editor;e.plugins.has("ImageBlockEditing")||e.plugins.has("ImageInlineEditing")||(0,t.logWarning)("easy-image-image-feature-missing",e)}}})(),(window.CKEditor5=window.CKEditor5||{}).easyImage=o})();