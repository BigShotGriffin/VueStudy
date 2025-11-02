# Vue 3 待办清单应用

[![在线演示](https://img.shields.io/badge/在线演示-blue?style=for-the-badge)](https://bigshotgriffin.github.io/VueStudy/)

一个基于 Vue 3 + TypeScript + Vite 构建的现代化待办清单应用，具有任务管理、筛选和统计功能。

## ✨ 功能特性

- 📝 **添加任务** - 快速添加新的待办事项
- ✅ **完成任务** - 点击复选框标记任务完成状态
- 🗑️ **删除任务** - 一键删除不需要的任务
- 🔍 **任务筛选** - 按全部/未完成/已完成状态筛选任务
- 📊 **统计信息** - 实时显示总任务数、已完成和待完成任务数量
- 🎨 **现代UI** - 简洁美观的用户界面设计

## 🛠️ 技术栈

- **前端框架**: Vue 3 (Composition API)
- **开发语言**: TypeScript
- **构建工具**: Vite
- **样式**: CSS3 (Scoped Styles)
- **测试框架**: Vitest
- **代码规范**: ESLint

## 📁 项目结构

```
src/
├── components/          # 组件目录
│   ├── AddTask.vue     # 添加任务组件
│   ├── Filter.vue      # 筛选标签页组件
│   ├── TaskList.vue    # 任务列表组件
│   └── __tests__/      # 测试文件
├── assets/             # 静态资源
├── App.vue            # 主应用组件
├── main.ts            # 应用入口文件
└── tasks.json         # 示例任务数据
```

## 🚀 快速开始

### 环境要求

- Node.js: ^20.19.0 || >=22.12.0
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

应用将在 `http://localhost:5173` 启动

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

### 运行测试

```bash
npm run test:unit
```

### 代码检查

```bash
npm run lint
```

## 🎯 使用说明

1. **添加任务**: 在输入框中输入任务内容，点击"添加"按钮或按回车键
2. **完成任务**: 点击任务前的复选框来标记任务完成
3. **删除任务**: 点击任务右侧的"删除"按钮
4. **筛选任务**: 使用顶部的标签页切换查看全部/未完成/已完成的任务
5. **查看统计**: 底部显示当前的任务统计信息

## 🔧 核心组件

### AddTask.vue
- 负责新任务的输入和添加
- 支持键盘回车快捷添加
- 输入验证和清空功能

### TaskList.vue
- 展示任务列表
- 处理任务完成状态切换
- 提供删除任务功能

### Filter.vue
- 实现标签页筛选功能
- 支持全部/未完成/已完成三种筛选模式
- 响应式UI设计

## 📝 数据结构

```typescript
interface Task {
  text: string;        // 任务内容
  completed: boolean;  // 完成状态
}
```

## 🎨 样式特点

- 响应式设计，适配不同屏幕尺寸
- 现代化UI风格，使用绿色主题色
- 平滑的过渡动画效果
- 清晰的状态视觉反馈

## 📦 部署

项目已配置为支持 GitHub Pages 部署，base路径设置为 `/VueStudy/`。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目！

## 📄 许可证

MIT License

---

**注意**: 这是一个学习项目，展示了 Vue 3 的基本用法和组件化开发模式。
