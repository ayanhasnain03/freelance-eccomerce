import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery, useUpdateProductMutation } from "../../redux/api/productApi";
import { useGetForWhatQuery } from "../../redux/api/productApi";

// Define the ProductFormData type
interface ProductFormData {
  name: string;
  description: string;
  price: string;
  brand: string;
  stock: string;
  category: string;
  sizes: string[];
  for: string[];
  discount: number;
  sale: boolean;
}

const UpdateProductPage: React.FC = () => {
  const params = useParams();
  const { data, error, isLoading } = useGetProductByIdQuery(params.id || "");
  const [updateProduct] = useUpdateProductMutation();

  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    price: "",
    brand: "",
    stock: "",
    category: "",
    sizes: [],
    for: [],
    discount: 0,
    sale: false,
  });



  const { data: categories} = useGetForWhatQuery(formData.for[0] || "");

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.product.name || "",
        description: data.product.description || "",
        price: data.product.price || "",
        brand: data.product.brand || "",
        stock: data.product.stock || "",
        category: data.product.category || "",
        sizes: data.product.sizes || [],
        for: data.product.for || [],
        discount: data.product.discount || 0,
        sale: data.product.sale || false,
      });
    }
  }, [data]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    //@ts-ignore
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (formData.for.length === 0) {
      toast.error("Please select the target audience!");
      return;
    }

    const productData = {
      name: formData.name,
      description: formData.description,
      price: formData.price,
      brand: formData.brand,
      stock: formData.stock,
      category: formData.category,
      sizes: formData.sizes,
      for: formData.for,
      discount: formData.discount,
      sale: formData.sale,
    };

    try {
      // Pass the product ID and data to the mutation
      const response = await updateProduct({
        id: params.id,
        data: productData,
      }).unwrap();

      toast.success("Product updated successfully!");
      console.log(response);
    } catch (error: any) {
      toast.error(error.data?.message || "Failed to update product");
    }
  };

  const handleSizeChange = (size: string) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const handleForChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const mappedValue = value.toLowerCase();

    setFormData((prev) => ({
      ...prev,
      for: checked ? [mappedValue] : [],
    }));
  };

  if (isLoading) return <div>Loading...</div>;
  //@ts-ignore
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-lg p-8 space-y-8">
        <h1 className="text-3xl font-semibold text-gray-800 text-center">Update Product</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex gap-6 items-center">
            {["Mens", "Womens", "Kids"].map((audience) => (
              <label key={audience} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={audience}
                  checked={formData.for.includes(audience.toLowerCase())}
                  onChange={handleForChange}
                  className="h-5 w-5"
                />
                <span className="text-lg">{audience}</span>
              </label>
            ))}
          </div>

          {formData?.for.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Conditionally render category dropdown based on selected audience */}
              <select
                name="category"
                value={formData.category}
                //@ts-ignore
                onChange={handleChange}
                className="p-4 border rounded-md focus:ring-2 focus:ring-blue-500 w-full text-lg"
                required
              >
                {categories?.categories?.length ? (
                  categories.categories.map((category: any) => (
                    <option key={category._id} value={category.name}>
                      {category.name}
                    </option>
                  ))
                ) : (
                  <option value="">No categories available</option>
                )}
              </select>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Product Name"
              className="p-4 border rounded-md focus:ring-2 focus:ring-blue-500 w-full text-lg"
              required
            />
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="Brand"
              className="p-4 border rounded-md focus:ring-2 focus:ring-blue-500 w-full text-lg"
              required
            />
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              className="p-4 border rounded-md focus:ring-2 focus:ring-blue-500 w-full text-lg"
              required
            />
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Stock"
              className="p-4 border rounded-md focus:ring-2 focus:ring-blue-500 w-full text-lg"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              placeholder="Discount (%)"
              className="p-4 border rounded-md focus:ring-2 focus:ring-blue-500 w-full text-lg"
            />
            <label className="flex items-center gap-2 text-lg">
              <input
                type="checkbox"
                name="sale"
                checked={formData.sale}
                onChange={handleChange}
                className="h-5 w-5"
              />
              <span>On Sale</span>
            </label>
          </div>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Product Description"
            className="p-4 h-32 border rounded-md focus:ring-2 focus:ring-blue-500 w-full text-lg"
            required
          />

          <div className="flex gap-6 items-center">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <label key={size} className="flex items-center gap-2 text-lg">
                <input
                  type="checkbox"
                  checked={formData.sizes.includes(size)}
                  onChange={() => handleSizeChange(size)}
                  className="h-5 w-5"
                />
                <span>{size}</span>
              </label>
            ))}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 text-white bg-blue-600 rounded-lg font-semibold ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isLoading ? "Updating Product..." : "Update Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProductPage;
