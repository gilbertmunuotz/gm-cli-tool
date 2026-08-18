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

  // Step 2: Reset Expo starter project
  spinner.start("🧹 Resetting Expo project...");

  const dirsToRemove = ["src", "scripts"];

  for (const dir of dirsToRemove) {
    const targetPath = path.join(projectPath, dir);

    if (await fs.pathExists(targetPath)) {
      await fs.remove(targetPath);
    }
  }

  spinner.succeed("Project cleaned");

  // Create Expo Router structure
  const appDir = path.join(projectPath, "src", "app");

  await fs.ensureDir(appDir);

  await fs.writeFile(
    path.join(appDir, "index.tsx"),
    `import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
   <View className="flex-1 items-center justify-center">
      <Text>Hello, Expo + GM Stack!</Text>
    </View>
  );
}
});
`
  );

  await fs.writeFile(
    path.join(appDir, "_layout.tsx"),
    `import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack />;
}
`
  );

  spinner.succeed("Project structure reset");


  // Step 3: Create GM Stack source directories
  spinner.start("📁 Creating GM Stack folders...");

  const srcDir = path.join(projectPath, "src");

  const dirs = [
    "components",
    "config",
    "constants",
    "hooks",
    "lib",
    "library",
    "providers",
    "utils",
  ];

  for (const dir of dirs) {
    await fs.ensureDir(path.join(srcDir, dir));
  }

  spinner.succeed("GM Stack folders ready");


  // Step 4: Install styling dependencies
  spinner.start("🎨 Installing styling dependencies...");

  await execa(
    "npm",
    ["install", "tailwindcss", "uniwind"],
    {
      cwd: projectPath,
      stdio: "inherit",
    }
  );

  spinner.succeed("Styling dependencies installed");

  // Step 5: Create global.css file
  spinner.start("🎨 Creating global.css...");

  await fs.writeFile(
    path.join(projectPath, "src", "global.css"),
    `@import "tailwindcss";
@import "uniwind";
`
  );

  spinner.succeed("global.css created");

  // step 5.1: Update Expo Router root layout
  await fs.writeFile(
    path.join(projectPath, "src", "app", "_layout.tsx"),
    `import "../global.css";
import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack />;
}
`
  );

  // Step 6: Configure Metro for Uniwind
  spinner.start("⚙️ Configuring Metro for Uniwind...");

  await fs.writeFile(
    path.join(projectPath, "metro.config.js"),
    `const { getDefaultConfig } = require("expo/metro-config");
const { withUniwindConfig } = require("uniwind/metro");

/** @type {import("expo/metro-config").MetroConfig} */
const config = getDefaultConfig(__dirname);

module.exports = withUniwindConfig(config, {
  cssEntryFile: "./src/global.css",
  dtsFile: "./src/uniwind-types.d.ts",
});
`
  );

  spinner.succeed("Metro configured");

  // Step 7: Install HeroUI Native
  spinner.start("✨ Installing HeroUI Native...");

  await execa(
    "npm",
    [
      "install",
      "heroui-native",
      "react-native-svg",
      "tailwind-variants",
      "tailwind-merge",
    ],
    {
      cwd: projectPath,
      stdio: "inherit",
    }
  );

  spinner.succeed("HeroUI Native installed");

  // Step 8: Configure HeroUI Native styles
  spinner.start("🎨 Configuring HeroUI Native styles...");

  await fs.writeFile(
    path.join(projectPath, "src", "global.css"),
    `@import "tailwindcss";
  @import "uniwind";
  @import "heroui-native/styles";

  @source "./node_modules/heroui-native/lib";
  `
  );

  spinner.succeed("HeroUI Native styles configured");

  // Step 9: Configure HeroUI Native provider
  spinner.start("⚡ Configuring HeroUI Native provider...");

  await fs.writeFile(
    path.join(projectPath, "src", "app", "_layout.tsx"),
    `import "../global.css";

  import { Stack } from "expo-router";
  import { GestureHandlerRootView } from "react-native-gesture-handler";
  import { HeroUINativeProvider } from "heroui-native";

  export default function RootLayout() {
    return (
    <GestureHandlerRootView style= {{ flex: 1 }}>
    <HeroUINativeProvider>
    <Stack />
    </HeroUINativeProvider>
    </GestureHandlerRootView>
  );
}
`
  );

  spinner.succeed("HeroUI Native provider configured");

  // Step 10: Finish
  console.log(`
✅ Mobile app "${name}" is ready!

Next steps:
cd ${name}
npx expo start
`);
}