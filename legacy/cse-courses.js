/* CSE Courses page interactions */
(function(){
var tabs=Array.prototype.slice.call(document.querySelectorAll('.filter-tab'));
var cards=Array.prototype.slice.call(document.querySelectorAll('#catalog-grid .course-card'));
var search=document.getElementById('catalog-search');
var count=document.getElementById('catalog-count');
var empty=document.getElementById('catalog-empty');
var featSearch=document.getElementById('featured-search');
var featItems=Array.prototype.slice.call(document.querySelectorAll('#featured-grid .featured-item'));
var featEmpty=document.getElementById('featured-empty');
var active='All';
function apply(){
var q=(search&&search.value||'').toLowerCase().trim();
var shown=0;
cards.forEach(function(c){
var sem=c.getAttribute('data-semester');
var title=c.getAttribute('data-title')||c.textContent.toLowerCase();
var okSem=(active==='All'||sem===active);
var okQ=(!q||title.indexOf(q)>-1);
var show=okSem&&okQ;
c.style.display=show?'':'none';
if(show)shown++;
});
if(count)count.textContent='Showing '+shown+' of '+cards.length+' courses';
if(empty){empty.classList.toggle('hidden',shown>0);empty.style.display=shown?'none':'block';}
}
tabs.forEach(function(t){
t.addEventListener('click',function(){
tabs.forEach(function(x){x.setAttribute('aria-selected','false');});
t.setAttribute('aria-selected','true');
active=t.getAttribute('data-filter');
apply();
});
});
if(search)search.addEventListener('input',apply);
document.querySelectorAll('[data-goto-filter]').forEach(function(a){
a.addEventListener('click',function(){
var f=a.getAttribute('data-goto-filter');
var target=tabs.filter(function(x){return x.getAttribute('data-filter')===f;})[0];
if(target)target.click();
});
});
if(featSearch)featSearch.addEventListener('input',function(){
var q=featSearch.value.toLowerCase().trim();
var shown=0;
featItems.forEach(function(el){
var ok=!q||el.textContent.toLowerCase().indexOf(q)>-1;
el.style.display=ok?'':'none';
if(ok)shown++;
});
if(featEmpty){featEmpty.classList.toggle('hidden',shown>0);featEmpty.style.display=shown?'none':'block';}
});
apply();
// menu toggle (mirror index)
var toggle=document.querySelector('.menu-toggle');
var nav=document.getElementById('site-nav');
if(toggle&&nav)toggle.addEventListener('click',function(){
var open=nav.classList.toggle('is-open');
toggle.setAttribute('aria-expanded',open?'true':'false');
});
// apply dialog + toast
var dlg=document.getElementById('apply-dialog');
var courseInput=document.getElementById('apply-course');
var sub=document.getElementById('apply-sub');
var form=document.getElementById('apply-form');
var closeBtn=document.getElementById('close-apply-btn');
var toasts=document.getElementById('toast-container');
function toast(msg){
if(!toasts)return;
var d=document.createElement('div');
d.className='toast';
d.textContent=msg;
toasts.appendChild(d);
setTimeout(function(){d.remove();},3200);
}
document.querySelectorAll('[data-apply]').forEach(function(b){
b.addEventListener('click',function(){
var c=b.getAttribute('data-apply');
if(courseInput)courseInput.value=c;
if(sub)sub.textContent='Apply for '+c+' — Rs. 885 incl. GST.';
if(dlg&&dlg.showModal)dlg.showModal();
});
});
if(closeBtn)closeBtn.addEventListener('click',function(){if(dlg)dlg.close();});
if(form)form.addEventListener('submit',function(e){
e.preventDefault();
if(dlg)dlg.close();
toast('Application submitted for '+(courseInput?courseInput.value:'course')+'.');
form.reset();
});
})();
