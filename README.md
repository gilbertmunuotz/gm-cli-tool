# create-gm-app

🚀 A professional CLI tool to scaffold modern **Web** and **Mobile** applications with a clean, production-ready setup.

---

## ✨ Features

* ⚡ Fast project scaffolding using **npx**
* 🌐 Web stack (Next.js + Tailwind + shadcn/ui)
* 📱 Mobile stack (Expo + HeroUI + Uniwind)
* 🧠 Smart interactive CLI (Inquirer-based)
* 🧹 Clean project structure out of the box
* 🔧 Minimal but scalable architecture
* 🧩 Built for extensibility (future stacks)

---

## 📦 Installation (No global install required)

```bash
npx create-gm-app
```

Or specify directly:

```bash
npx create-gm-app web my-app
npx create-gm-app mobile my-app
```

---

## 🧱 Supported Stacks

### 🌐 Web Stack

* Next.js (App Router)
* TypeScript
* Tailwind CSS
* shadcn/ui
* ESLint
* React Compiler (enabled)

#### Optional Customization

* `src/` directory
* Import alias (`@/*`)
* AGENTS.md support

---

### 📱 Mobile Stack

* Expo (latest)
* TypeScript
* HeroUI Native
* Uniwind (Tailwind for React Native)
* React Native Reanimated
* Gesture Handler

#### Includes

* Clean folder structure:

  ```
  app/
  components/
  lib/
  hooks/
  ```
* Babel configured for Reanimated
* Reset of default Expo boilerplate

---

## 🧑‍💻 Usage

### Interactive Mode

```bash
npx create-gm-app
```

You’ll be prompted to choose:

* Project type (Web / Mobile)
* Project name
* Customization options

---

### Direct Mode

```bash
npx create-gm-app web my-app
npx create-gm-app mobile my-app
```

---

## 📁 Project Structure (CLI)

```
gm-stack/
├── bin/                # CLI entry
├── src/
│   ├── cli/            # CLI logic
│   ├── commands/       # Commands (create, etc.)
│   ├── templates/      # Web & Mobile templates
│   └── utils/          # Helpers (validation, etc.)
```

---

## 🛠️ Development

Clone the repo:

```bash
git clone https://github.com/your-username/gm-stack.git
cd gm-stack
npm install
```

Run locally:

```bash
npm link
npm run build
npx create-gm-app
```

---

## 📌 Roadmap

* [ ] More templates (e.g., SaaS starter, dashboard)
* [ ] Plugin system
* [ ] Config file support (`gm.config.json`)
* [ ] CI/CD presets
* [ ] Database integrations (Prisma, Supabase)

---

## 🤝 Contributing

Contributions are welcome. Feel free to open issues or submit PRs.

---

## 📄 License

MIT License

---

## 👤 Author

**Gilbert Munuo**
Aspiring Software Developer | Builder of scalable developer tools
