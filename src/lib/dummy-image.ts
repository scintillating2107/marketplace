/** Seeded placeholder images for demo content (picsum.photos). */
export function dummyImage(seed: string, width = 800, height = 600): string {
  const slug = encodeURIComponent(seed.replace(/\s+/g, "-").toLowerCase());
  return `https://picsum.photos/seed/${slug}/${width}/${height}`;
}
