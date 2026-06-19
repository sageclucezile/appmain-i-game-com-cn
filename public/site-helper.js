(function() {
  'use strict';

  const CONFIG = {
    siteUrl: 'https://appmain-i-game.com.cn',
    brand: '爱游戏',
    storageKey: 'site_helper_shown'
  };

  const KEYWORDS = [
    '热门游戏', '益智休闲', '动作冒险', '多人联机', '每日签到', '礼包福利'
  ];

  const TIPS = [
    '点击右上角菜单可查看所有分类',
    '新用户注册即送体验礼包',
    '每日签到可获得积分奖励',
    '推荐使用最新版浏览器访问',
    '遇到问题请查看帮助中心'
  ];

  const ACCESS_INFO = {
    title: '访问说明',
    items: [
      '本平台无需注册即可浏览部分内容',
      '部分功能需要登录账号后使用',
      '建议使用Chrome或Edge浏览器',
      '移动端请扫描二维码下载App'
    ]
  };

  function createCard(title, content) {
    const div = document.createElement('div');
    div.className = 'site-helper-card';
    div.style.cssText = 'background:#f8f9fa;border:1px solid #dee2e6;border-radius:8px;padding:16px;margin:12px 0;font-family:sans-serif;';
    
    const h3 = document.createElement('h3');
    h3.textContent = title;
    h3.style.cssText = 'margin:0 0 10px;font-size:18px;color:#333;';
    
    const p = document.createElement('p');
    p.textContent = content;
    p.style.cssText = 'margin:0;font-size:14px;color:#555;line-height:1.5;';
    
    div.appendChild(h3);
    div.appendChild(p);
    return div;
  }

  function createBadge(text) {
    const span = document.createElement('span');
    span.className = 'site-helper-badge';
    span.textContent = text;
    span.style.cssText = 'display:inline-block;background:#007bff;color:#fff;border-radius:12px;padding:4px 12px;margin:4px;font-size:12px;font-weight:bold;';
    return span;
  }

  function createAccessPanel(info) {
    const div = document.createElement('div');
    div.className = 'site-helper-access';
    div.style.cssText = 'background:#e9ecef;border-left:4px solid #17a2b8;padding:12px 16px;margin:16px 0;border-radius:4px;font-family:sans-serif;';
    
    const h4 = document.createElement('h4');
    h4.textContent = info.title;
    h4.style.cssText = 'margin:0 0 8px;font-size:16px;color:#17a2b8;';
    
    const ul = document.createElement('ul');
    ul.style.cssText = 'margin:0;padding-left:20px;';
    info.items.forEach(function(item) {
      const li = document.createElement('li');
      li.textContent = item;
      li.style.cssText = 'font-size:14px;color:#495057;margin:4px 0;';
      ul.appendChild(li);
    });
    
    div.appendChild(h4);
    div.appendChild(ul);
    return div;
  }

  function getRandomTip() {
    const index = Math.floor(Math.random() * TIPS.length);
    return TIPS[index];
  }

  function generateKeywordsHTML() {
    const container = document.createElement('div');
    container.className = 'site-helper-keywords';
    container.style.cssText = 'margin:16px 0;';
    KEYWORDS.forEach(function(kw) {
      container.appendChild(createBadge(kw));
    });
    return container;
  }

  function renderHelper() {
    if (sessionStorage.getItem(CONFIG.storageKey)) {
      return;
    }
    
    const main = document.querySelector('main') || document.body;
    
    const welcomeCard = createCard('欢迎来到 ' + CONFIG.brand, CONFIG.siteUrl + ' 为您提供丰富的游戏体验。' + getRandomTip());
    main.insertBefore(welcomeCard, main.firstChild);
    
    const keywordsSection = document.createElement('div');
    keywordsSection.className = 'site-helper-section';
    const label = document.createElement('p');
    label.textContent = '热门关键词：';
    label.style.cssText = 'font-size:14px;color:#6c757d;margin:8px 0 4px;font-family:sans-serif;';
    keywordsSection.appendChild(label);
    keywordsSection.appendChild(generateKeywordsHTML());
    main.insertBefore(keywordsSection, main.firstChild);
    
    const accessPanel = createAccessPanel(ACCESS_INFO);
    main.appendChild(accessPanel);
    
    const tipCard = createCard('小提示', getRandomTip());
    main.appendChild(tipCard);
    
    sessionStorage.setItem(CONFIG.storageKey, 'true');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderHelper);
  } else {
    renderHelper();
  }
})();