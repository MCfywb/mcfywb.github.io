function addBlockedLinkTips() {
  // 核心配置区域：你可以在这里自由分配域名和提示语
  const linkConfigs = [
    {
      // 类型 1：完全无法访问的域名
      domains: [
        'facebook.com',
        'x.com',
        'instagram.com',
        'threads.com',
        'youtube.com',
        'twitter.com'
      ],
      title: '该链接在中国大陆地区无法访问',
      className: 'blocked-link'
    },
    {
      // 类型 2：可能无法访问（不稳定）的域名
      domains: [
        'github.com',
        'hexo.io'
      ],
      title: '该链接在中国大陆地区可能无法访问',
      className: 'maybe-blocked-link'
    }
  ];

  // 获取页面上所有的超链接
  const links = document.querySelectorAll('a');

  links.forEach(link => {
    if (!link.href) return;

    // 遍历检查每一种配置类型
    for (const config of linkConfigs) {
      // 检查链接是否包含当前配置中的任意一个域名
      const isMatch = config.domains.some(domain => link.href.includes(domain));
      
      if (isMatch) {
        // 设置对应的悬停提示文本
        link.setAttribute('title', config.title);
        // 匹配成功后跳出循环，避免被后续的其他规则覆盖
        break; 
      }
    }
  });
}

// 兼容页面首次加载
document.addEventListener("DOMContentLoaded", addBlockedLinkTips);

// 兼容 Pjax 无刷新页面切换（安知鱼主题默认开启）
document.addEventListener("pjax:complete", addBlockedLinkTips);