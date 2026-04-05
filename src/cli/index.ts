import { Command } from "commander";
import { createApp } from "../commands/create.js";
import inquirer from "inquirer";

const program = new Command();

program
  .name("create-gm-app")
  .description("CLI to scaffold GM Stack apps")
  .version("1.0.0")
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