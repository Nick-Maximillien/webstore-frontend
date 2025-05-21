export async function UseFetchTrendingProducts() {
    try {
      const res = await fetch("https://online-store-production-b3b2.up.railway.app/products/");
      if (!res.ok) throw new Error("Failed to fetch products");
  
      const { data } = await res.json();
      console.log("fetched data:", JSON.stringify(data, null, 2))
      return data.map((product) => ({
        id: product.id,
        name: product.name,
        images: product.image?.data?.map((img) => `https://online-store-production-b3b2.up.railway.app${img.url}`) || [],
        description: product.description,
        price: product.price,
        stock: product.stock,
        featured: product.Featured,
        bestseller: product.bestseller,
        Rating: product.rating,
        recommended: product.Recommended,
        trending: product.trending,
        slug: product.slug,
      }));
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  }
  