import { useState } from "react";
import {
  useDeleteCAtegoriesMutation,
  useGetForWhatQuery,
} from "../../redux/api/productApi";
import toast from "react-hot-toast";
import { FaTrashAlt } from "react-icons/fa";
import { FaSpinner } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const CategoryManagement = () => {
const navigate = useNavigate();
    const [forWhat, setForWhat] = useState("Womens");

  const { data, isLoading, isError } = useGetForWhatQuery(forWhat);
  const [deleteHandler, { isLoading: deleteLoading }] =
    useDeleteCAtegoriesMutation();

  const handleDelete = (id: string) => {
    deleteHandler(id)
      .unwrap()
      .then(() => {
        toast.success("Category deleted successfully!");
      })
      .catch((error: any) => {
        toast.error(error?.data?.message || "Failed to delete category.");
      });
  };

  if (isLoading)
    return (
      <div className="text-center text-gray-500">Loading categories...</div>
    );
  if (isError)
    return (
      <div className="text-center text-red-600">Error fetching categories.</div>
    );


  const categories = data?.categories || [];

  return (
    <div className="min-h-screen bg-gray-50 py-8 flex justify-center items-center">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg border border-gray-200">
    
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700">
            Filter by Audience
          </label>
          <select
            value={forWhat}
            onChange={(e) => setForWhat(e.target.value)}
            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="Womens">Womens</option>
            <option value="Mens">Mens</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Category Management
        </h2>

        
        <div className="overflow-x-auto">
          {categories.length === 0 ? (
            <div className="text-center text-gray-600">No categories found for {forWhat}.</div>
          ) : (
            <table className="min-w-full table-auto text-left">
              <thead>
                <tr className="bg-gray-100 text-sm font-medium text-gray-700">
                  <th className="px-4 py-2">Category Name</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category: any) => (
                  <tr
                    key={category._id}
                    className="border-b hover:bg-gray-50 transition duration-200"
                  >
                    <td className="px-4 py-2 text-gray-600">{category.name}</td>
                    <td className="px-4 py-2">
                    
                      <button
                        onClick={() => handleDelete(category._id)}
                        className="text-red-600 hover:text-red-800 transition duration-200"
                        disabled={deleteLoading}
                      >
                        {deleteLoading ? (
                          <FaSpinner className="animate-spin" />
                        ) : (
                          <FaTrashAlt />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

<Link to="/dashboard/categories/create" className="text-blue-600 hover:text-blue-800 transition duration-200">

<div className="mt-8 text-center">
          <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300">
            Create New Category
          </button>
        </div>
</Link>
      </div>
    </div>
  );
};

export default CategoryManagement;
