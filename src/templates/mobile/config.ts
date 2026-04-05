import { execa } from "execa";
import fs from "fs-extra";
import path from "path";
import { validateProjectName } from "../../utils/validate.js";
import ora from "ora";

export async function createMobileApp(name: string) {
  const spinner = ora();
  name = validateProjectName(name);
  const projectPath = path.join(process.cwd(), name);

  // Step 1: Create Expo project
  spinner.start("🚀 Creating Expo app...");
  await execa("npx", ["create-expo-app@latest", name], {
    stdio: "inherit",
  });
  spinner.succeed("Expo app created");

  // Step 2: Reset project directories
  spinner.start("🧹 Resetting project structure...");

  const dirsToRemove = ["app", "components", "hooks", "constants", "scripts"];

  for (const dir of dirsToRemove) {
    const targetPath = path.join(projectPath, dir);

    if (await fs.pathExists(targetPath)) {
      await fs.remove(targetPath);
    }
  }

  spinner.succeed("Project cleaned");

  // Create new /app folder with index.tsx and _layout.tsx
  const appDir = path.join(projectPath, "app");
  await fs.ensureDir(appDir);
  await fs.writeFile(
    path.join(appDir, "index.tsx"),
    `import { Text, View } from 'react-native';

export default function RootLayout() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text>Hello, Expo + GM Stack!</Text>
    </View>
  );
}
`
  );
  await fs.writeFile(
    path.join(appDir, "_layout.tsx"),
    ` import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack />;
}
`
  );
  spinner.succeed("Project structure reset");

  // Step 3: Install dependencies
  spinner.start("📦 Installing dependencies...");
  await execa(
    "npm",
    ["install", "heroui-native", "react-native-svg", "tailwind-variants", "tailwind-merge", "uniwind"],
    { cwd: projectPath, stdio: "inherit" }
  );
  spinner.succeed("Dependencies installed");

  // Step 4: Create global.css file and Import it in main component file(rootLayout.tsx)
  spinner.start("⌛️ Creating global.css file...;")
  await fs.writeFile(
    path.join(projectPath, "global.css"),
    `
@import 'tailwindcss';
@import 'uniwind';
@import 'heroui-native/styles';

@source './node_modules/heroui-native/lib';
    `
  );
  await fs.writeFile(
    path.join(projectPath, "app", "_layout.tsx"),
    `
import '../global.css';
import { Slot } from "expo-router";

export default function RootLayout() {
  return <Slot />;
}
`
  );

  // Step 5: Create metro.config.js file and add the following code
  spinner.start("⚙️ creating metro.config.js...")
  await fs.writeFile(
    path.join(projectPath, "metro.config.js"),
    `
// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const { withUniwindConfig } = require('uniwind/metro');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

module.exports = withUniwindConfig(config, {
    cssEntryFile: './global.css',
    dtsFile: './uniwind-types.d.ts'
});
  `
  );
  spinner.succeed("Metro config created");

  // Step 6: Ensure folder structure
  spinner.start("📁 Creating folders...");
  const dirs = ["components", "lib", "hooks", "constants", "config", "library", "providers", "utils"];
  for (const dir of dirs) {
    await fs.ensureDir(path.join(projectPath, dir));
  }
  spinner.succeed("Folder structure ready");

  console.log(`\n✅ Mobile app "${name}" is ready!\n`);
}