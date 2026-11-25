import type { MetadataRoute } from "next";

// Ingen søgemaskiner: demoerne viser fiktive firmaer.
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", disallow: "/" } };
}
