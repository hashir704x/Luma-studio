import ImageKit, { toFile } from "@imagekit/nodejs";

if (!process.env["IMAGEKIT_PRIVATE_KEY"]) {
  throw new Error("IMAGEKIT_PRIVATE_KEY is not set.");
}

let client: InstanceType<typeof ImageKit> | null = null;

export function getImageKitClient() {
  if (!client) {
    client = new ImageKit({
      privateKey: process.env["IMAGEKIT_PRIVATE_KEY"],
    });
  }
  return client;
}

export async function uploadBufferToImageKit(params: {
  buffer: Buffer;
  fileName: string;
  folder: string;
  mimeType: string;
}) {
  const client = getImageKitClient();
  const file = await toFile(params.buffer, params.fileName, {
    type: params.mimeType,
  });
  const result = await client.files.upload({
    file,
    fileName: params.fileName,
    folder: params.folder,
    useUniqueFileName: true,
  });
  return {url: result.url!, fileId: result.fileId!};
}
