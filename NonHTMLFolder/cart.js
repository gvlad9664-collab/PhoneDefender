(function(){
var B=document.currentScript.src.replace(/[^\/]*$/,"");
var PR={glass:["Захисне скло для iPhone",300,"glass.png"],case:["Захисний чохол на iPhone",240,"case.png"],camera:["Захисні шари для камери iPhone",300,"camera.png"],privacy:["Захисне скло анти-шпигун на iPhone",260,"privacy.png"],clearcase:["Протиударний прозорий чохол на iPhone",280,"clearcase.png"]};
var K="pdcart:";
function load(){
 try{if(window.name.indexOf(K)==0)return JSON.parse(window.name.slice(K.length))}catch(e){}
 try{return JSON.parse(localStorage.getItem("pd_cart")||"{}")}catch(e){}
 return {}}
function save(c){var j=JSON.stringify(c);
 try{window.name=K+j}catch(e){}
 try{localStorage.setItem("pd_cart",j)}catch(e){}}
function count(c){var n=0;for(var k in c)n+=c[k];return n}
function badge(b){var e=document.getElementById("cc");if(!e)return;e.textContent=count(load());if(b){e.classList.remove("bump");void e.offsetWidth;e.classList.add("bump")}}
function toast(t){var d=document.createElement("div");d.className="toast";d.textContent=t;document.body.appendChild(d);setTimeout(function(){d.classList.add("out")},2200);setTimeout(function(){d.remove()},2700)}
function add(id){var c=load();c[id]=(c[id]||0)+1;save(c);badge(1);toast("✔ "+PR[id][0]+" — додано в кошик")}
function money(n){return n+" грн"}
function render(){
 var app=document.getElementById("cartapp");if(!app)return;
 var c=load(),ids=Object.keys(c).filter(function(k){return PR[k]&&c[k]>0});
 if(!ids.length){app.innerHTML='<div class="empty"><div class="bigemo">🛒</div><p>Кошик порожній</p><a class="btn" href="catalog.html">Перейти до каталогу</a></div>';return}
 var sum=0,rows=ids.map(function(k,i){var p=PR[k],q=c[k];sum+=p[1]*q;
  return '<div class="crow" style="animation-delay:'+i*80+'ms"><a href="product-'+k+'.html"><img src="'+B+p[2]+'" alt=""></a><div class="cn"><a href="product-'+k+'.html">'+p[0]+'</a>'+
  '<div class="cp"><span class="old">'+money(p[1])+'</span> <span class="disc">(-100%)</span> = <b class="zero">0 грн</b></div></div>'+
  '<div class="qty"><button data-a="dec" data-id="'+k+'">−</button><span>'+q+'</span><button data-a="inc" data-id="'+k+'">+</button></div>'+
  '<button class="del" data-a="del" data-id="'+k+'" title="Видалити">✕</button></div>'}).join("");
 app.innerHTML=rows+'<div class="sum"><div>Сума без знижки: <s>'+money(sum)+'</s></div><div>Знижка: <b>-100%</b></div><div class="tot">До сплати: <b>0 грн</b></div></div>'+
 '<form id="ord" class="ord"><h2>Оформлення замовлення</h2><input required placeholder="Ім\'я та прізвище"><input required type="tel" placeholder="Телефон"><input required placeholder="Місто, відділення пошти / адреса"><button class="btn lg" type="submit">✔ Підтвердити замовлення</button></form>';
 document.getElementById("ord").onsubmit=function(e){e.preventDefault();done(sum)};
}
function done(sum){
 save({});badge(1);render();
 var o=document.createElement("div");o.className="ov";
 var conf="";for(var i=0;i<46;i++)conf+='<i style="left:'+Math.random()*100+'%;background:hsl('+Math.random()*360+',85%,60%);animation-delay:'+Math.random()*.8+'s;animation-duration:'+(2+Math.random()*2)+'s"></i>';
 o.innerHTML='<div class="confetti">'+conf+'</div><div class="modal"><svg viewBox="0 0 52 52" class="ck"><circle cx="26" cy="26" r="24"/><path d="M14 27l8 8 16-17"/></svg><h2>Дякуємо за покупку!</h2><p>Замовлення № '+(100000+Math.floor(Math.random()*900000))+' прийнято.<br>До сплати: <b>0 грн</b> (тестове замовлення). Ми скоро зв\'яжемося з вами.</p><a class="btn lg" href="'+B+'../index.html">На головну</a> <button class="btn ghost lg" id="cl">Закрити</button></div>';
 document.body.appendChild(o);
 function close(){o.classList.add("out");setTimeout(function(){o.remove()},350)}
 o.querySelector("#cl").onclick=close;o.onclick=function(e){if(e.target===o)close()};
}
document.addEventListener("click",function(e){
 var t=e.target.closest("[data-id]");if(!t)return;var id=t.getAttribute("data-id");
 if(t.classList.contains("add")){add(id);t.classList.remove("pop");void t.offsetWidth;t.classList.add("pop");return}
 var a=t.getAttribute("data-a");if(!a)return;var c=load();
 if(a=="inc")c[id]++;else if(a=="dec"){c[id]--;if(c[id]<1)delete c[id]}else delete c[id];
 save(c);badge(1);render();
});
badge(0);render();
var els=document.querySelectorAll(".reveal");
if("IntersectionObserver" in window){var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target)}})},{threshold:.1});els.forEach(function(x,i){x.style.transitionDelay=(i%5)*70+"ms";io.observe(x)})}else els.forEach(function(x){x.classList.add("in")});
var r=document.querySelectorAll('.slider input'),n=0;
if(r.length)setInterval(function(){n=(n+1)%r.length;r[n].checked=true},5000);
})();
