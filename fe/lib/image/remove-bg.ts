export async function removeBackground(file: File): Promise<Blob | null> {
  try {
    const formData = new FormData();
    formData.append("image_file", file);
    formData.append("size", "auto");

    const res = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: {
        "X-Api-Key": process.env.NEXT_PUBLIC_REMOVE_BG_API_KEY!,
      },
      body: formData,
    });

    if (!res.ok) {
      console.error("RemoveBG failed:", await res.text());
      return null;
    }

    const blob = await res.blob(); // transparent PNG
    return blob;
  } catch (err) {
    console.error("removeBackground error:", err);
    return null;
  }
}