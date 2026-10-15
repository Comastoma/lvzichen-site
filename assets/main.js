/* ==========================================================================
   吕子琛 · 个人网站 —— 交互脚本（原生 JS，无依赖）
   1. 移动端导航开合
   2. 作品筛选
   3. 滚动入场动效
   4. 联系表单（无后端时退化为 mailto，保证一定能发出邮件）
   ========================================================================== */
(function () {
  'use strict';

  /* ---------- 1. 移动端导航 ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- 2. 作品筛选 ---------- */
  var filterBar = document.querySelector('.filters');
  if (filterBar) {
    var works = Array.prototype.slice.call(document.querySelectorAll('.work'));
    var counter = document.getElementById('work-count');
    filterBar.addEventListener('click', function (e) {
      var btn = e.target.closest('button[data-filter]');
      if (!btn) return;
      var key = btn.dataset.filter;
      filterBar.querySelectorAll('button').forEach(function (b) {
        b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
      });
      var shown = 0;
      works.forEach(function (w) {
        var hit = key === 'all' || w.dataset.category === key;
        w.hidden = !hit;
        if (hit) shown++;
      });
      if (counter) counter.textContent = String(shown).padStart(2, '0');
    });
  }

  /* ---------- 3. 滚动入场 ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('is-in');
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- 4. 联系表单 ---------- */
  var form = document.querySelector('form[data-form]');
  if (form) {
    var status = form.querySelector('.form-status');
    form.addEventListener('submit', function (e) {
      var action = form.getAttribute('action') || '';
      // 未接入后端（Formspree 等）时，退化为调用本机邮件客户端，避免表单点了没反应
      if (action.indexOf('formspree') === -1 && action.indexOf('http') !== 0) {
        e.preventDefault();
        var name = (form.elements.name || {}).value || '';
        var from = (form.elements.email || {}).value || '';
        var msg = (form.elements.message || {}).value || '';
        var subject = encodeURIComponent('来自个人网站的留言 · ' + name);
        var body = encodeURIComponent(msg + '\n\n——\n' + name + '\n' + from);
        window.location.href = 'mailto:comastoma@qq.com?subject=' + subject + '&body=' + body;
        if (status) status.textContent = '已唤起你的邮件客户端，直接发送即可。';
        return;
      }
      // 已接入后端：走 fetch 无刷新提交
      e.preventDefault();
      var data = new FormData(form);
      if (status) status.textContent = '正在发送…';
      fetch(action, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
        .then(function (r) {
          if (!r.ok) throw new Error('bad status');
          form.reset();
          if (status) status.textContent = '已发送，我会尽快回复。';
        })
        .catch(function () {
          if (status) status.textContent = '发送失败，可以直接邮件联系：comastoma@qq.com';
        });
    });
  }

  /* ---------- 页脚年份 ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
