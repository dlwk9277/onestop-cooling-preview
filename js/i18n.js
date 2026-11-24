/* OneStop Cooling: English / Chinese (简体) text.
   English text lives in index.html and config.js. The Chinese is here.
   To fix a Chinese sentence, edit it below, save, refresh. */
window.I18N = (() => {
  const ZH = {
    title: 'OneStop Cooling：盛港冷气保养与维修',
    desc: 'OneStop Cooling：新加坡盛港冷气保养、一般清洁、维修和化学大清洗。保养$40起。请致电 8828 5392。',
    ogdesc: '冷气保养、清洁、维修和化学大清洗。保养$40起。请致电 8828 5392。',
    skip: '跳到正文',
    home: 'OneStop Cooling，返回首页',
    logo: 'OneStop Cooling：冷气保养与维修',
    mainnav: '主菜单',
    'nav.services': '服务',
    'nav.prices': '价格',
    'nav.work': '作品',
    'nav.contact': '联系我们',
    call: '致电',

    'hero.h1': '冷气保养与维修，<span class="mark">$40起</span>。',
    'hero.lead': '位于盛港，自 <span data-since>2021</span> 年起。为您的家用冷气提供保养、一般清洁、维修和化学大清洗。价格清楚列明如下，来电预约时间。',
    'hero.est': '10秒算出您的价格',
    'alt.blower': '拆开的冷气室内机，可见风轮和干净的盘管',

    'svc.h2': '我们的服务',
    'svc1.h': '冷气保养',
    'svc1.p': '定期保养，让您的冷气保持良好的制冷效果。价格视乎室内机（风筒）数量而定。',
    'svc1.a': '查看保养价格',
    'svc2.h': '化学大清洗',
    'svc2.p': '拆开冷气机，用化学药水清洗盘管。按BTU大小和室内机（风筒）数量计价。',
    'svc2.a': '查看大清洗价格',
    'svc3.h': '冷气维修',
    'svc3.p': '冷气不冷或出现故障？请来电告诉我们情况。也提供加气服务。',
    'svc4.h': '一般清洁',
    'svc4.p': '清洁滤网、面板和看得到的部件，让出风清新舒适。',
    'svc.callbook': '来电预约',

    'ba.h2': '脏冷气里洗出来的东西',
    'ba.sub': '来自真实工作的照片。',
    'ba.c1': '<b>清洗过程中</b> 盘管上冲下来的污垢和泡沫',
    'ba.c2': '<b>清洗后</b> 干净的盘管',
    'alt.foamdirty': '化学清洗时，盘管上冲下来的脏泡沫和污垢',
    'alt.coilclean': '清洗后举起的干净冷气盘管',

    'pr.h2': '价格',
    'pr.sub': '单次价格。化学大清洗的室内机越多，每台越便宜。',
    'est.h': '算算您的价格',
    'est.service': '服务',
    'est.coils': '室内机（风筒）数量',
    'est.hint': '不确定？数一数墙上有几个室内机，每个就是一个风筒。',
    'est.cbd': '市中心（CBD）地址 <b data-cbd-add></b>',
    'est.label': '您的价格',
    'est.wa': 'WhatsApp 预约',
    'est.fine': '按下方价目表计算。加气等附加服务另外收费。',
    'pr.list': '完整价目表',
    'pr.sv': '标准冷气保养 <small>住宅</small>',
    'pr.note': '市中心（CBD）地址：加收 <b data-cbd>$15</b>。',
    'pr.ov': '化学大清洗',
    'pr.add': '附加服务',

    'work.h2': '我们的作品',
    'work.sub': '来自真实保养工作的照片。',
    'work.g1': '拆开的冷气机',
    'work.g2': '打开的外壳',
    'work.g3': '取出的盘管',
    'work.g4': '化学清洗',
    'work.g5': '工作中',
    'alt.g1': '在浴室里拆开做化学清洗的冷气室内机',
    'alt.g2': '打开外壳的冷气机，滤网摆放在旁',
    'alt.g3': '从冷气机取出的盘管，顶部可见铜管',
    'alt.g4': '覆满白色和蓝色清洗泡沫的冷气盘管',
    'alt.g5': 'OneStop Cooling 技术员戴着口罩，在拆开冷气机后清理',

    'areas.h2': '服务地区',
    'rev.h2': '客户评价',
    'ct.h2': '预约服务',
    'ct.lead': '来电告诉我们您的冷气型号和室内机（风筒）数量，我们会安排时间。',
    'ct.hours': '营业时间',
    'ct.addr': '地址',
    'ct.phone': '电话',
    'ct.map': '在Google地图中打开',
    map: '前往 OneStop Cooling 的地图，盛港东道',
    foot: '<b>OneStop Cooling</b> &middot; 冷气保养与维修 &middot; 新加坡盛港',
    dock: '联系方式'
  };

  /* Text that comes from config.js (looked up by its English wording) */
  const TXT = {
    'Standard servicing': '标准保养',
    'Chemical overhaul': '化学大清洗',
    'Servicing': '保养',
    'All models': '所有型号',
    'Aircon type': '冷气型号',
    'Aircon size': '冷气大小',
    'Fan coils': '室内机数量',
    'Condenser chemical cleaning': '冷凝器化学清洗',
    'High pressure steamer': '高压蒸汽清洗',
    'High pressure wash': '高压冲洗',
    'Top-up gas (R410)': '加气 (R410)',
    'Top-up gas (R22)': '加气 (R22)',
    'Checking fee': '检查费',
    'offset against the service': '可抵扣服务费',
    'Mon to Sun, 10:30am to 6pm': '周一至周日，上午10:30至下午6:00',
    'CBD surcharge': '市中心（CBD）加收',
    'Google review': 'Google评价'
  };

  const EN_META = {};
  let lang = 'en';

  const t = (en) => {
    if (lang !== 'zh') return en;
    if (TXT[en]) return TXT[en];
    return String(en).replace(/ to /g, ' 至 ');   // "$80 to $120", "9,000 to 12,000 BTU"
  };
  const coils = (n) => lang === 'zh' ? `${n}个室内机` : `${n} fan coil${n > 1 ? 's' : ''}`;

  const apply = () => {
    const zh = lang === 'zh';
    document.documentElement.lang = zh ? 'zh-Hans-SG' : 'en-SG';
    document.querySelectorAll('[data-i18n]').forEach(el => {
      if (el.dataset.en === undefined) el.dataset.en = el.innerHTML;
      const k = el.dataset.i18n;
      el.innerHTML = zh && ZH[k] !== undefined ? ZH[k] : el.dataset.en;
    });
    ['alt', 'title', 'aria-label'].forEach(a => {
      document.querySelectorAll(`[data-i18n-${a}]`).forEach(el => {
        const store = 'en' + a.replace(/(^|-)(.)/g, (_, __, c) => c.toUpperCase());
        if (el.dataset[store] === undefined) el.dataset[store] = el.getAttribute(a) || '';
        const k = el.getAttribute(`data-i18n-${a}`);
        el.setAttribute(a, zh && ZH[k] !== undefined ? ZH[k] : el.dataset[store]);
      });
    });
    document.querySelectorAll('[data-i18n-content]').forEach(el => {
      if (el.dataset.enContent === undefined) el.dataset.enContent = el.getAttribute('content') || '';
      const k = el.getAttribute('data-i18n-content');
      el.setAttribute('content', zh && ZH[k] !== undefined ? ZH[k] : el.dataset.enContent);
    });
    const ti = document.querySelector('[data-i18n-title-tag]');
    if (ti) {
      if (EN_META.title === undefined) EN_META.title = ti.textContent;
      document.title = zh ? ZH.title : EN_META.title;
    }
    const btn = document.getElementById('lang');
    if (btn) {
      btn.innerHTML = zh ? '<span lang="en">EN</span>' : '<span lang="zh-Hans">中文</span>';
      btn.setAttribute('aria-label', zh ? 'Switch to English' : '切换到中文');
    }
  };

  const initial = () => {
    try {
      const q = new URLSearchParams(location.search).get('lang');
      if (q === 'zh' || q === 'en') return q;
      const saved = localStorage.getItem('onestop-lang');
      if (saved === 'zh' || saved === 'en') return saved;
    } catch (e) { /* storage blocked: fine */ }
    return /^zh/i.test(navigator.language || '') ? 'zh' : 'en';
  };
  const save = () => { try { localStorage.setItem('onestop-lang', lang); } catch (e) { /* ignore */ } };

  return {
    get lang() { return lang; },
    set lang(v) { lang = v === 'zh' ? 'zh' : 'en'; save(); },
    init() { lang = initial(); },
    apply, t, coils
  };
})();
