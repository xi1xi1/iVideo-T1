# iVideo-T1

# 项目概述
iVideo 是一个仿腾讯视频网站的视频播放平台，提供视频浏览、搜索、播放和互动功能。

# 技术栈
前端: HTML5, CSS3, JavaScript
图标: Font Awesome 6.4.0
布局: Flexbox + Grid 布局系统
视频: HTML5 Video API

# 项目结构
ivideo/
├── index.html             # 首页 - 视频浏览页面
├── play.html              # 视频播放页面
├── css/
│   ├── style.css          # 首页样式文件
│   └── play.css           # 播放页面样式文件
└── js/
    ├── script.js          # 首页功能脚本
    └── play.js            # 播放页面功能脚本

# 核心功能模块
# 1.首页 (index.html) 
布局结构
顶部导航栏: Logo、搜索框、导航链接、用户操作
侧边栏: 分类导航菜单
主内容区: 横幅、视频推荐网格
# 2.播放页 (play.html)
布局结构
视频播放器: 主视频区域 + 控制栏
视频信息: 标题、数据、操作按钮
评论区: 评论表单和评论列表
推荐侧边栏: 相关视频推荐

# JavaScript 功能详解
# 1.首页功能 (script.js)
核心函数
    performSearch(): 执行搜索功能
    goPlayPage(): 跳转到播放页面并传递参数
登录系统
    模态框显示/隐藏
    密码可见性切换
    表单提交处理
# 2.播放页功能 (play.js)
视频播放器
    togglePlayPause(): 播放/暂停切换
    updateProgress(): 更新播放进度
    seek(): 进度条点击跳转
    toggleFullscreen(): 全屏切换
音量控制
    toggleMute(): 静音切换
    changeVolume(): 音量调节
内容管理
    generateComments(): 生成评论数据
    generateRecommendations(): 生成推荐内容
    changeVideo(): 切换视频功能
用户互动
    点赞/点踩状态管理
    评论提交系统

# 项目状态说明
本项目目前处于前端原型开发阶段，仅完成iVideo前端界面设计，相关功能停留在静态效果。
