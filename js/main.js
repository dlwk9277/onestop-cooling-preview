/* OneStop Cooling: page behaviour. All settings live in config.js. */
(() => {
  const S = window.SITE || {};
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const esc = (t) => String(t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const money = (n) => '$' + n;

  /* Phone */
  $$('[data-tel]').forEach(a => { a.href = 'tel:+' + S.phoneIntl; });
  $$('[data-phone-text]').forEach(el => { el.textContent = S.phoneDisplay.replace(/ /g, '\u00a0'); });

  /* WhatsApp: live only once a number is set, otherwise "to confirm" */
  const hasWa = !!S.whatsappNumber;
  $$('[data-wa]').forEach(a => {
    if (hasWa) {
      a.href = `https://wa.me/${S.whatsappNumber}?text=${encodeURIComponent(S.whatsappMessage || '')}`;
      a.target = '_blank'; a.rel = 'noopener';
    } else {
      a.classList.add('is-pending');
      a.removeAttribute('href');
      a.setAttribute('aria-disabled', 'true');
      const l = a.querySelector('.wa-label'); if (l) l.textContent = 'WhatsApp: number to confirm';
    }
  });

  /* Hours, address */
  $$('[data-hours]').forEach(el => { el.textContent = S.hours; });
  $$('[data-hours-flag]').forEach(el => { el.hidden = !!S.hoursConfirmed; });
  $$('[data-address]').forEach(el => { el.textContent = S.address; });
  $$('[data-since]').forEach(el => { el.textContent = S.since; });

  /* Map */
  const map = $('[data-map]');
  if (map && S.mapQuery) map.src = `https://www.google.com/maps?q=${encodeURIComponent(S.mapQuery)}&z=16&output=embed`;
  $$('[data-map-link]').forEach(a => { a.href = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(S.mapQuery); });

  /* Price tables */
  const headRow = (first, cols) => `<tr><th scope="col">${first}</th>${cols.map(c => `<th scope="col">${c}</th>`).join('')}</tr>`;
  const ov = $('#tbl-overhaul');
  if (ov && S.overhaul) {
    const rows = [0, 1, 2, 3, 4].map(i => {
      const off = S.overhaulDiscount[i];
      return `<tr><th scope="row">${i + 1} fan coil${i ? 's' : ''}${off ? ` <span class="off">${off}% off</span>` : ''}</th>` +
        S.overhaul.map(o => `<td>${money(o.prices[i])}</td>`).join('') + '</tr>';
    }).join('');
    ov.innerHTML = `<thead>${headRow('Fan coils', S.overhaul.map(o => o.label))}</thead><tbody>${rows}</tbody>`;
  }
  const sv = $('#tbl-servicing');
  if (sv && S.servicing) {
    const rows = [0, 1, 2, 3, 4].map(i =>
      `<tr><th scope="row">${i + 1} fan coil${i ? 's' : ''}</th>` + S.servicing.map(o => `<td>${money(o.prices[i])}</td>`).join('') + '</tr>').join('');
    sv.innerHTML = `<thead>${headRow('Fan coils', S.servicing.map(o => o.label))}</thead><tbody>${rows}</tbody>`;
  }
  $$('[data-cbd]').forEach(el => { el.textContent = money(S.cbdSurcharge); });
  const ad = $('#addons');
  if (ad && S.addons) ad.innerHTML = S.addons.map(a =>
    `<li><span>${esc(a.name)}${a.note ? ` <small>(${esc(a.note)})</small>` : ''}</span><b>${esc(a.price)}</b></li>`).join('');

  /* Areas + reviews: real content replaces the placeholder */
  const areas = $('#areas-list');
  if (areas && S.areas && S.areas.length) {
    areas.innerHTML = S.areas.map(a => `<li>${esc(a)}</li>`).join('');
    areas.hidden = false; const ph = $('#areas-ph'); if (ph) ph.hidden = true;
  }
  const rv = $('#reviews-list');
  if (rv && S.reviews && S.reviews.length) {
    rv.innerHTML = S.reviews.map(r => `<figure><blockquote>${esc(r.text)}</blockquote><figcaption>${esc(r.name)}, Google review</figcaption></figure>`).join('');
    rv.hidden = false; const ph = $('#reviews-ph'); if (ph) ph.hidden = true;
  }
})();
