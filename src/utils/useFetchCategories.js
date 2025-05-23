export async function UseFetchCategories() {
  try {
    const res = await fetch("https://online-store-production-b3b2.up.railway.app/categories/", {
      next: { revalidate: 60 }, // ✅ ISR
    });

    if (!res.ok) throw new Error("Failed to fetch categories");

    const data = await res.json();
    console.log("Fetched categories:", data);

    return data.map((category) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description,
      featured: category.featured || false,
      images: category.image_url
        ? [{ image: category.image_url.replace("http://", "https://") }]
        : [],
    }));
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
