import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

const MIME_TYPES = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
};

// Serves files from public/uploads through an ordinary API route instead of
// Next's built-in public-folder static file serving. next/image's built-in
// optimizer makes an internal self-request to fetch local image sources,
// and on this host that self-request intermittently comes back empty for
// brand-new files served the normal public-folder way — routing through a
// plain dynamic route (the same mechanism every other /api/* endpoint here
// already uses reliably) sidesteps whatever is failing there.
export async function GET(req, { params }) {
  const { filename } = await params;

  const ext = filename.split(".").pop()?.toLowerCase();
  const contentType = MIME_TYPES[ext];
  const isSafeName = /^[a-zA-Z0-9_-]+\.[a-zA-Z0-9]+$/.test(filename);

  if (!contentType || !isSafeName) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    const filePath = path.join(process.cwd(), "public", "uploads", filename);
    const buffer = await readFile(filePath);

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
