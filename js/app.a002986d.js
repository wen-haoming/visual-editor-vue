(function(e){function t(t){for(var o,c,a=t[0],i=t[1],l=t[2],f=0,d=[];f<a.length;f++)c=a[f],Object.prototype.hasOwnProperty.call(r,c)&&r[c]&&d.push(r[c][0]),r[c]=0;for(o in i)Object.prototype.hasOwnProperty.call(i,o)&&(e[o]=i[o]);s&&s(t);while(d.length)d.shift()();return u.push.apply(u,l||[]),n()}function n(){for(var e,t=0;t<u.length;t++){for(var n=u[t],o=!0,a=1;a<n.length;a++){var i=n[a];0!==r[i]&&(o=!1)}o&&(u.splice(t--,1),e=c(c.s=n[0]))}return e}var o={},r={app:0},u=[];function c(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.m=e,c.c=o,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)c.d(n,o,function(t){return e[t]}.bind(null,o));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/editor/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],i=a.push.bind(a);a.push=t,a=a.slice();for(var l=0;l<a.length;l++)t(a[l]);var s=i;u.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},"0583":function(e,t,n){"use strict";n("3384")},3384:function(e,t,n){},c492:function(e,t,n){},cd49:function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var o=n("7a23"),r={class:"app"};function u(e,t,n,u,c,a){var i=Object(o["M"])("visual-editor");return Object(o["D"])(),Object(o["i"])("div",r,[Object(o["m"])(i,{modelValue:e.jsonData,"onUpdate:modelValue":t[1]||(t[1]=function(t){return e.jsonData=t}),config:e.visualConfig},null,8,["modelValue","config"])])}n("4de4"),n("4160"),n("d81d"),n("159b");var c=n("5530");n("c492");function a(e){var t=e.component,n=e.left,o=e.top;return{top:o,left:n,componentKey:null===t||void 0===t?void 0:t.key,adjustPosition:!0,focus:!1}}function i(){var e=[],t={};return{componentList:e,componentMap:t,registry:function(n,o){var r=Object(c["a"])(Object(c["a"])({},o),{},{key:n});e.push(r),t[n]=r}}}function l(e,t){var n=Object(o["I"])(e());return Object(o["Y"])(e,(function(e){e!==n.value&&(n.value=e)})),{get value(){return n.value},set value(e){n.value!==e&&(n.value=e,t(e))}}}Object(o["n"])({props:{modelValue:{type:String}},emit:{"update:modelValue":function(e){return e}},setup:function(e,t){var n=l((function(){return e.modelValue}),(function(e){return t.emit("update:modelValue",e)}));return function(){return Object(o["m"])("div",null,[Object(o["l"])("自定义输入框"),Object(o["bb"])(Object(o["m"])("input",{type:"text","onUpdate:modelValue":function(e){return n.value=e}},null),[[o["W"],n.value]])])}}}),n("d3b7"),n("25f0");function s(e){return"function"===typeof e||"[object Object]"===Object.prototype.toString.call(e)&&!Object(o["s"])(e)}var f=Object(o["n"])({props:{block:{type:Object,requried:!0},config:{type:Object,required:!0}},setup:function(e){var t=Object(o["I"])({}),n=Object(o["g"])((function(){var t;return["visual-editor-block",{"visual-editor-block-focus":null===(t=e.block)||void 0===t?void 0:t.focus}]})),r=Object(o["g"])((function(){var t,n;return{top:"".concat(null===(t=e.block)||void 0===t?void 0:t.top,"px"),left:"".concat(null===(n=e.block)||void 0===n?void 0:n.left,"px")}}));return Object(o["A"])((function(){var n=e.block;if(!0===(null===n||void 0===n?void 0:n.adjustPosition)){var o=t.value,r=o.offsetWidth,u=o.offsetHeight;n.left=n.left-r/2,n.top=n.top-u/2,n.adjustPosition=!1}})),function(){var u=e.config.componentMap[e.block.componentKey],c=u.render();return Object(o["m"])("div",{class:n.value,style:r.value,ref:t},s(c)?c:{default:function(){return[c]}})}}});n("b0c0");function d(){var e=Object(o["H"])({current:-1,queue:[],commands:{}}),t=function(t){e.commands[t.name]=function(){var n=t.execute.apply(t,arguments),o=n.undo,r=n.redo;e.queue.push({undo:o,redo:r}),e.current+=1}};return t({name:"undo",keyboard:"ctrl+z",followQueue:!1,execute:function(){return{redo:function(){var t=e.current;if(-1!==t){var n=e.queue[t].undo;n&&n(),e.current-=1}},undo:function(){}}}}),{state:e,registry:t}}function v(){var e=d();return e.registry({name:"delete",keyboard:["backspace","delete","ctrl+d"],execute:function(){return console.log("执行删除命令"),{undo:function(){console.log("撤回删除")},redo:function(){console.log("重做删除")}}}}),{undo:function(){return e.state.commands.undo()},redo:function(){return e.state.commands.redo()}}}var p=Object(o["n"])({props:{modelValue:{type:Object,required:!0},config:{type:Object,required:!0}},emits:{"update:modelValue":function(e){return e}},setup:function(e,t){var n=l((function(){return e.modelValue}),(function(e){return t.emit("update:modelValue",e)})),r=Object(o["I"])({}),u=Object(o["g"])((function(){return{width:"".concat(n.value.container.width,"px"),height:"".concat(n.value.container.height,"px")}})),i=Object(o["g"])((function(){var e=[],t=[];return(n.value.blocks||[]).forEach((function(n){return(n.focus?e:t).push(n)})),{focus:e,unfocus:t}})),s={clearFoucs:function(e){var t=n.value.blocks||[];0!==t.length&&(t&&(t=t.filter((function(t){return t!==e}))),t.forEach((function(e){return e.focus=!1})))}},d=function(){var e=null,t={dragenter:function(e){e.dataTransfer&&(e.dataTransfer.dropEffect="move")},drageover:function(e){e.preventDefault()},dragleave:function(e){e.dataTransfer&&(e.dataTransfer.dropEffect="none")},drop:function(t){var o=n.value.blocks||[];o.push(a({component:e,left:t.offsetX,top:t.offsetY})),n.value=Object(c["a"])(Object(c["a"])({},n.value),{},{blocks:o})}},o={dragstart:function(n,o){console.log(n),r.value.addEventListener("dragenter",t.dragenter),r.value.addEventListener("dragover",t.drageover),r.value.addEventListener("dragleave",t.dragleave),r.value.addEventListener("drop",t.drop),e=o},dragend:function(n){console.log(n),r.value.removeEventListener("dragenter",t.dragenter),r.value.removeEventListener("dragover",t.drageover),r.value.removeEventListener("dragleave",t.dragleave),r.value.removeEventListener("drop",t.drop),e=null}};return o}(),p=function(){var e={startX:0,startY:0,starPos:[]},t=function(t){var n=t.clientX-e.startX,o=t.clientY-e.startY;i.value.focus.forEach((function(t,r){t.top=e.starPos[r].top+o,t.left=e.starPos[r].left+n}))},n=function e(){document.removeEventListener("mousemove",t),document.removeEventListener("mouseup",e)},o=function(o){e={startX:o.pageX,startY:o.pageY,starPos:i.value.focus.map((function(e){var t=e.top,n=e.left;return{top:t,left:n}}))},document.addEventListener("mousemove",t),document.addEventListener("mouseup",n)};return{mouseDown:o}}(),b=function(){return{container:{onMousedown:function(e){e.stopPropagation(),e.preventDefault(),s.clearFoucs()}},block:{onMousedown:function(e,t){e.stopPropagation(),e.preventDefault(),e.shiftKey?i.value.focus.length<=1?t.focus=!0:t.focus=!t.focus:t.focus||(t.focus=!0,s.clearFoucs(t)),p.mouseDown(e)}}}}(),m=v();m.undo,m.redo;return function(){return Object(o["m"])(o["b"],null,[Object(o["m"])("div",{class:"visual-editor"},[Object(o["m"])("div",{class:"visual-editor-menu"},[e.config.componentList.map((function(e){return Object(o["m"])("div",{class:"visual-editor-menu-item",draggable:!0,onDragstart:function(t){return d.dragstart(t,e)},onDragend:d.dragend},[Object(o["m"])("span",{class:"visual-editor-menu-item-label"},[e.label]),e.preview()])}))]),Object(o["m"])("div",{class:"visual-editor-head"},null),Object(o["m"])("div",{class:"visual-editor-operator"},[Object(o["l"])("operator")]),Object(o["m"])("div",{class:"visual-editor-body"},[Object(o["m"])("div",{class:"visual-editor-content"},[Object(o["m"])("div",Object(o["t"])({class:"visual-editor-container",style:u.value,ref:r},b.container),[n.value.blocks.map((function(t,n){return Object(o["m"])(f,Object(o["t"])({config:e.config,block:t,key:n},{onMousedown:function(e){b.block.onMousedown(e,t)}}),null)}))])])])])])}}}),b=n("3fd4"),m=i();m.registry("text",{label:"文本",preview:function(){return"预览文本"},render:function(){return"渲染文本"}}),m.registry("button",{label:"按钮",preview:function(){return Object(o["m"])(b["a"],null,{default:function(){return[Object(o["l"])("按钮")]}})},render:function(){return Object(o["m"])(b["a"],null,{default:function(){return[Object(o["l"])("渲染按钮")]}})}}),m.registry("input",{label:"输入框",preview:function(){return Object(o["m"])(b["b"],null,null)},render:function(){return Object(o["m"])(b["b"],null,null)}});var g=Object(o["n"])({name:"App",components:{VisualEditor:p},data:function(){return{visualConfig:m,jsonData:{container:{height:800,width:500},blocks:[{top:140,left:150,componentKey:"text",focus:!0},{top:100,left:30,componentKey:"button",focus:!0},{top:150,left:200,componentKey:"input",focus:!0}]}}}});n("0583");g.render=u;var j=g,O=(n("7dd6"),Object(o["h"])(j));O.use(b["c"]),O.mount("#app")}});
//# sourceMappingURL=app.a002986d.js.map