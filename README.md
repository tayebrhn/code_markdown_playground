# 🧠 Code & Markdown Playground

A **browser-based code and markdown editor** that executes JavaScript and supports `.jsx` and imports using `esbuild-wasm` and custom esbuild plugin. This project is a comprehensive sandbox that previews JavaScript output and renders markdown, all in real time — right from the browser.

---

## ✨ Features

- 🧮 **JavaScript & JSX Execution** — Powered by `esbuild-wasm`, including support for npm-style `import` syntax in `.jsx` files.
- ✍️ **Live Markdown Editor** — With preview rendering using `@uiw/react-md-editor`.
- 🧠 **Monaco Editor Integration** — Syntax highlighting, IntelliSense, and error checking.
- 🔄 **Redux-Powered State Management** — Built with `@reduxjs/toolkit`, `redux-thunk`, and `immer`.
- 🎨 **Prettier Integration** — Format your code with a single click.
- 📦 **Extensive npm Ecosystem Integration** — Exercises bundling, parsing, and transformation of JS modules in-browser.
- 🗃️ **Upcoming**: Save code and markdown content to files (WIP 🚧)

---

## 🚀 Tech Stack

- **Language**: TypeScript
- **Framework**: React
- **State Management**: Redux Toolkit
- **Build Tool**: Vite

---

## 📦 Dependencies

### Runtime

```json
{
  "@babel/parser": "^7.27.5",
  "@babel/traverse": "^7.27.4",
  "@fortawesome/fontawesome-free": "^6.7.2",
  "@monaco-editor/react": "4.7.0",
  "@reduxjs/toolkit": "^2.8.2",
  "@types/prettier": "2.7.3",
  "@types/react-resizable": "^3.0.8",
  "@uiw/react-md-editor": "^4.0.7",
  "axios": "^1.9.0",
  "bulmaswatch": "^0.8.1",
  "esbuild-wasm": "0.25.5",
  "immer": "^10.1.1",
  "localforage": "1.10.0",
  "monaco-jsx-highlighter": "2.77.77",
  "prettier": "3.5.3",
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "react-redux": "^9.2.0",
  "react-resizable": "3.0.5",
  "redux": "^5.0.1",
  "redux-thunk": "^3.1.0"
}
```

# 📁 Project Goals
## This project serves as a learning playground for working with:

- 
- TypeScript-heavy React apps
- 
- Redux Toolkit and middlewares
- 
- Browser bundling using esbuild-wasm
- 
- Markdown rendering in React
- 
- File persistence and local storage
- 
- Integration with npm module resolution

🛠️ Getting Started
bash
Copy
Edit
# Clone the repo
```
git clone https://github.com/ty-ab/jtbook.git
cd code-markdown-playground

# Install dependencies
npm install

# Run development server
npm run dev
```