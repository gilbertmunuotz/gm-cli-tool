import { execa } from "execa";
import path from "path";
import ora from "ora";
import inquirer from "inquirer";

export async function createWebApp(name: string) {
  const spinner = ora();
  const projectPath = path.join(process.cwd(), name);

  // Step 1: Ask if user wants to customize certain options
  const { customize } = await inquirer.prompt([
    {
      type: "select",
      name: "customize",
      message: "Would you like to customize your app?",
      choices: [
        { name: "Yes, customize settings", value: true },
        { name: "No, use recommended defaults", value: false },
      ],
      default: true,
    },
  ]);

  // Step 2: Ask only customizable options if user chooses to customize
  let options: {
    srcDir?: boolean;
    agentsMd?: boolean;
    importAlias?: string;
  } = {};

  if (customize) {
    options = await inquirer.prompt([
      {
        type: "confirm",
        name: "srcDir",
        message: "Would you like your code inside a `src/` directory?",
        default: true,
      },
      {
        type: "confirm",
        name: "agentsMd",
        message: "Include AGENTS.md to guide coding agents?",
        default: false,
      },
      {
        type: "confirm",
        name: "importAlias",
        message: "Use import alias: @/*",
        default: false,
      },
    ]);
  }

  // Step 3: Build args for create-next-app
  const args: string[] = [
    "--yes",
    "create-next-app@latest",
    name,
    "--ts", // forced Yes
    "--eslint", // forced Yes
    "--react-compiler", // forced Yes
    "--tailwind", // forced Yes
    "--app", // App Router forced Yes
    options.srcDir ? "--src-dir" : "--no-src-dir",
    options.agentsMd ? "--agents-md" : "--no-agents-md",
    "--import-alias",
    options.importAlias || "@/*",
  ];

  // Step 4: Run create-next-app
  spinner.start("Creating Next.js app...");
  await execa("npx", args, { stdio: "inherit" });
  spinner.succeed("Next.js app created");

  // Step 5: Setup shadcn
  spinner.start("Setting up shadcn...");
  try {
    await execa("npx", ["shadcn@latest", "init"], {
      cwd: projectPath,
      stdio: "inherit",
    });
    spinner.succeed("shadcn configured");

    console.log(`\n🎉 Web app "${name}" is ready!\n`);
  } catch (error) {
    spinner.fail("Failed to setup shadcn");
    console.error(error);
    process.exit(1);
  }
}