import { Command } from "commander";
import { createApp } from "../commands/create.js";
import inquirer from "inquirer";
import { readFileSync } from "node:fs";

const program = new Command();

function getCliVersion(): string {
  try {
    const pkgUrl = new URL("../../package.json", import.meta.url);
    const pkgRaw = readFileSync(pkgUrl, "utf8");
    const pkg = JSON.parse(pkgRaw) as { version?: unknown };
    return typeof pkg.version === "string" ? pkg.version : "0.0.0";
  } catch {
    return "0.0.0";
  }
}

program
  .name("create-gm-app")
  .description("CLI to scaffold GM Stack apps")
  .version(getCliVersion())
  .arguments("[type] [name]")
  .action(async (_type, _name) => {
    const answers = await inquirer.prompt([
      {
        type: "select",
        name: "type",
        message: "What do you want to build?",
        choices: [
          { name: "🌐 Web", value: "web" },
          { name: "📱 Mobile", value: "mobile" },
        ],
        default: "web",
        when: !_type // Only prompt if type not supplied
      },
      {
        type: "input",
        name: "name",
        message: "Project name:",
        validate: (input) =>
          input && !input.includes(" ") ? true : "Invalid project name",
        when: !_name // Only prompt if name not supplied
      }
    ]);

    const projectType = (_type || answers.type).toLowerCase();
    const projectName = (_name || answers.name).trim().toLowerCase().replace(/\s+/g, "-");

    await createApp(projectType, projectName);
  });

program.parse();