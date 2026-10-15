# 吕子琛 · 个人网站

课程：《教育技术学专业导论》作业二 —— 个人网站
技术：纯静态站点（HTML + CSS + 原生 JavaScript），无框架、无构建步骤、无外部依赖。

## 一、站点结构

```
lvzichen-site/
├─ index.html              首页：个人定位 + 作品精选 + 实践方向 + 联系表单
├─ about.html              个人介绍：经历、选择专业的理由、兴趣、联系方式、技能清单
├─ works.html              作品展示：4 件作品，带类别筛选与可展开详情
├─ 404.html                错误页（部署平台会自动把它当作找不到页面时的兜底页）
├─ _redirects              Netlify / Cloudflare Pages 的 404 规则
├─ _headers                Netlify / Cloudflare Pages 的安全与缓存响应头
├─ assets/
│  ├─ style.css            全部样式（设计规范集中在文件顶部的 :root 变量里）
│  ├─ main.js              交互脚本：移动端导航 / 作品筛选 / 滚动入场 / 表单
│  ├─ portrait.jpg         个人照片
│  ├─ favicon.svg          站点图标
│  └─ cover-*.svg          三张作品封面（扁平几何风格，手写 SVG）
└─ screenshots/            已渲染好的页面截图，可直接贴进成绩评价表
```

## 二、视觉规范（与个人简历保持一致）

| 用途 | 色值 |
|---|---|
| 主文字 / 近黑 | `#16181D` |
| 次级文字 | `#5A6270` |
| 辅助说明 / 等宽标签 | `#A7AEB9` |
| 分隔线 | `#D3D7DE` |
| 浅底块 | `#F2F3F5` |
| 唯一点缀色 · 琥珀 | `#E08700` |

规则：全站只用这六个颜色加白色；等宽字体（Consolas）只承担英文标签与编号；正文用系统中文黑体；全站无圆角、细线分隔、大留白。改配色只需要动 `assets/style.css` 顶部 `:root` 里的变量。

## 三、本地预览

直接双击 `index.html` 就能看。若想看和线上完全一致的效果（相对路径、404 页），在本目录执行：

```powershell
python -m http.server 8080
```

然后浏览器打开 http://localhost:8080

## 四、部署上线

### 先看这一节：哪些平台在国内能用

2026 年 10 月 15 日实测（中国大陆家庭宽带）结果：

| 平台 | 主站可达性 | 部署后链接可达性 | 结论 |
|---|---|---|---|
| **腾讯云开发 CloudBase** | 200 / 3.1s | 国内节点，正常 | ✅ **首选** |
| **Gitee Pages** | 200 / 4.1s | 国内节点，正常 | ✅ 推荐（需实名） |
| GitHub Pages | 200 / 3.5s | 通常可达，偶尔慢 | ⚠️ 可用 |
| Vercel | 200 / 0.6s | 国内访问常被墙 | ⚠️ 慎用 |
| Netlify | 主站 200，**但上传接口 API 超时/401** | 国内访问不稳定 | ❌ 拖拽上传失败，实测报 Not Found |
| Cloudflare Pages | 主站 **403 已禁止** | `pages.dev` 加载 78 秒 | ❌ 不可用 |

> **重要更正**：本文档早期版本把 Netlify Drop 和 Cloudflare Pages 列为首选，这是错的。
> 那两个方案在本机环境下实测不可用（Netlify 上传接口连不通、Cloudflare 主站直接被拦）。

### 方式 A：腾讯云开发 CloudBase（首选，国内速度最好）

1. 打开 https://tcb.cloud.tencent.com/ ，用微信或 QQ 登录
2. 创建一个环境（选**按量计费**，静态托管本身不产生费用；会要求实名认证）
3. 进入左侧「静态网站托管」→「文件管理」→「上传文件」
4. 把 **`lvzichen-site-部署包.zip`** 上传，或直接把站点文件全部传上去
5. 上传完在「基础配置」里能看到一个默认域名，形如 `https://xxxx.tcloudbaseapp.com`，这就是你的网站链接

### 方式 B：Gitee Pages（国内稳定，需要实名）

1. 打开 https://gitee.com/ 注册账号并完成实名认证
2. 右上角「+」→ 新建仓库，仓库名 `lvzichen-site`，**开源**（公开）
3. 把站点文件上传到仓库根目录（`index.html` 必须在根目录，不能多套一层文件夹）
4. 仓库上方「服务」→「Gitee Pages」→ 勾选强制 HTTPS → 启动
5. 得到 `https://你的用户名.gitee.io/lvzichen-site`

### 方式 C：GitHub Pages（不需要实名，速度一般）

1. 在 GitHub 新建仓库，名字建议 `lvzichen-site`，选 Public
2. 把站点文件上传到仓库根目录（Add file → Upload files）
3. 仓库 Settings → Pages → Source 选 `main` 分支、`/ (root)`，保存
4. 一两分钟后得到 `https://你的用户名.github.io/lvzichen-site/`

### 部署包说明

`C:\Users\ROG\Documents\lvzichen-site-部署包.zip`（131 KB）已打好，只含上线必需文件：

```
index.html  about.html  works.html  404.html  _redirects  _headers  README.md
assets/（style.css、main.js、portrait.jpg、favicon.svg、cover-*.svg）
```

已排除 `screenshots/`（截图是交作业用的，不影响网站）和 `_*.py` 自检脚本。

**关键**：解压后 `index.html` 必须直接躺在根目录。如果你自己重新打包时多套了一层
`lvzichen-site/` 文件夹，部署上去首页就会 404 —— 这是部署失败最常见的原因。

### 部署后请自查三件事

1. 手机流量（不开 Wi-Fi）打开链接，确认能访问 —— 作业要求"链接可正常访问"
2. 手机竖屏看一遍，确认没有内容超出屏幕（本站已做响应式，正常不会）
3. 点一遍三个导航项和"展开：过程与收获"，确认都能正常跳转/展开

## 五、交作业要提交什么

按成绩评价表作业二的要求：

- **网站访问链接**：填部署后得到的网址
- **作品粘贴区截图**：直接用 `screenshots/` 里的图片
  - `index.png` 首页
  - `about.png` 个人介绍页
  - `works.png` 作品展示页
  - `mobile.png` 手机端效果（能体现"电脑端与手机端浏览体验良好"这一评分点）

## 六、说明与后续可改的地方

1. **表单暂未接后端**。目前提交按钮会唤起本机邮件客户端，把内容发到 `comastoma@qq.com`，点了不会没反应。若想真正在网页内收件：注册 https://formspree.io 免费账号，拿到形如 `https://formspree.io/f/xxxxxxx` 的地址，把 `index.html` 里的 `<form ... action="#">` 改成 `action="https://formspree.io/f/xxxxxxx"`，脚本会自动切换为无刷新提交。
2. **作品封面是手写 SVG 占位图**，不是真实作品截图。等你整理出辩论稿、剧照、宣传片截图，把 `assets/cover-*.svg` 换成同名 jpg/png（记得同步改 `index.html`、`works.html` 里的 `src` 与 `alt`）即可。
3. **三件作品都发生在高中阶段**，作品页已注明这一点，避免评审误解为大学成果。
4. **想改用低代码平台**：站点内容可以直接搬进凡科/上线了/Wix 的模板，结构就是"首页 / 个人介绍 / 作品展示"三栏，各页文案在对应 html 文件里，复制过去即可。

## 七、自检脚本（可选，改完站点后跑一遍）

```powershell
python _check_site.py      # 检查本地引用是否有断链、图片是否都有 alt
python _measure.py         # 量某个页面的盒模型，排查布局问题
python _selfcheck.py       # 移动端横向溢出检查 + 筛选/导航交互自检
```

这几个脚本只在本地用，部署时不必上传（名字以 `_` 开头，便于识别）。
