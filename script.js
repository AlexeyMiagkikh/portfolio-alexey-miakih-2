// === Тема при загрузке (учёт системной) ===
(function () {
  const saved = localStorage.getItem('theme');
  const initial = saved || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  document.documentElement.setAttribute('data-theme', initial);
})();

// === Год в футере ===
const y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();

// === Навигация / бургер ===
const nav = document.querySelector('.nav');
const burger = document.getElementById('burger');
const menu = document.getElementById('nav-menu');
const brand = document.querySelector('.brand');
function setOpen(open){ if(!nav||!burger)return; nav.classList.toggle('open', open); burger.setAttribute('aria-expanded', String(open)); }
if (burger) burger.addEventListener('click', ()=>setOpen(!nav.classList.contains('open')));
if (menu) menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setOpen(false)));
document.addEventListener('keydown',e=>{ if(e.key==='Escape') setOpen(false); });
document.addEventListener('click',e=>{ if(nav && nav.classList.contains('open') && !nav.contains(e.target)) setOpen(false); });
if (brand) brand.addEventListener('click',e=>{ e.preventDefault(); window.scrollTo({top:0,behavior:'smooth'}); setOpen(false); });

// === Переключатель темы ===
const root = document.documentElement;
const toggleBtn = document.getElementById('theme-toggle');
function syncThemeBtn(theme){ if(!toggleBtn)return; toggleBtn.textContent = theme==='light'?'🌙':'☀️'; toggleBtn.setAttribute('aria-label', theme==='light'?'Включить тёмную тему':'Включить светлую тему'); toggleBtn.setAttribute('aria-pressed', theme==='light'?'true':'false'); }
function setTheme(theme){ root.setAttribute('data-theme', theme); localStorage.setItem('theme', theme); syncThemeBtn(theme); }
syncThemeBtn(root.getAttribute('data-theme')||'dark');
if (toggleBtn) toggleBtn.addEventListener('click',()=>{ const cur=root.getAttribute('data-theme')||'dark'; setTheme(cur==='dark'?'light':'dark'); });

// === Приветствие (поле ввода) ===
const greetingText = document.getElementById('greeting-text');
const nameInput = document.getElementById('name-input');
const saveBtn = document.getElementById('save-name');
const clearBtn = document.getElementById('clear-name');
const KEY='username';
function cap(v){ v=(v||'').trim(); return v? v[0].toUpperCase()+v.slice(1):''; }
function render(n){ if(greetingText) greetingText.textContent = n?`Здравствуйте, ${n}! 👋`:'Добро пожаловать!'; }
(function initGreeting(){ const s=localStorage.getItem(KEY)||''; if(nameInput) nameInput.value=s; render(s); })();
function persist(){ if(!nameInput) return; const v=cap(nameInput.value); v?localStorage.setItem(KEY,v):localStorage.removeItem(KEY); render(v); }
if (nameInput){ nameInput.addEventListener('input',()=>render(cap(nameInput.value))); nameInput.addEventListener('keydown',e=>{ if(e.key==='Enter'){ e.preventDefault(); persist(); }}); nameInput.addEventListener('blur',persist); }
if (saveBtn) saveBtn.addEventListener('click',persist);
if (clearBtn) clearBtn.addEventListener('click',()=>{ if(!nameInput) return; nameInput.value=''; localStorage.removeItem(KEY); render(''); nameInput.focus(); });

// === (Опционально) Виджет цитат без alert ===
// смогу включить по желанию — сейчас не добавляю, чтобы сохранить чистый вид хедера/геро.
