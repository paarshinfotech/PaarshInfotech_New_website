"use client";

import { useParams } from "next/navigation";
import { productsData } from "@/lib/productsData";
import { ProductForm } from "@/components/admin/products/ProductForm";
import { useEffect, useState } from "react";
import type { Product } from "@/lib/productsData";

export default function EditProductPage() {
  const params = useParams();
  const { slug } = params;
  const [product, setProduct] = useState<Product | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (slug) {
      const foundProduct = productsData.find((p) => p.id === slug);
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        setNotFound(true);
      }
    }
  }, [slug]);

  if (notFound) {
    return <div className="p-8">Product not found.</div>;
  }

  if (!product) {
    return <div className="p-8">Loading product data...</div>;
  }

  return <ProductForm product={product} />;
}
