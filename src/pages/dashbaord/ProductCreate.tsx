import React, { useState, ChangeEvent, FormEvent } from "react";
import { useCreateProductMutation, useGetForWhatQuery } from "../../redux/api/productApi";
import toast from "react-hot-toast";
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa";
import { useDropzone } from "react-dropzone";

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

const ProductCreate: React.FC = () => {
  const [createProduct, { isLoading }] = useCreateProductMutation();
  
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    price: "",
    brand: "",
    stock: "",
    category: "",
    sizes: [],
    for: ["mens"],
    discount: 0,
    sale: false,
  });


  const [images, setImages] = useState<File[]>([]);


  const { data: categories, error } = useGetForWhatQuery(formData.for[0] || "");

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
    onDrop: (acceptedFiles) => handleImageChange(acceptedFiles),
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    //@ts-ignore
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (selectedFiles: File[]) => {
    const validFileExtensions = ["jpg", "jpeg", "png"];
    const validFiles = selectedFiles.filter((file) => {
      const fileExtension = file.name.split(".").pop()?.toLowerCase();
      if (!validFileExtensions.includes(fileExtension || "")) {
        toast.error(`Invalid file extension for ${file.name}`);
        return false;
      }
      if (images.some((img) => img.name === file.name)) {
        toast.error(`File ${file.name} is already uploaded!`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) {
      toast.error("No valid image files selected!");
    }

    setImages((prev) => [...prev, ...validFiles]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (images.length === 0) {
      toast.error("Please upload at least one image!");
      return;
    }

    if (formData.for.length === 0) {
      toast.error("Please select the target audience!");
      return;
    }

    const data = new FormData();
    images.forEach((file) => data.append("images", file));
    Object.keys(formData).forEach((key) => {
      const value = formData[key as keyof ProductFormData];
      if (Array.isArray(value)) {
        value.forEach((v) => data.append(`${key}[]`, v));
      } else {
        //@ts-ignore
        data.append(key, value);
      }
    });

    try {
      const response = await createProduct(data).unwrap();
      toast.success("Product created successfully!");
      console.log(response);
    } catch (error: any) {
      toast.error(error.data?.message || "Failed to create product");
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

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-lg p-8 space-y-8">
        <h1 className="text-3xl font-semibold text-gray-800 text-center">Create New Product</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Audience selection */}
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

          {/* Category Select */}
          {formData.for.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <select
                name="category"
                value={formData.category}
                //@ts-ignore
                onChange={handleChange}
                className="p-4 border rounded-md focus:ring-2 focus:ring-blue-500 w-full text-lg"
                required
              >
                <option value="">Select Category</option>
                {categories?.categories?.length ? (
                  //@ts-ignore
                  categories.categories.map((category) => (
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

        
          {error && <p className="text-red-500 text-sm">
        for What ?
            </p>}

     
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

          {/* Discount and Sale */}
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

          {/* Description */}
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Product Description"
            className="p-4 h-32 border rounded-md focus:ring-2 focus:ring-blue-500 w-full text-lg"
            required
          />

          {/* Sizes Selection */}
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

          {/* Image Upload Section */}
          <div className="border-dashed border-2 border-gray-300 rounded-lg p-6">
            <label className="block text-gray-600 text-lg mb-4">Upload Images</label>
            <div
              {...getRootProps()}
              className="cursor-pointer border-2 border-dashed border-gray-400 p-4 rounded-md text-center"
            >
              <input {...getInputProps()} className="hidden" />
              <FaCloudUploadAlt className="text-4xl text-gray-500 mb-2" />
              <p className="text-gray-600">Click or drag and drop to upload</p>
            </div>

            <div className="flex flex-wrap gap-4 mt-6">
              {images.map((image, index) => (
                <div
                  key={image.name}
                  className="relative w-24 h-24 rounded-md border overflow-hidden"
                >
                  <img src={URL.createObjectURL(image)} alt={image.name} className="object-cover w-full h-full" />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-white p-1 rounded-full text-red-500"
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 text-white bg-blue-600 rounded-lg font-semibold ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isLoading ? "Creating Product..." : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductCreate;
