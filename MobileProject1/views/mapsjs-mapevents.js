H.util.eval("function si(a){var b=a.ownerDocument,b=b.documentElement||b.body.parentNode||b.body;a=a.getBoundingClientRect();return{x:a.left+(\"number\"===typeof window.pageXOffset?window.pageXOffset:b.scrollLeft),y:a.top+(\"number\"===typeof window.pageYOffset?window.pageYOffset:b.scrollTop)}}var ti=Function(\"return this\")();function ui(a,b,c,d,e,f,g){ui.a.constructor.call(this,a);this.pointers=b;this.changedPointers=c;this.targetPointers=d;this.currentPointer=e;this.originalEvent=g;this.target=f}u(ui,dc);q(\"H.mapevents.Event\",ui);function vi(a,b,c,d,e,f){if(isNaN(a))throw Error(\"x needs to be a number\");if(isNaN(b))throw Error(\"y needs to be a number\");if(isNaN(c))throw Error(\"pointer must have an id\");this.viewportX=a;this.viewportY=b;this.target=null;this.id=c;this.type=d;this.dragTarget=null;this.bj=this.button=e!==y?e:-1;this.buttons=f!==y?f:0}q(\"H.mapevents.Pointer\",vi);\nfunction wi(a,b,c){if(isNaN(b))throw Error(\"x needs to be a number\");if(isNaN(c))throw Error(\"y needs to be a number\");a.viewportX=b;a.viewportY=c}vi.prototype.wu=function(){return this.bj};vi.prototype.getLastChangedButton=vi.prototype.wu;function xi(a,b){a.bj=b;a.buttons|=vi.prototype.Po[+b]||0}function yi(a,b){a.bj=b;a.buttons&=~(vi.prototype.Po[+b]||0)}vi.prototype.Po=[1,4,2];var zi={NONE:-1,LEFT:0,MIDDLE:1,RIGHT:2};vi.Button=zi;function Ai(a){this.aa=a instanceof Array?a.slice(0):[]}m=Ai.prototype;m.clear=function(){this.aa.splice(0,this.aa.length)};m.length=function(){return this.aa.length};m.item=function(a){return this.aa[a]};m.indexOf=function(a){for(var b=this.aa.length;b--;)if(this.aa[b].id===a)return b;return-1};function Bi(a,b){var c=a.indexOf(b);return-1!==c?a.aa[c]:null}m.remove=function(a){a=this.indexOf(a);return-1!==a?this.aa.splice(a,1)[0]:null};\nfunction Ci(a,b){for(var c=a.aa.length,d=[];c--;)a.aa[c].type!==b&&d.push(a.aa[c]);a.aa=d}function Di(a,b){for(var c=a.aa.length;c--;)if(a.aa[c].dragTarget===b)return!0;return!1}m.push=function(a){if(a instanceof vi)return this.aa.push(a);throw Error(\"list needs a pointer\");};m.Yc=function(){return this.aa};m.i=function(){return new Ai(this.aa)};function Ei(a,b,c){c=c||{};if(!(a instanceof Q))throw Error(\"events: map instance required\");if(!(b instanceof Array))throw Error(\"events: map array required\");wb.call(this);this.nl=c.nl||300;this.Yo=c.Yo||50;this.ms=c.ms||50;this.ns=c.ns||500;this.xm=c.xm||900;this.Cq=c.Cq||50;this.map=a;this.o=this.map.o;this.element=this.o.element;this.zl=b;this.ha=new Ai;this.Ca=new Ai;this.Zd={};this.ea=null;this.Ji=!0;this.uh={};this.ph={};this.mh=null;this.Bg=v(this.Bg,this);this.Pt={pointerdown:this.Ht,pointermove:this.It,\npointerup:this.Jt,pointercancel:this.Gt};Fi(this)}u(Ei,wb);function Fi(a,b){for(var c,d,e=0,f=a.zl.length,e=0;e<f;e++)d=a.zl[e],c=d.B,\"function\"===typeof c&&(b?(d.target||a.element).removeEventListener(d.va,c):(d.target||a.element).addEventListener(d.va,c))}\nfunction Gi(a,b,c){var d,e=a.Pt[b],f,g;if(\"function\"===typeof e)for(\"pointermove\"!==b&&(a.Ji=!0),f=0,g=a.Ca.length();f<g;f++)b=a.Ca.item(f),a.element.contains(c.target)?(d=a,d=d.ea===b?b.target:0<=b.viewportX&&b.viewportX<d.o.width&&0<=b.viewportY&&b.viewportY<d.o.height?d.map.Zg(b.viewportX,b.viewportY)||d.map:null):d=null,Hi(b.id,a.uh),e.call(a,b,d,c);a.Ca.clear()}m=Ei.prototype;\nm.Jt=function(a,b,c){a.target=b;Ii(this,a,c);Ji(this,b,\"pointerup\",c,a);\"mouse\"!==a.type&&Ji(this,b,\"pointerleave\",c,a);b=this.Zd[a.id];var d={x:a.viewportX,y:a.viewportY},e=c.timeStamp,f=a.target,g=this.mh;b&&b.target===f&&b.Rk.distance(d)<this.ms&&e-b.$n<this.ns?(Ji(this,f,\"tap\",c,a),g&&g.target===f&&e-g.$n<this.nl?g.Rk.distance({x:a.viewportX,y:a.viewportY})<this.Yo&&(Ji(this,f,\"dbltap\",c,a),this.mh=null):this.mh={target:f,Rk:new D(a.viewportX,a.viewportY),$n:c.timeStamp}):this.mh=null;this.Zd=\n{};Hi(a.id,this.ph)};function Ii(a,b,c){b===a.ea&&(Ji(a,b.dragTarget,\"dragend\",c,b),a.ea=null,Hi(b.id,a.uh));b.dragTarget=null}m.Bg=function(a,b){var c=this;Ji(this,a.dragTarget,\"drag\",b,a);Hi(a.id,this.uh);this.uh[a.id]=setTimeout(function(){c.Bg(a,b)},150)};function Hi(a,b){b[a]&&(clearTimeout(b[a]),delete b[a])}\nfunction Ki(a,b,c){var d=b.target,e=new D(b.viewportX,b.viewportY),f=b.id;Hi(f,a.ph);a.ph[f]=setTimeout(function(){d&&d===b.target&&e.distance({x:b.viewportX,y:b.viewportY})<a.Cq&&(Ji(a,d,\"longpress\",c,b),delete a.Zd[b.id])},a.xm)}\nm.It=function(a,b,c){var d=a.dragTarget,e=a.id,f;f=a.target;a.target=b;f!==b&&(Ji(this,f,\"pointerleave\",c,a),Ji(this,b,\"pointerenter\",c,a));d?this.ea?this.Bg(a,c):this.Ji?this.Ji=!1:(this.ea=a,Ji(this,d,\"dragstart\",c,a),this.Bg(a,c),delete this.Zd[e],this.Ji=!0):(!this.ea||this.ea&&this.ea.dragTarget!==b&&this.ea.dragTarget!==this.map)&&Ji(this,b,\"pointermove\",c,a)};\nm.Ht=function(a,b,c){var d=!(/^(?:mouse|pen)$/.test(a.type)&&0!==c.button),e;b&&(a.target=b,this.Zd[a.id]={Rk:new D(a.viewportX,a.viewportY),target:a.target,$n:c.timeStamp},\"mouse\"!==a.type&&Ji(this,b,\"pointerenter\",c,a),e=Ji(this,b,\"pointerdown\",c,a),!this.ea&&d&&(b.draggable&&!Di(this.ha,b)?a.dragTarget=b:!this.map.draggable||e.defaultPrevented||Di(this.ha,this.map)||(a.dragTarget=this.map)),Ki(this,a,c))};\nm.Gt=function(a,b,c){a.target=null;b?(Ji(this,b,\"pointerleave\",c,a),Ji(this,b,\"pointercancel\",c,a)):Ji(this,this.map,\"pointercancel\",c,a);Ii(this,a,c);this.Zd={};Hi(a.id,this.ph)};function Ji(a,b,c,d,e){var f;if(b&&\"function\"===typeof b.dispatchEvent){f=ui;var g=a.ha.Yc(),h=a.Ca.Yc();a=a.ha;var k,l=a.aa.length,n=[];for(k=0;k<l;k++)a.aa[k].target===b&&n.push(a.aa[k]);f=new f(c,g,h,n,e,b,d);e.button=/^(?:longpress|(?:dbl)?tap|pointer(?:down|up))$/.test(c)?e.bj:zi.NONE;b.dispatchEvent(f)}return f}\nm.d=function(){Fi(this,!0);this.ha.clear();this.Ca.clear();var a=this.uh,b;for(b in a)Hi(b,a);var a=this.ph,c;for(c in a)Hi(c,a);this.ea=this.Zd=this.mh=this.map=this.Ca=this.ha=this.zl=this.Y=null;wb.prototype.d.call(this)};function Li(a){this.lf=v(this.lf,this);Ei.call(this,a,[{va:\"touchstart\",B:this.lf},{va:\"touchmove\",B:this.lf},{va:\"touchend\",B:this.lf},{va:\"touchcancel\",B:this.lf}]);this.ss={touchstart:\"pointerdown\",touchmove:\"pointermove\",touchend:\"pointerup\",touchcancel:\"pointercancel\"};this.bq=(a=(a=a.ac)?a.e():null)?Array.prototype.slice.call(a.querySelectorAll(\"a\"),0):[]}u(Li,Ei);\nLi.prototype.lf=function(a){var b=a.touches,c=this.ha.length(),d;if(\"touchstart\"===a.type&&c>=b.length){c=this.ha.i();for(d=b.length;d--;)c.remove(b[d].identifier);for(d=c.length();d--;)this.ha.remove(c.item(d).id);this.Ca=c;Gi(this,\"pointercancel\",a);this.Ca.clear()}if(this.ss[a.type]){b=si(this.o.element);c=a.type;d=a.changedTouches;var e=d.length,f,g,h,k,l,n;this.Ca.clear();for(n=0;n<e;n++)if(h=d[n],l=Bi(this.ha,h.identifier),f=h.pageX-b.x,g=h.pageY-b.y,l)if(\"touchmove\"===c){if(h=Math.abs(l.viewportX-\nf),k=Math.abs(l.viewportY-g),1<h||1<k||1===h&&1===k)wi(l,f,g),this.Ca.push(l)}else\"touchend\"===c&&(this.ha.remove(l.id),this.Ca.push(l),yi(l,zi.LEFT));else l=new vi(f,g,h.identifier,\"touch\",zi.LEFT,1),this.ha.push(l),this.Ca.push(l);Gi(this,this.ss[a.type],a);-1===this.bq.indexOf(a.target)&&a.preventDefault()}};Li.prototype.d=function(){this.bq=null;Ei.prototype.d.call(this)};function Mi(a){var b=[],b=Ni(this);(navigator.pointerEnabled||navigator.msPointerEnabled)&&b.push({va:\"MSHoldVisual\",B:\"prevent\"});Ei.call(this,a,b)}u(Mi,Ei);function Ni(a){var b=navigator.pointerEnabled,c,d,e=[];a.cm=v(a.cm,a);\"MSPointerDown MSPointerMove MSPointerUp MSPointerCancel MSPointerOut MSPointerOver\".split(\" \").forEach(function(f){c=f.toLowerCase().replace(/ms/g,\"\");d=b?c:f;e.push({va:d,B:a.cm,target:\"MSPointerUp\"===f||\"MSPointerMove\"===f?window:null})});return e}\nvar Oi={2:\"touch\",3:\"pen\",4:\"mouse\"};Mi.prototype.kl=function(a,b){var c;c=a.pointerType;\"number\"===typeof c&&(c=Oi[c]);c=new vi(b.x,b.y,a.pointerId,c,a.button,a.buttons);this.ha.push(c);return c};\nMi.prototype.cm=function(a){var b=navigator.sw?a.type:a.type.toLowerCase().replace(/ms/g,\"\"),c=si(this.element),d=Bi(this.ha,a.pointerId),e=a.pageX-c.x,c=a.pageY-c.y,f=Oi[a.pointerType]||a.pointerType;d||b in{pointerup:1,pointerout:1,pointercancel:1}||\"touch\"===f&&\"pointerdown\"!==b||(d=this.kl(a,{x:e,y:c}));d&&(b in{pointerup:1,pointercancel:1}?(\"touch\"===f&&this.ha.remove(d.id),yi(d,a.button)):\"pointerdown\"===b&&(\"touch\"===a.pointerType&&(Ci(this.ha,\"mouse\"),Ci(this.ha,\"pen\")),xi(d,a.button)),this.Ca.push(d),\n\"pointermove\"!==b?(wi(d,e,c),Gi(this,\"pointerout\"===b||\"pointerover\"===b?\"pointermove\":b,a)):d.viewportX===e&&d.viewportY===c||a.target===document.documentElement||(wi(d,e,c),Gi(this,b,a)));this.Ca.clear()};function Pi(a,b,c,d){Pi.a.constructor.call(this,\"contextmenu\");this.items=[];this.viewportX=a;this.viewportY=b;this.target=c;this.originalEvent=d}u(Pi,dc);q(\"H.mapevents.ContextMenuEvent\",Pi);function Qi(a){this.$l=v(this.$l,this);this.bm=v(this.bm,this);this.am=v(this.am,this);this.Lj=!1;this.Xe=-1;this.rq=0;Qi.a.constructor.call(this,a,[{va:\"contextmenu\",B:this.$l},{target:a,va:\"longpress\",B:this.bm},{target:a,va:\"dbltap\",B:this.am}])}u(Qi,Ei);m=Qi.prototype;m.bm=function(a){var b=a.currentPointer;\"touch\"===b.type&&1===a.pointers.length&&Ri(this,b.viewportX,b.viewportY,a.originalEvent,a.target)};m.am=function(a){\"touch\"===a.currentPointer.type&&(this.rq=Date.now())};\nm.$l=function(a){var b=this;-1===this.Xe?this.Xe=setTimeout(function(){var c=si(b.element),d=a.pageX-c.x,c=a.pageY-c.y;b.Xe=-1;Ri(b,d,c,a)},this.nl):(clearInterval(this.Xe),this.Xe=-1);a.preventDefault()};function Ri(a,b,c,d,e){var f=a.map;e=e||f.Zg(b,c)||f;var g=Date.now()-a.rq;!a.Lj&&g>a.xm&&(a.Lj=!0,e.dispatchEvent(new Pi(b,c,e,d)),lg(f.e(),a.qo,a.bp,!1,a))}m.qo=[\"mousedown\",\"touchstart\",\"pointerdown\",\"wheel\"];\nm.bp=function(){this.Lj&&(this.Lj=!1,this.map.dispatchEvent(new dc(\"contextmenuclose\",this.map)))};m.d=function(){var a=this.map.e();clearInterval(this.Xe);a&&ng(a,this.qo,this.bp,!1,this);Ei.prototype.d.call(this)};function Si(a,b,c,d,e){Si.a.constructor.call(this,\"wheel\");this.delta=a;this.viewportX=b;this.viewportY=c;this.target=d;this.originalEvent=e}u(Si,dc);q(\"H.mapevents.WheelEvent\",Si);function Ti(a){var b=\"onwheel\"in document;this.Ts=b;this.Qs=(b?\"d\":\"wheelD\")+\"elta\";this.dm=v(this.dm,this);Ti.a.constructor.call(this,a,[{va:(b?\"\":\"mouse\")+\"wheel\",B:this.dm}])}u(Ti,Ei);Ti.prototype.normalize=function(a,b,c){var d=this.Qs,e=a[d+(d+\"Y\"in a?\"Y\":\"\")],f,g,h;e&&(h=Math.abs,f=h(e),e=(!(g=a[d+\"X\"])||3<=f/h(g))&&(!(g=a[d+\"Z\"])||3<=f/h(g))?((0<e)-(0>e))*(this.Ts?1:-1):0);return new Si(e,b,c,null,a)};\nTi.prototype.dm=function(a){var b=si(this.element);a=this.normalize(a,a.pageX-b.x,a.pageY-b.y);a.delta&&(a.target=this.map.Ga(a.viewportX,a.viewportY)[0],a.target&&\"function\"===typeof a.target.dispatchEvent&&a.target.dispatchEvent(a),a.defaultPrevented||this.map.dispatchEvent(a))};function Ui(a){var b=window;this.Td=v(this.Td,this);Ei.call(this,a,[{va:\"mousedown\",B:this.Td},{va:\"mousemove\",B:this.Td,target:b},{va:\"mouseup\",B:this.Td,target:b},{va:\"mouseover\",B:this.Td},{va:\"mouseout\",B:this.Td},{va:\"dragstart\",B:this.Kj}])}u(Ui,Ei);Ui.prototype.kl=function(a,b){var c=new vi(b.x,b.y,1,\"mouse\");this.ha.push(c);return c};\nUi.prototype.Td=function(a){var b=a.type,c=si(this.element),d={x:a.pageX-c.x,y:a.pageY-c.y},c=this.ha.item(0)||this.kl(a,d);this.Ca.push(c);wi(c,d.x,d.y);/^mouse(?:move|over|out)$/.test(b)?Gi(this,\"pointermove\",a):(/^mouse(down|up)$/.test(b)&&(d=a.which-1,\"up\"===ti.RegExp.$1?yi(c,d):xi(c,d)),Gi(this,b.replace(\"mouse\",\"pointer\"),a));this.Ca.clear()};Ui.prototype.Kj=function(a){a.preventDefault()};function Vi(a){if(-1!==Wi.indexOf(a))throw Error(\"InvalidArgument: map is already in use\");this.b=a;Wi.push(a);this.To=this.Bs=this.Hm=this.Yn=null;navigator.msPointerEnabled||navigator.pointerEnabled?this.Yn=new Mi(this.b):(this.Yn=new Li(this.b),this.Hm=new Ui(this.b));this.Bs=new Ti(this.b);this.To=new Qi(this.b);this.b.Wc(this.f,this);wb.call(this)}u(Vi,wb);q(\"H.mapevents.MapEvents\",Vi);var Wi=[];\nVi.prototype.f=function(){this.b=null;this.Yn.f();this.Bs.f();this.To.f();this.Hm&&this.Hm.f();Wi.splice(Wi.indexOf(this.b),1);wb.prototype.f.call(this)};Vi.prototype.dispose=Vi.prototype.f;Vi.prototype.gu=function(){return this.b};Vi.prototype.getAttachedMap=Vi.prototype.gu;function Xi(a,b){if(-1!==Yi.indexOf(a))throw Error(\"InvalidArgument: events are already used\");var c=b||{},d;wb.call(this);this.b=d=a.b;this.Iv=a;Yi.push(a);this.b.draggable=!0;this.Ya=c.kinetics||{duration:600,ip:hg};this.lp=7;this.enable(c.enabled||this.lp);c=Q.EngineType;this.o=this.b.o;this.Je=this.o.element;this.J=this.b.J;this.hn=c.P2D;this.Je.style.msTouchAction=\"none\";this.Je.style.Sx=\"none\";d.addEventListener(\"dragstart\",this.Kj,!1,this);d.addEventListener(\"drag\",this.br,!1,this);d.addEventListener(\"dragend\",\nthis.cr,!1,this);d.addEventListener(\"wheel\",this.fr,!1,this);d.addEventListener(\"dbltap\",this.ar,!1,this);d.addEventListener(\"tap\",this.er,!1,this);d.addEventListener(\"pointermove\",this.or,!1,this);mg(this.Je,\"contextmenu\",this.$q,!1,this);a.Wc(this.f,this)}u(Xi,wb);q(\"H.mapevents.Behavior\",Xi);var Yi=[];Xi.prototype.Z=0;Xi.DRAGGING=1;Xi.WHEELZOOM=2;Xi.DBLTAPZOOM=4;m=Xi.prototype;\nm.Kj=function(a){var b=a.pointers;a=this.o;var c=b[0],b=b[1]||{};this.Z&1&&(a.startInteraction(17,this.Ya),a.interaction(c.viewportX,c.viewportY,b.viewportX,b.viewportY),this.Z&2&&this.mi(c.viewportX,c.viewportY))};m.br=function(a){var b=a.pointers[0],c=a.pointers[1]||{};this.Z&1&&(this.o.interaction(b.viewportX,b.viewportY,c.viewportX,c.viewportY),a.originalEvent.preventDefault())};m.cr=function(){this.Z&1&&this.o.endInteraction(!this.Ya)};\nm.mi=function(a,b){var c,d;this.tm&&(c=this.b.getZoom(),d=Math[0>this.tm?\"ceil\":\"floor\"](c),c!==d&&(this.tm=null,this.zoom(c,d,a,b)))};m.zoom=function(a,b,c,d){var e=+b-+a,f=this.b.J;if(isNaN(+a))throw Error(\"start zoom needs to be a number\");if(isNaN(+b))throw Error(\"to zoom needs to be a number\");0!==e&&(f.startControl(null,c,d),f.control(0,0,e/e*0.006),f.endControl(!0,function(a){a.zoom=b}))};\nm.fr=function(a){var b,c,d,e;this.Z&2&&(b=a.delta,c=this.b.getZoom(),e=Math[0>b?\"ceil\":\"floor\"](c-b),d=this.b,d.jb().type===this.hn?(this.zoom(c,e,a.viewportX,a.viewportY),this.tm=b):(c=this.b.J.vc(),c.fov+=16*b,d.J.Nc(c)),a.originalEvent.preventDefault())};m.er=function(a){a=a.currentPointer;this.hn!==this.b.jb().type&&(a=this.b.ze(a.viewportX,a.viewportY),this.b.J.Nc(a))};m.or=function(a){a=a.currentPointer;this.b.jb().setPointer(a.viewportX,a.viewportY)};\nm.ar=function(a){var b=a.currentPointer,c=this.b.getZoom(),d=a.currentPointer.type;this.hn===this.b.jb().type&&(a=\"mouse\"===d?0===a.originalEvent.button?-1:1:0<a.pointers.length?1:-1,a=Math[0>a?\"ceil\":\"floor\"](c-a),this.Z&4&&this.zoom(c,a,b.viewportX,b.viewportY))};m.$q=function(a){return this.Z&4?(a.preventDefault(),!1):!0};\nm.f=function(){var a=this.b;a&&(a.draggable=!1,a.removeEventListener(\"dragstart\",this.Kj,!1,this),a.removeEventListener(\"drag\",this.br,!1,this),a.removeEventListener(\"dragend\",this.cr,!1,this),a.removeEventListener(\"wheel\",this.fr,!1,this),a.removeEventListener(\"tap\",this.er,!1,this),a.removeEventListener(\"dbltap\",this.ar,!1,this),a.removeEventListener(\"pointermove\",this.or,!1,this),this.b=null);this.Je&&(this.Je.style.msTouchAction=\"\",ng(this.Je,\"contextmenu\",this.$q,!1,this),this.Je=null);this.Ya=\nthis.o=null;Yi.splice(Yi.indexOf(this.Iv),1);wb.prototype.f.call(this)};Xi.prototype.dispose=Xi.prototype.f;Xi.prototype.disable=function(a){this.o.endInteraction(!0);a?this.Z&a&&(this.Z-=a,a&1&&(this.b.draggable=!1)):(this.Z=0,this.b.draggable=!1)};Xi.prototype.disable=Xi.prototype.disable;Xi.prototype.enable=function(a){a?this.Z&a||(this.Z+=a,a&1&&(this.b.draggable=!0)):(this.Z=this.lp,this.b.draggable=!0)};Xi.prototype.enable=Xi.prototype.enable;\nXi.prototype.isEnabled=function(a){if(isNaN(a))throw Error(\"behavior: number required\");return!!(this.Z&a)};Xi.prototype.isEnabled=Xi.prototype.isEnabled;q(\"H.mapevents.buildInfo\",function(){return li(\"mapsjs-mapevents\",\"0.11.0\",\"e66a3ab\")});\n");