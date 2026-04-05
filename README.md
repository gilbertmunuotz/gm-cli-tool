# create-gm-app

![npm version](https://img.shields.io/npm/v/create-gm-app)
![npm downloads](https://img.shields.io/npm/dm/create-gm-app)

🚀 Scaffold modern **Web (Next.js)** and **Mobile (Expo)** apps with a clean, production-ready setup.

---

## ⚡ Quick Usage

```bash
npx create-gm-app
```

Or:

```bash
npx create-gm-app web my-app
npx create-gm-app mobile my-app
```

---

## 🧱 Stacks

### 🌐 Web

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui

### 📱 Mobile

- Expo
- HeroUI Native
- Uniwind
- Reanimated + Gesture Handler

---

## ✨ Core Features

- Interactive CLI (Inquirer)
- Clean, scalable architecture
- Production-ready setup

---

## 📚 Full Documentation

For complete setup details, customization options, development workflow, and roadmap:

👉 https://github.com/gilbertmunuotz/gm-cli-tool

---

# 📖 GitHub Documentation (Full)

## ✨ Features

- ⚡ Fast project scaffolding using **npx**
- 🌐 Web stack (Next.js + Tailwind + shadcn/ui)
- 📱 Mobile stack (Expo + HeroUI + Uniwind)
- 🧠 Smart interactive CLI (Inquirer-based)
- 🧹 Clean project structure out of the box
- 🔧 Minimal but scalable architecture
- 🧩 Built for extensibility (future stacks)

---

## 🧱 Supported Stacks

### 🌐 Web Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- ESLint
- React Compiler (enabled)

#### Optional Customization

- `src/` directory
- Import alias (`@/*`)
- AGENTS.md support

---

### 📱 Mobile Stack

- Expo (latest)
- TypeScript
- HeroUI Native
- Uniwind (Tailwind for React Native)
- React Native Reanimated
- Gesture Handler

#### Includes

```
app/
components/
lib/
hooks/
```

- Babel configured for Reanimated
- Reset of default Expo boilerplate

---

## 🧑‍💻 Usage

### Interactive Mode

```bash
npx create-gm-app
```

### Direct Mode

```bash
npx create-gm-app web my-app
npx create-gm-app mobile my-app
```

---

## 📁 Project Structure (CLI)

```
gm-stack/
├── bin/
├── src/
│   ├── cli/
│   ├── commands/
│   ├── templates/
│   └── utils/
```

---

## 🛠️ Development

```bash
git clone https://github.com/gilbertmunuotz/gm-stack.git
cd gm-stack
npm install
npm link
npm run build
npx create-gm-app
```

---

## 📌 Roadmap

- [ ] More templates (SaaS, dashboards)
- [ ] Plugin system
- [ ] Config support (`gm.config.json`)
- [ ] CI/CD presets
- [ ] Database integrations (Prisma, Supabase)

---

## 🤝 Contributing

PRs and issues are welcome.

---

## 📄 License

MIT License

---

## 👤 Author

**Gilbert Munuo**
🌐 https://www.gilbertmunuotz.com
