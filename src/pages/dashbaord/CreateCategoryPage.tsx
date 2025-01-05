import { useState } from "react";
import { useCreateCategoriesMutation } from "../../redux/api/productApi";
import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

const CreateCategoryPage = () => {
  const [create, { isLoading }] = useCreateCategoriesMutation();
const navigate = useNavigate();
  const [category, setCategory] = useState({
    name: "",
    forWhat: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    forWhat: "",
  });

  const validateForm = () => {
    const newErrors = {
      name: category.name ? "" : "Category name is required.",
      forWhat: category.forWhat ? "" : "Target audience is required.",
    };

    setErrors(newErrors);

    return !newErrors.name && !newErrors.forWhat;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setCategory((prevState) => ({
      ...prevState,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return; 

    try {
      const res = await create(category).unwrap();
      toast.success(res?.data?.message || "Category created successfully!");
      setCategory({ name: "", forWhat: "" }); 
navigate("/dashboard/categories");
    } catch (error) {
      //@ts-ignore
      toast.error(error?.data?.message || "Failed to create category.");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6 flex justify-center items-center">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Create Category</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
     
          <div>
            <label htmlFor="name" className="block text-lg font-medium text-gray-600">
              Category Name
            </label>
            <input
              type="text"
              id="name"
              value={category.name}
              onChange={(e) => handleInputChange(e, "name")}
              className={`w-full p-3 mt-2 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter category name"
              disabled={isLoading}
              aria-describedby="name-error"
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1" id="name-error">
                {errors.name}
              </p>
            )}
          </div>

    
          <div>
            <label htmlFor="forWhat" className="block text-lg font-medium text-gray-600">
              For What
            </label>
            <input
              type="text"
              id="forWhat"
              value={category.forWhat}
              onChange={(e) => handleInputChange(e, "forWhat")}
              className={`w-full p-3 mt-2 border ${errors.forWhat ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter target audience (e.g., Womens)"
              disabled={isLoading}
              aria-describedby="forWhat-error"
            />
            {errors.forWhat && (
              <p className="text-sm text-red-500 mt-1" id="forWhat-error">
                {errors.forWhat}
              </p>
            )}
          </div>

         
          <div className="flex justify-center">
            <button
              type="submit"
              className={`w-full py-3 text-white font-semibold rounded-lg shadow-lg transition duration-300 ${
                isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Create Category"}
            </button>
          </div>
        </form>

       
        <div className="mt-8 bg-gray-50 p-4 rounded-md">
          <h3 className="text-lg font-medium text-gray-700">Category Preview</h3>
          <div className="mt-4">
            <p className="text-sm text-gray-600"><strong>Name:</strong> {category.name || "No name set"}</p>
            <p className="text-sm text-gray-600"><strong>For What:</strong> {category.forWhat || "No audience set"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCategoryPage;
