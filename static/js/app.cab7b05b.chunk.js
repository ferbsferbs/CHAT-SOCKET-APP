(this.webpackJsonp=this.webpackJsonp||[]).push([[0],{142:function(e,n,t){"use strict";t.d(n,"a",(function(){return v}));t(147);var r,o=t(1),c=t.n(o),a=t(4),i=t(113),s=t.n(i),u=t(85),f=t(95),l=t(136),d=t.n(l),p=null==f.a?"NULL_":f.a.replace(/[^\w\s]/gi,"_");function g(){Object(o.useEffect)((function(){(r=d.a.connect("//maraton-leer.sytes.net:3003")).on("message",(function(e){e.user._id!=p&&a((function(n){return u.a.append(n,e)}))})),r.on("getAll",(function(e){console.warn(e)}))}),[]);var e=Object(o.useState)([]),n=s()(e,2),t=n[0],a=n[1];Object(o.useEffect)((function(){a([])}),[]);var i=Object(o.useCallback)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];a((function(n){return u.a.append(n,e)})),r.emit("message",e)}),[]);return c.a.createElement(u.a,{messages:t,onSend:function(e){return i(e)},user:{_id:p}})}function v(){return c.a.createElement(g,null)}p+="Web";a.a.create({container:{flex:1,backgroundColor:"#fff",alignItems:"center",justifyContent:"center"}})},145:function(e,n,t){t(146),e.exports=t(190)},146:function(e,n){"serviceWorker"in navigator&&window.addEventListener("load",(function(){navigator.serviceWorker.register("/CHAT-SOCKET-APP/expo-service-worker.js",{scope:"/CHAT-SOCKET-APP/"}).then((function(e){})).catch((function(e){console.info("Failed to register service-worker",e)}))}))}},[[145,1,2]]]);
//# sourceMappingURL=app.cab7b05b.chunk.js.map