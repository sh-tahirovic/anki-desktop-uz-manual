
(function(){
var R=document.documentElement.dataset.root||'';
var tb=document.getElementById('theme');
function setT(t){document.documentElement.dataset.theme=t;try{localStorage.setItem('th',t)}catch(e){}tb.textContent=t==='dark'?'☀':'☾'}
tb.onclick=function(){setT(document.documentElement.dataset.theme==='dark'?'light':'dark')};setT(document.documentElement.dataset.theme);
document.getElementById('menu').onclick=function(){document.body.classList.toggle('menu')};
var inp=document.getElementById('q'),res=document.getElementById('res'),sel=-1;
function norm(s){return s.toLowerCase().replace(/[ʻʼ'’`‘]/g,'')}
function esc(s){return s.replace(/[&<>]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;'}[c]})}
function run(){
 var q=norm(inp.value).trim();if(!q){res.className='res';return}
 var terms=q.split(/\s+/),out=[];
 (window.IDX||[]).forEach(function(p){
  var t=norm(p.t),x=norm(p.x),s=0,ok=true;
  terms.forEach(function(w){var a=t.indexOf(w),b=x.indexOf(w);if(a<0&&b<0)ok=false;s+=(a>=0?10:0)+(b>=0?1:0)});
  if(!ok)return;
  var i=x.indexOf(terms[0]);var sn='';
  if(i>=0){var st=Math.max(0,i-50);sn=esc(p.x.substr(st,150));}else sn=esc(p.x.substr(0,120));
  out.push({p:p,s:s,sn:(st>0?'…':'')+sn});
 });
 out.sort(function(a,b){return b.s-a.s});out=out.slice(0,8);
 res.innerHTML=out.length?out.map(function(o){return '<a href="'+R+o.p.u+'"><b>'+esc(o.p.t)+'</b><span>'+o.sn+'</span></a>'}).join(''):'<div class="none">Hech narsa topilmadi</div>';
 res.className='res on';sel=-1;
}
inp.oninput=run;inp.onfocus=run;
document.addEventListener('click',function(e){if(!e.target.closest('.search'))res.className='res'});
document.addEventListener('keydown',function(e){
 if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();inp.focus();inp.select()}
 if(e.key==='Escape'){res.className='res';inp.blur()}
 var as=res.querySelectorAll('a');
 if(document.activeElement===inp&&as.length){
  if(e.key==='ArrowDown'){e.preventDefault();sel=Math.min(sel+1,as.length-1)}
  else if(e.key==='ArrowUp'){e.preventDefault();sel=Math.max(sel-1,0)}
  else if(e.key==='Enter'&&sel>=0){e.preventDefault();location.href=as[sel].href}
  as.forEach(function(a,i){a.classList.toggle('sel',i===sel)});
 }
});
var links=[].slice.call(document.querySelectorAll('aside.toc a'));
if(links.length){
 var hs=links.map(function(a){return document.getElementById(a.getAttribute('href').slice(1))});
 function spy(){var y=window.scrollY+140,k=0;hs.forEach(function(h,i){if(h&&h.offsetTop<=y)k=i});links.forEach(function(a,i){a.classList.toggle('on',i===k)})}
 window.addEventListener('scroll',spy,{passive:true});spy();
}
})();
