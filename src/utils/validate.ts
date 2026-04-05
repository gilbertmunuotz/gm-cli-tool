export function validateProjectName(name: string) {
    if (!name || name.includes(" ")) {
        console.error("❌ Invalid project name");
        process.exit(1);
    }
    return name;
}