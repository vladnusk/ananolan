import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

/**
 * Serves Decap CMS config so /admin/config.yml works.
 * Next.js would otherwise treat "admin" as [locale], causing 404.
 */
export async function GET() {
  const filePath = path.join(process.cwd(), "public", "admin", "config.yml");
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    return new NextResponse(content, {
      headers: {
        "Content-Type": "text/yaml",
        "Cache-Control": "public, max-age=0, must-revalidate",
      },
    });
  } catch {
    return new NextResponse("Config not found", { status: 404 });
  }
}
