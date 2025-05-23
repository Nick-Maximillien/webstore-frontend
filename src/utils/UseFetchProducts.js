// utils/UsefetchProducts.js

export async function UseFetchProducts() {
  try {
    const res = await fetch("https://online-store-production-b3b2.up.railway.app/products/");

    if (!res.ok) throw new Error("Failed to fetch products");

    const data = await res.json();

    console.log("Fetched products:", data);

    return data.map((product) => ({
      id: product.id,
      name: product.name,
      images:
        product.images?.map((img) => ({
          image: img.image_url?.startsWith("http")
            ? img.image_url
            : `https://online-store-production-b3b2.up.railway.app${img.image_url}`,
        })) || [],
      description: product.description,
      price: product.price,
      category: {
        id: product.category?.id,
        name: product.category?.name,
        description: product.category?.description,
        slug: product.category?.slug,
        image: product.category?.image_url,
      },
      featured: product.featured || false,
      recommended: product.recommended || false,
      trending: product.trending || false,
      rating: product.rating,
      slug: product.slug,
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
