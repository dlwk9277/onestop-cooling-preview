/* OneStop Cooling: page behaviour. All settings live in config.js. English/Chinese text is in i18n.js. */
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

  /* ---------- Price estimator (state survives a language switch) ---------- */
  const SERVICES = [
    { id: 'servicing', name: 'Servicing', long: 'Standard servicing', list: S.servicing, legend: 'Aircon type' },
    { id: 'overhaul', name: 'Chemical overhaul', long: 'Chemical overhaul', list: S.overhaul, legend: 'Aircon size' }
  ];
  const st = { service: 0, model: 0, coils: 1, cbd: false };
  let focusId = null;

  const pills = (box, name, items, sel, onPick) => {
    box.innerHTML = items.map((t, i) =>
      `<label class="pill"><input type="radio" name="${name}" id="${name}-${i}" value="${i}"${i === sel ? ' checked' : ''}><span>${esc(t)}</span></label>`).join('');
    box.querySelectorAll('input').forEach(inp => inp.addEventListener('change', () => { focusId = inp.id; onPick(+inp.value); }));
  };

  const drawEstimator = () => {
    const est = $('#estimate');
    if (!est || !S.overhaul || !S.servicing) return;
    const svc = SERVICES[st.service];
    if (st.model >= svc.list.length) st.model = 0;
    pills($('#est-service'), 'est-service', SERVICES.map(x => L.t(x.name)), st.service, i => { st.service = i; st.model = 0; drawEstimator(); });
    pills($('#est-model'), 'est-model', svc.list.map(m => L.t(m.label)), st.model, i => { st.model = i; drawEstimator(); });
    pills($('#est-coils'), 'est-coils', [1, 2, 3, 4, 5].map(String), st.coils - 1, i => { st.coils = i + 1; drawEstimator(); });
    $('#est-model-legend').textContent = L.t(svc.legend);
    $('#est-cbd-wrap').hidden = svc.id !== 'servicing';
    $('#est-cbd').checked = st.cbd;
    if (focusId) { const f = document.getElementById(focusId); if (f) f.focus(); }

    const m = svc.list[st.model], n = st.coils, i = n - 1;
    const base = m.prices[0] * n, price = m.prices[i];
    const rows = [];
    let total = price;
    if (svc.id === 'overhaul' && base > price) {
      const off = S.overhaulDiscount && S.overhaulDiscount[i];
      rows.push([zh() ? `${L.coils(n)}，每个${money(m.prices[0])}` : `${L.coils(n)} at ${money(m.prices[0])} each`, money(base)]);
      rows.push([(zh() ? '多机优惠' : 'Multi-coil discount') + (off ? (zh() ? `（${off}%）` : ` (${off}%)`) : ''), '-' + money(base - price)]);
    } else {
      rows.push([L.coils(n), money(price)]);
    }
    if (svc.id === 'servicing' && st.cbd) {
      total += S.cbdSurcharge;
      rows.push([L.t('CBD surcharge'), '+' + money(S.cbdSurcharge)]);
    }
    const line = zh()
      ? `${L.t(svc.long)}，${L.t(m.label)}，${L.coils(n)}`
      : `${svc.long}, ${m.label}, ${L.coils(n)}`;
    $('#est-total').textContent = money(total);
    $('#est-line').textContent = line;
    $('#est-math').innerHTML = rows.map(r => `<div><dt>${esc(r[0])}</dt><dd>${esc(r[1])}</dd></div>`).join('');
    const wa = $('#est-wa');
    if (hasWa) {
      wa.href = waLink(zh()
        ? `你好 ${S.name}，我想预约：${line}（价目表合计 ${money(total)}）。`
        : `Hi ${S.name}, I'd like to book: ${line} (price list total ${money(total)}).`);
      wa.target = '_blank'; wa.rel = 'noopener'; wa.hidden = false;
    }
    est.hidden = false;
  };

  /* ---------- Everything that comes from config.js (safe to re-run) ---------- */
  const fill = () => {
    $$('[data-tel]').forEach(a => { a.href = 'tel:+' + S.phoneIntl; });
    $$('[data-phone-text]').forEach(el => { el.textContent = S.phoneDisplay.replace(/ /g, ' '); });

    $$('[data-wa]').forEach(a => {
      if (!hasWa) return;
      a.href = waLink(zh() && S.whatsappMessageZh ? S.whatsappMessageZh : S.whatsappMessage);
      a.target = '_blank'; a.rel = 'noopener'; a.hidden = false;
    });

    $$('[data-hours]').forEach(el => { el.textContent = L.t(S.hours); });
    $$('[data-hours-wrap]').forEach(el => { el.hidden = !S.hoursConfirmed; });
    $$('[data-address]').forEach(el => { el.textContent = S.address; });
    $$('[data-since]').forEach(el => { el.textContent = S.since; });

    const map = $('[data-map]');
    if (map && S.mapQuery) {
      const src = `https://www.google.com/maps?q=${encodeURIComponent(S.mapQuery)}&z=16&output=embed&hl=${zh() ? 'zh-CN' : 'en'}`;
      if (map.getAttribute('src') !== src) map.src = src;
    }
    $$('[data-map-link]').forEach(a => { a.href = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(S.mapQuery); });

    /* Price tables */
    const headRow = (first, cols) => `<tr><th scope="col">${first}</th>${cols.map(c => `<th scope="col">${c}</th>`).join('')}</tr>`;
    const rowHead = (i) => L.coils(i + 1);
    const ov = $('#tbl-overhaul');
    if (ov && S.overhaul) {
      const rows = [0, 1, 2, 3, 4].map(i => {
        const off = S.overhaulDiscount[i];
        return `<tr><th scope="row">${rowHead(i)}${off ? ` <span class="off">${zh() ? '优惠' + off + '%' : off + '% off'}</span>` : ''}</th>` +
          S.overhaul.map(o => `<td>${money(o.prices[i])}</td>`).join('') + '</tr>';
      }).join('');
      ov.innerHTML = `<thead>${headRow(L.t('Fan coils'), S.overhaul.map(o => esc(L.t(o.label))))}</thead><tbody>${rows}</tbody>`;
    }
    const sv = $('#tbl-servicing');
    if (sv && S.servicing) {
      const rows = [0, 1, 2, 3, 4].map(i =>
        `<tr><th scope="row">${rowHead(i)}</th>` + S.servicing.map(o => `<td>${money(o.prices[i])}</td>`).join('') + '</tr>').join('');
      sv.innerHTML = `<thead>${headRow(L.t('Fan coils'), S.servicing.map(o => esc(L.t(o.label))))}</thead><tbody>${rows}</tbody>`;
    }
    $$('[data-cbd]').forEach(el => { el.textContent = money(S.cbdSurcharge); });
    $$('[data-cbd-add]').forEach(el => { el.textContent = '(+' + money(S.cbdSurcharge) + ')'; });
    const ad = $('#addons');
    if (ad && S.addons) ad.innerHTML = S.addons.map(a =>
      `<li><span>${esc(L.t(a.name))}${a.note ? ` <small>(${esc(L.t(a.note))})</small>` : ''}</span><b>${esc(L.t(a.price))}</b></li>`).join('');

    /* Areas + reviews: each section stays hidden until real content is added */
    const areas = $('#areas-list');
    if (areas && S.areas && S.areas.length) {
      areas.innerHTML = S.areas.map(a => `<li>${esc(a)}</li>`).join('');
      $('#areas').hidden = false;
    }
    const rv = $('#reviews-list');
    if (rv && S.reviews && S.reviews.length) {
      rv.innerHTML = S.reviews.map(r => `<figure><blockquote>${esc(r.text)}</blockquote><figcaption>${esc(r.name)}${zh() ? '，' : ', '}${esc(L.t('Google review'))}</figcaption></figure>`).join('');
      $('#reviews').hidden = false;
    }

    drawEstimator();
  };

  /* ---------- Language ---------- */
  const render = () => { L.apply(); fill(); };
  $('#est-cbd').addEventListener('change', e => { st.cbd = e.target.checked; drawEstimator(); });
  $('#lang').addEventListener('click', () => { L.lang = zh() ? 'en' : 'zh'; focusId = null; render(); });
  L.init();
  render();
})();
