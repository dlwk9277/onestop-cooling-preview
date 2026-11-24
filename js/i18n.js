/* OneStop Cooling: English / Chinese (简体) text.
   English text lives in index.html and config.js. The Chinese is here.
   To fix a Chinese sentence, edit it below, save, refresh. */
window.I18N = (() => {
  const ZH = {
    title: 'OneStop Cooling：盛港冷气保养与维修',
    desc: 'OneStop Cooling：新加坡盛港冷气保养、一般清洁、维修和化学大清洗。保养$60起。请致电 8828 5392。',
    ogdesc: '冷气保养、清洁、维修和化学大清洗。保养$60起。请致电 8828 5392。',
    skip: '跳到正文',
    home: 'OneStop Cooling，返回首页',
    logo: 'OneStop Cooling：冷气保养与维修',
    mainnav: '主菜单',
    'nav.services': '服务',
    'nav.prices': '价格',
    'nav.work': '工作照片',
    'nav.contact': '联系我们',
    call: '致电',
    'wa.book': 'WhatsApp 预约',

    'hero.h1': '<span class="nb">冷气保养与维修</span> <span class="plate"><span data-from>$60</span>起</span>',
    'hero.lead': '位于盛港，自 <span data-since>2021</span> 年起。先看价格，再用 WhatsApp 或电话预约。',
    'lad.h': '普通保养',
    'lad.more': '算出准确价格',
    'alt.cat': 'OneStop Cooling 的猫咪吉祥物，戴墨镜、穿工作服，指着价格',

    'est.h': '按遥控器，看价格',
    'est.sub': '选择服务、冷气类型和室内机数量。',
    'est.title': '价格计算器',
    'est.service': '服务',
    'est.coils': '室内机数量',
    'u.less': '减少一台',
    'u.more': '增加一台',
    'est.cbd': '市中心（CBD）地址 <b data-cbd-add></b>',
    'est.wa': '用 WhatsApp 预约',
    'est.fine': '按下方价目表计算。加气和其他附加服务另外收费。超过5台？请联系我们。',

    'pr.list': '完整价目表',
    'pr.sub': '单次价格。',
    'pr.sv': '普通保养',
    'pr.note': '市中心（CBD）地址：加收 <b data-cbd>$15</b>。',
    'pr.ov': '化学大清洗（每台）',
    'pr.gas': '加气',
    'pr.add': '附加服务与上门费',

    'svc.h2': '我们的服务',
    'svc1.h': '冷气保养',
    'svc1.p': '定期保养，让您的冷气保持良好的制冷效果。价格视室内机数量而定。',
    'svc2.h': '化学大清洗',
    'svc2.p': '拆开冷气机，用化学药水清洗盘管。按BTU大小和台数计价。',
    'svc3.h': '冷气维修',
    'svc3.p': '冷气不冷或出现故障？请告诉我们情况。也提供加气服务。',
    'svc.tap': '点选问题，直接发信息给我们：',
    'svc4.h': '一般清洁',
    'svc4.p': '清洁滤网、面板和看得到的部件，让出风清新舒适。',

    'ba.h2': '脏冷气里洗出来的东西',
    'ba.sub': '来自真实工作的照片。',
    'ba.c1': '<b>清洗中</b> 盘管上冲下来的污垢和泡沫',
    'ba.c2': '<b>清洗后</b> 另一次工作中洗净的盘管',
    'alt.foamdirty': '化学清洗时，盘管上冲下来的脏泡沫和污垢',
    'alt.coilclean': '清洗后举起的干净冷气盘管',

    'work.h2': '我们的工作照片',
    'work.g1': '拆开的冷气机',
    'work.g2': '打开的外壳',
    'work.g3': '取出的盘管',
    'work.g4': '化学清洗',
    'work.g5': '工作中',
    'work.g6': '风轮和盘管',
    'alt.g1': '在浴室里拆开做化学清洗的冷气室内机',
    'alt.g2': '打开外壳的冷气机，滤网摆放在旁',
    'alt.g3': '从冷气机取出的盘管，顶部可见铜管',
    'alt.g4': '覆满白色和蓝色清洗泡沫的冷气盘管',
    'alt.g5': 'OneStop Cooling 技术员戴着口罩，在拆开冷气机后清理',
    'alt.blower': '拆开的冷气室内机，可见风轮和干净的盘管',

    'areas.h2': '服务地区',
    'rev.h2': '客户评价',
    'ct.h2': '预约服务',
    'ct.lead': '告诉我们您的冷气型号和室内机数量，我们会安排时间。',
    'ct.hours': '营业时间',
    'ct.addr': '地址',
    'ct.phone': '电话',
    'ct.map': '在Google地图中打开',
    map: '前往 OneStop Cooling 的地图，盛港东通道',
    foot: 'OneStop Cooling，冷气保养与维修。新加坡盛港。',
    dock: '联系方式'
  };

  /* Text that comes from config.js (looked up by its English wording) */
  const TXT = {
    'Normal service': '普通保养',
    'Chemical overhaul': '化学大清洗',
    'Others': '其他品牌',
    'Aircon type': '冷气品牌',
    'Aircon size': '冷气大小',
    'Units': '台数',
    'Total': '总计',
    'Condenser chemical cleaning': '冷凝器化学清洗',
    'High pressure steamer': '高压蒸汽清洗',
    'High pressure wash': '高压冲洗',
    'Transport for an inspection visit': '上门检查交通费',
    'covered by the service': '服务费已包含',
    'Mon to Sun, 10:30am to 6pm': '周一至周日，上午10:30至下午6:00',
    'CBD surcharge': '市中心（CBD）加收',
    'Google review': 'Google评价',
    'Not cold': '不冷',
    'Leaking water': '漏水',
    'Noisy': '有噪音',
    'Smells bad': '有异味',
    "Won't turn on": '无法启动'
  };

  const EN_META = {};
  let lang = 'en';

  const t = (en) => {
    if (lang !== 'zh') return en;
    if (TXT[en]) return TXT[en];
    return String(en).replace(/ to /g, ' 至 ');   // "$80 to $120", "9,000 to 12,000 BTU"
  };
  const units = (n) => lang === 'zh' ? `${n}台` : `${n} unit${n > 1 ? 's' : ''}`;

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
    apply, t, units
  };
})();
