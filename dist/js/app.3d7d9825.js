(function(){"use strict";var e={2808:function(e,t,r){var a=r(6369),s=function(){var e=this,t=e._self._c;return t("div",[t("div",[t("nav",[t("ul",[t("li",[t("router-link",{attrs:{to:"/"}},[e._v("Главная")])],1),t("li",[t("router-link",{attrs:{to:"/admin"}},[e._v("Панель администратора")])],1)])]),t("router-view")],1),t("h1",[e._v("Arnau")]),t("form",{on:{submit:function(t){return t.preventDefault(),e.submitForm.apply(null,arguments)}}},[t("div",[t("label",[e._v("Марка:")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.carBrand,expression:"carBrand"}],attrs:{type:"text",required:""},domProps:{value:e.carBrand},on:{input:function(t){t.target.composing||(e.carBrand=t.target.value)}}})]),t("div",[t("label",[e._v("Гос номер:")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.carNumber,expression:"carNumber"}],attrs:{type:"text",required:""},domProps:{value:e.carNumber},on:{input:function(t){t.target.composing||(e.carNumber=t.target.value)}}})]),t("div",[t("label",[e._v("Мойщик:")]),t("select",{directives:[{name:"model",rawName:"v-model",value:e.selectedWasher,expression:"selectedWasher"}],on:{change:function(t){var r=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.selectedWasher=t.target.multiple?r:r[0]}}},e._l(e.washers,(function(r){return t("option",{key:r,domProps:{value:r}},[e._v(" "+e._s(r)+" ")])})),0)]),t("div",[t("label",[e._v("Дата:")]),e._v(" "+e._s(e.currentDate)+" ")]),t("Multiselect",{attrs:{options:e.uslugi,multiple:!0,"track-by":"_id",label:"name",placeholder:"Выберите услуги"},model:{value:e.selectedUslugiObjects,callback:function(t){e.selectedUslugiObjects=t},expression:"selectedUslugiObjects"}}),t("div",[t("label",[e._v("Вид кузова:")]),t("select",{directives:[{name:"model",rawName:"v-model",value:e.carType,expression:"carType"}],on:{change:function(t){var r=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.carType=t.target.multiple?r:r[0]}}},[t("option",{attrs:{value:"Легковая"}},[e._v("Легковая")]),t("option",{attrs:{value:"Универсал"}},[e._v("Универсал")]),t("option",{attrs:{value:"S class"}},[e._v("S class")]),t("option",{attrs:{value:"Кроссовер"}},[e._v("Кроссовер")]),t("option",{attrs:{value:"Минивен"}},[e._v("Минивен")]),t("option",{attrs:{value:"Внедорожник"}},[e._v("Внедорожник")])])]),t("div",[e._v("Итоговая стоимость: "+e._s(e.totalPrice)+" tg.")]),t("div",[t("label",[e._v("Способ оплаты:")]),e._l(e.paymentMethods,(function(r){return t("div",{key:r},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.selectedPaymentMethod,expression:"selectedPaymentMethod"}],attrs:{type:"radio"},domProps:{value:r,checked:e._q(e.selectedPaymentMethod,r)},on:{change:function(t){e.selectedPaymentMethod=r}}}),e._v(" "+e._s(r)+" ")])}))],2),"Раздельный"===e.selectedPaymentMethod?t("div",[t("label",[e._v("Наличные:")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.cashPayment,expression:"cashPayment"}],attrs:{type:"number"},domProps:{value:e.cashPayment},on:{input:function(t){t.target.composing||(e.cashPayment=t.target.value)}}}),t("label",[e._v("Перевод:")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.transferPayment,expression:"transferPayment"}],attrs:{type:"number"},domProps:{value:e.transferPayment},on:{input:function(t){t.target.composing||(e.transferPayment=t.target.value)}}}),t("label",[e._v("QR:")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.qrPayment,expression:"qrPayment"}],attrs:{type:"number"},domProps:{value:e.qrPayment},on:{input:function(t){t.target.composing||(e.qrPayment=t.target.value)}}})]):e._e(),t("button",{attrs:{type:"submit"}},[e._v("Добавить")]),e.successMessage?t("div",{staticClass:"success-message"},[e._v(" "+e._s(e.successMessage)+" ")]):e._e(),e.errorMessage?t("div",{staticClass:"error-message"},[e._v(" "+e._s(e.errorMessage)+" ")]):e._e()],1),t("div",[t("h2",[e._v("История заказов")]),t("table",[e._m(0),t("tbody",e._l(e.formattedOrderHistory,(function(r){return t("tr",{key:r._id},[t("td",[e._v(e._s(r.carBrand))]),t("td",[e._v(e._s(r.carNumber))]),t("td",[e._v(e._s(r.carType))]),t("td",[e._v(e._s(r.uslugi.join(", ")))]),t("td",[e._v(e._s(r.totalPrice)+" tg")]),t("td",[e._v(e._s(r.date))]),t("td",[e._v(e._s(r.washer))]),t("td",[e._v(" "+e._s("Раздельный"===r.paymentMethod?`Наличные: ${r.cashPayment} tg, Перевод: ${r.transferPayment} tg, QR: ${r.qrPayment} tg`:r.paymentMethod)+" ")])])})),0)])])])},n=[function(){var e=this,t=e._self._c;return t("thead",[t("tr",[t("th",[e._v("Марка")]),t("th",[e._v("Гос номер")]),t("th",[e._v("Тип кузова")]),t("th",[e._v("Услуги")]),t("th",[e._v("Итоговая стоимость")]),t("th",[e._v("Дата")]),t("th",[e._v("Мойщик")]),t("th",[e._v("Способ оплаты")])])])}],o=r(4161),i=r(396),l=r.n(i),c={components:{Multiselect:l()},data(){return{carBrand:"",carNumber:"",carType:"",uslugi:[],selectedUslugi:[],selectedPrice:0,totalPrice:0,selectedUslugiObjects:[],successMessage:"",errorMessage:"",orderHistory:[],selectedWasher:"",washers:["Мойщик 1","Мойщик 2","Мойщик 3"],selectedPaymentMethod:"",paymentMethods:["Наличные","Перевод","QR","Раздельный"],cashPayment:0,transferPayment:0,qrPayment:0,currentDate:(new Date).toISOString().substr(0,10)}},watch:{selectedUslugiObjects:"calculateTotalPrice",carType:"calculateTotalPrice"},computed:{selectedUslugiIds(){return this.selectedUslugiObjects.map((e=>e._id))},formattedOrderHistory(){return this.orderHistory.map((e=>({...e,uslugi:e.uslugi.map((e=>{const t=this.uslugi.find((t=>t._id===e));return t?t.name:"Неизвестная услуга"}))})))}},methods:{isValidSplitPayment(){const e=parseFloat(this.cashPayment)+parseFloat(this.transferPayment)+parseFloat(this.qrPayment);return console.log("Total split payment:",e),console.log("Total price:",this.totalPrice),e===this.totalPrice},async loadOrderHistory(){try{const e=await o.Z.get("http://localhost:3001/orders");this.orderHistory=e.data}catch(e){console.error("Ошибка при загрузке истории заказов:",e)}},submitForm(){"Раздельный"!==this.selectedPaymentMethod||this.isValidSplitPayment()?o.Z.post("http://localhost:3001/add",{carBrand:this.carBrand,carNumber:this.carNumber,carType:this.carType,uslugi:this.selectedUslugiIds,totalPrice:this.totalPrice,washer:this.selectedWasher,paymentMethod:this.selectedPaymentMethod,cashPayment:this.cashPayment,transferPayment:this.transferPayment,qrPayment:this.qrPayment,date:this.currentDate}).then((e=>{console.log("Данные успешно добавлены:",e.data),this.successMessage="Запись успешно добавлена!",this.errorMessage=""})).catch((e=>{console.error("Ошибка при добавлении данных:",e.message),this.errorMessage="Ошибка при добавлении данных!",this.successMessage=""})):this.errorMessage="Сумма раздельных платежей не соответствует итоговой стоимости!"},calculateTotalPrice(){let e=0;this.selectedUslugiIds.forEach((t=>{const r=this.uslugi.find((e=>e._id===t));r&&r.prices[this.carType]&&(e+=r.prices[this.carType])})),this.totalPrice=e}},async mounted(){console.log(this.uslugi);try{const e=await o.Z.get("http://localhost:3001/uslugi");this.uslugi=e.data,console.log("All available uslugi IDs:",this.uslugi.map((e=>e._id))),this.loadOrderHistory()}catch(e){console.error("Ошибка при получении списка услуг:",e)}}},u=c,d=r(1001),m=(0,d.Z)(u,s,n,!1,null,"7cb7d725",null),v=m.exports;a.ZP.config.productionTip=!1,new a.ZP({render:e=>e(v)}).$mount("#app")}},t={};function r(a){var s=t[a];if(void 0!==s)return s.exports;var n=t[a]={exports:{}};return e[a].call(n.exports,n,n.exports,r),n.exports}r.m=e,function(){var e=[];r.O=function(t,a,s,n){if(!a){var o=1/0;for(u=0;u<e.length;u++){a=e[u][0],s=e[u][1],n=e[u][2];for(var i=!0,l=0;l<a.length;l++)(!1&n||o>=n)&&Object.keys(r.O).every((function(e){return r.O[e](a[l])}))?a.splice(l--,1):(i=!1,n<o&&(o=n));if(i){e.splice(u--,1);var c=s();void 0!==c&&(t=c)}}return t}n=n||0;for(var u=e.length;u>0&&e[u-1][2]>n;u--)e[u]=e[u-1];e[u]=[a,s,n]}}(),function(){r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,{a:t}),t}}(),function(){r.d=function(e,t){for(var a in t)r.o(t,a)&&!r.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}}(),function(){r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={143:0};r.O.j=function(t){return 0===e[t]};var t=function(t,a){var s,n,o=a[0],i=a[1],l=a[2],c=0;if(o.some((function(t){return 0!==e[t]}))){for(s in i)r.o(i,s)&&(r.m[s]=i[s]);if(l)var u=l(r)}for(t&&t(a);c<o.length;c++)n=o[c],r.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return r.O(u)},a=self["webpackChunkmy_car_wash_app"]=self["webpackChunkmy_car_wash_app"]||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))}();var a=r.O(void 0,[998],(function(){return r(2808)}));a=r.O(a)})();
//# sourceMappingURL=app.3d7d9825.js.map