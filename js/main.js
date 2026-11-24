/* OneStop Cooling: page behaviour. All settings live in config.js. Chinese text is in i18n.js. */
(() => {
  const S = window.SITE || {};
  const L = window.I18N;
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const esc = (t) => String(t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const money = (n) => '$' + n;
  const zh = () => L.lang === 'zh';
  const hasWa = !!S.whatsappNumber;
  const waLink = (msg) => `https://wa.me/${S.whatsappNumber}?text=${encodeURIComponent(msg || '')}`;
  const setWa = (a, msg) => { a.href = waLink(msg); a.target = '_blank'; a.rel = 'noopener'; a.hidden = false; };
  const MAX = 5;
  const fromPrice = Math.min(...S.servicing.map(s => s.prices[0]));

  /* ---------- The remote (state survives a language switch) ---------- */
  const SERVICES = [
    { id: 'servicing', name: 'Normal service', list: S.servicing, legend: 'Aircon type' },
    { id: 'overhaul', name: 'Chemical overhaul', list: S.overhaul, legend: 'Aircon size' }
  ];
  const st = { service: 0, model: 0, units: 1, cbd: false };
  let focusId = null, lastPose = 'right', lastSay = '';

  // Seven-segment LCD digits, drawn as shapes
  const H = (x, y) => `${x},${y} ${x + 4},${y - 4} ${x + 26},${y - 4} ${x + 30},${y} ${x + 26},${y + 4} ${x + 4},${y + 4}`;
  const V = (x, y) => `${x},${y} ${x + 4},${y + 4} ${x + 4},${y + 28} ${x},${y + 32} ${x - 4},${y + 28} ${x - 4},${y + 4}`;
  const SEG = [H(6, 6), V(37, 7), V(37, 41), H(6, 74), V(5, 41), V(5, 7), H(6, 40)];
  const ON = ['012345', '12', '01346', '01236', '1256', '02356', '023456', '012', '0123456', '012356'];
  const DIGIT = '<svg viewBox="0 0 42 80">' + SEG.map(p => `<polygon class="seg" points="${p}"/>`).join('') + '</svg>';
  const showDigits = (n) => {
    const box = $('#lcd-digits'), str = String(n).padStart(Math.max(3, String(n).length), ' ');
    if (box.children.length !== str.length) box.innerHTML = DIGIT.repeat(str.length);
    [...box.children].forEach((svg, i) => {
      const on = str[i] === ' ' ? '' : ON[+str[i]];
      [...svg.children].forEach((s, j) => s.classList.toggle('on', on.includes(j)));
    });
  };
  $('#lcd-icons').innerHTML = '<svg viewBox="0 0 30 18"><rect x="1.500" y="1.500" width="27" height="10" rx="2.500"/><path d="M6 8h18M8 15v1.500M15 15v1.500M22 15v1.500"/></svg>'.repeat(MAX);

  const keys = (box, name, items, sel, onPick) => {
    box.innerHTML = items.map((t, i) =>
      `<label class="key"><input type="radio" name="${name}" id="${name}-${i}" value="${i}"${i === sel ? ' checked' : ''}><span>${esc(t)}</span></label>`).join('');
    box.querySelectorAll('input').forEach(inp => inp.addEventListener('change', () => { focusId = inp.id; onPick(+inp.value); }));
  };

  const calc = () => {
    const svc = SERVICES[st.service], m = svc.list[st.model], n = st.units, rows = [];
    let total;
    if (svc.id === 'overhaul') {
      const base = m.price * n, off = (S.overhaulDiscount || [])[n - 1] || 0;
      total = Math.round(base * (1 - off / 100));
      rows.push([n > 1 ? (zh() ? `${L.units(n)} × ${money(m.price)}` : `${L.units(n)} at ${money(m.price)} each`) : L.units(n), money(base)]);
      if (off) rows.push([zh() ? `多台优惠（${off}%）` : `Multi-unit discount (${off}%)`, '-' + money(base - total)]);
    } else {
      total = m.prices[n - 1];
      rows.push([L.units(n), money(total)]);
      if (st.cbd) { total += S.cbdSurcharge; rows.push([L.t('CBD surcharge'), '+' + money(S.cbdSurcharge)]); }
    }
    if (rows.length > 1 || n > 1) rows.push([L.t('Total'), money(total)]);
    return { svc, m, n, rows, total };
  };

  // One pose per unit count, in a different order for each aircon type, so every press moves the cat
  const POSES = [['right', 'present', 'up', 'idle', 'thumbs'], ['present', 'up', 'idle', 'right', 'idle']];

  const catSays = ({ svc, m, n }, pressed) => {
    if (svc.id === 'overhaul') return n > 1 ? (zh() ? `${n}台，每台${money(m.price)}。` : `${n} units at ${money(m.price)} each.`) : zh() ? '整台拆开，用化学药水洗盘管。' : 'Unit taken apart, coil washed with chemicals.';
    if (pressed === 'cbd' && st.cbd) return zh() ? `CBD地址加${money(S.cbdSurcharge)}。` : `CBD adds ${money(S.cbdSurcharge)}.`;
    if (n === 1) return zh() ? '家里有几台？按加号。' : 'How many at home? Press plus.';
    const each = m.prices[n - 1] / n, about = Number.isInteger(each) ? '' : (zh() ? '约' : 'about ');
    return zh() ? `${n}台，每台${about}$${Math.round(each)}。` : `${n} units. That’s ${about}$${Math.round(each)} each.`;
  };

  const drawRemote = (pressed) => {
    const svc0 = SERVICES[st.service];
    if (st.model >= svc0.list.length) st.model = 0;
    keys($('#est-service'), 'est-service', SERVICES.map(x => L.t(x.name)), st.service, i => { st.service = i; st.model = 0; drawRemote(true); });
    keys($('#est-model'), 'est-model', svc0.list.map(x => L.t(x.label)), st.model, i => { st.model = i; drawRemote(true); });
    $('#est-model-legend').textContent = L.t(svc0.legend);
    $('#est-cbd-wrap').hidden = svc0.id !== 'servicing';
    $('#est-cbd').checked = st.cbd;
    $('#u-count').textContent = st.units;
    $('#u-minus').disabled = st.units <= 1;
    $('#u-plus').disabled = st.units >= MAX;
    if (focusId && pressed) { const f = document.getElementById(focusId); if (f) f.focus({ preventScroll: true }); }

    const c = calc(), { svc, m, n, rows, total } = c;
    showDigits(total);
    $('#lcd-service').textContent = L.t(svc.name);
    $('#lcd-model').textContent = L.t(m.label);
    $('#lcd-units').textContent = L.units(n);
    $$('#lcd-icons svg').forEach((s, i) => s.classList.toggle('on', i < n));
    const line = [L.t(svc.name), L.t(m.label), L.units(n)].join(zh() ? '，' : ', ');
    $('#est-line').textContent = line;
    $('#est-math').innerHTML = rows.map(r => `<div><dt>${esc(r[0])}</dt><dd>${esc(r[1])}</dd></div>`).join('');
    if (pressed) $('#est-live').textContent = `${line}: ${money(total)}`;

    const pose = svc.id === 'overhaul' ? (n === MAX ? 'present' : 'work') : st.cbd && pressed === 'cbd' ? (lastPose === 'idle' ? 'present' : 'idle') : POSES[st.model ? 1 : 0][n - 1];
    const say = catSays(c, pressed);
    const sayEl = $('#say');
    sayEl.textContent = say;
    $$('#poses img').forEach(im => im.classList.toggle('on', im.dataset.pose === pose));
    if (pressed && (pose !== lastPose || say !== lastSay)) {
      [sayEl, ...(pose !== lastPose ? $$('#poses img.on') : [])].forEach(el => { el.classList.remove('pop'); void el.offsetWidth; el.classList.add('pop'); });
    }
    lastPose = pose; lastSay = say;

    if (hasWa) setWa($('#est-wa'), zh()
      ? `你好 ${S.name}，我想预约：${line}${svc.id === 'servicing' && st.cbd ? '，CBD地址' : ''}（网站价格 ${money(total)}）。`
      : `Hi ${S.name}, I'd like to book: ${line}${svc.id === 'servicing' && st.cbd ? ', CBD address' : ''} (website price ${money(total)}).`);
  };

  const step = (d, id) => { st.units = Math.max(1, Math.min(MAX, st.units + d)); focusId = null; drawRemote(true); const b = document.getElementById(id); if (b.disabled) document.getElementById(d > 0 ? 'u-minus' : 'u-plus').focus({ preventScroll: true }); };

  /* ---------- Everything that comes from config.js (safe to re-run) ---------- */
  const row = (a, b) => `<li><span>${esc(a)}</span><b>${esc(b)}</b></li>`;
  const from = (n) => zh() ? `${money(n)}起` : `from ${money(n)}`;
  const fill = () => {
    $$('[data-tel]').forEach(a => { a.href = 'tel:+' + S.phoneIntl; });
    $$('[data-phone-text]').forEach(el => { el.textContent = S.phoneDisplay.replace(/ /g, ' '); });
    if (hasWa) $$('[data-wa]').forEach(a => setWa(a, zh() && S.whatsappMessageZh ? S.whatsappMessageZh : S.whatsappMessage));
    $$('[data-hours]').forEach(el => { el.textContent = L.t(S.hours); });
    $$('[data-hours-wrap]').forEach(el => { el.hidden = !S.hoursConfirmed; });
    $$('[data-address]').forEach(el => { el.textContent = S.address; });
    $$('[data-since]').forEach(el => { el.textContent = S.since; });
    $$('[data-from]').forEach(el => { el.textContent = money(fromPrice); });

    const map = $('[data-map]');
    if (map && S.mapQuery) {
      const src = `https://www.google.com/maps?q=${encodeURIComponent(S.mapQuery)}&z=16&output=embed&hl=${zh() ? 'zh-CN' : 'en'}`;
      if (map.getAttribute('src') !== src) map.src = src;
    }
    $$('[data-map-link]').forEach(a => { a.href = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(S.mapQuery); });

    /* Hero price ladder: each row sets the remote to that many units */
    $('#ladder').innerHTML = S.servicing[0].prices.map((p, i) =>
      `<li><a href="#estimate" data-units="${i + 1}"><span>${L.units(i + 1)}</span><b>${money(p)}</b></a></li>`).join('');

    const pr = S.servicing[0].prices, each = Math.round(pr[MAX - 1] / MAX), exact = pr[MAX - 1] % MAX === 0;
    $('#hero-say').textContent = zh() ? `${MAX}台，每台${exact ? '' : '约'}${money(each)}` : `${MAX} units: ${exact ? '' : 'about '}${money(each)} each`;

    $('#tbl-servicing').innerHTML =
      `<thead><tr><th scope="col">${esc(L.t('Units'))}</th>${S.servicing.map(o => `<th scope="col">${esc(L.t(o.label))}</th>`).join('')}</tr></thead><tbody>` +
      S.servicing[0].prices.map((_, i) => `<tr><th scope="row">${L.units(i + 1)}</th>${S.servicing.map(o => `<td>${money(o.prices[i])}</td>`).join('')}</tr>`).join('') + '</tbody>';
    $('#pl-overhaul').innerHTML = S.overhaul.map(o => row(L.t(o.label), money(o.price))).join('');
    $('#pl-gas').innerHTML = S.gas.map(g => row(g.name, L.t(g.price))).join('');
    $('#pl-addons').innerHTML = S.addons.map(a => row(L.t(a.name), L.t(a.price))).join('') + (S.transport ? row(L.t('Transport for an inspection visit') + (S.transportCovered ? ' (' + L.t('covered by the service') + ')' : ''), money(S.transport)) : '');
    $$('[data-cbd]').forEach(el => { el.textContent = money(S.cbdSurcharge); });
    $$('[data-cbd-add]').forEach(el => { el.textContent = '(+' + money(S.cbdSurcharge) + ')'; });

    const tags = {
      servicing: from(fromPrice),
      overhaul: from(Math.min(...S.overhaul.map(o => o.price))),
      visit: zh() ? `交通费 ${money(S.transport)}` : `${money(S.transport)} transport`
    };
    $$('[data-tag]').forEach(el => { el.textContent = tags[el.dataset.tag]; });

    if (hasWa && S.problems && S.problems.length) {
      $('#probs').innerHTML = S.problems.map(p => {
        const msg = zh() ? `你好 ${S.name}，我的冷气有问题：${L.t(p)}。` : `Hi ${S.name}, my aircon has a problem: ${p.toLowerCase()}.`;
        return `<li><a href="${esc(waLink(msg))}" target="_blank" rel="noopener">${esc(L.t(p))}</a></li>`;
      }).join('');
      $('#probs-wrap').hidden = false;
    }

    /* Areas + reviews: each section stays hidden until real content is added */
    if (S.areas && S.areas.length) {
      $('#areas-list').innerHTML = S.areas.map(a => `<li>${esc(a)}</li>`).join('');
      $('#areas').hidden = false;
    }
    if (S.reviews && S.reviews.length) {
      $('#reviews-list').innerHTML = S.reviews.map(r => `<figure><blockquote>${esc(r.text)}</blockquote><figcaption>${esc(r.name)}${zh() ? '，' : ', '}${esc(L.t('Google review'))}</figcaption></figure>`).join('');
      $('#reviews').hidden = false;
    }
    drawRemote(false);
  };

  /* ---------- Events ---------- */
  const render = () => { L.apply(); fill(); };
  $('#u-minus').addEventListener('click', () => step(-1, 'u-minus'));
  $('#u-plus').addEventListener('click', () => step(1, 'u-plus'));
  $('#est-cbd').addEventListener('change', e => { st.cbd = e.target.checked; focusId = null; drawRemote('cbd'); });
  $('#ladder').addEventListener('click', e => {
    const a = e.target.closest('[data-units]');
    if (!a) return;
    st.service = 0; st.model = 0; st.units = +a.dataset.units; focusId = null; drawRemote(true);
  });
  $('#lang').addEventListener('click', () => { L.lang = zh() ? 'en' : 'zh'; focusId = null; render(); });
  L.init();
  render();
})();
