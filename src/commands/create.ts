import { createMobileApp } from "../templates/mobile/config.js";
import { createWebApp } from "../templates/web/config.js";

export async function createApp(type: string, name: string) {
    type = type.toLowerCase();
    if (type === "web") {
        await createWebApp(name);
    } else if (type === "mobile") {
        await createMobileApp(name);
    } else {
        console.error("❌ Invalid type: use 'mobile' or 'web'");
        process.exit(1);
    }
}