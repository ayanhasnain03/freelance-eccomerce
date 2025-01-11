import { lazy, useState } from "react";
import { useDeleteProductMutation, useGetForWhatQuery, useGetProductsQuery } from "../../redux/api/productApi";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../../components/shared/Loader/Loader";
import Skeleton from "../../components/shared/Skeleton";
const MenuBtn = lazy(() => import("../../components/admin/MenuBtn"));
const ProductManagement = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState("");
  const [forWhat, setForWhat] = useState("");
  const [search, setSearch] = useState(""); 
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data: categories } = useGetForWhatQuery(forWhat);
  const { data, isLoading, refetch } = useGetProductsQuery({
    category,
    price,
    sizes,
    forwhat: forWhat,
    page,
    limit: pageSize,
    search: search || "", 
  });
const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  if (isLoading) return <Loader />;


  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
 const res = deleteProduct(id).unwrap();
 //@ts-ignore
 toast.success(res?.data?.message || "Product deleted successfully!");
 refetch()
    }
  };

  const handleUpdate = (id: string) => {
navigate(`/dashboard/product/update/${id}`);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleForWhatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setForWhat(value);
    setCategory("");
    setPrice("");
    setSizes("");
    setSearch("");
    setPage(1);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <MenuBtn/>
      <h1 className="text-2xl font-semibold mb-4">Product Management</h1>
      <Link to="/dashboard/product/create">
        <button className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Add Product
        </button>
      </Link>

      <div className="mb-6 flex gap-4 flex-wrap">
        <input
          type="text"
          className="p-2 border border-gray-300 rounded w-full sm:w-72"
          placeholder="Search Products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="p-2 border border-gray-300 rounded"
          value={forWhat}
          onChange={handleForWhatChange}
        >
          <option value="">Select For What</option>
          <option value="womens">For Women</option>
          <option value="mens">For Men</option>
          <option value="kids">For Kids</option>
        </select>

  
        {forWhat && (
          <select
            className="p-2 border border-gray-300 rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories?.categories?.map((category:any) => (
              <option key={category._id} value={category.Name}>
                {category.name}
              </option>
            ))}
          </select>
        )}

        <select
          className="p-2 border border-gray-300 rounded"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        >
          <option value="">Select Price Range</option>
          <option value="0-500">0 - 500</option>
          <option value="500-1000">500 - 1000</option>
          <option value="1000-2000">1000 - 2000</option>
        </select>

        <select
          className="p-2 border border-gray-300 rounded"
          value={sizes}
          onChange={(e) => setSizes(e.target.value)}
        >
          <option value="">Select Size</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>
      </div>

      <div className="overflow-x-auto">
     {
      isDeleting ? (
        <Skeleton quantity={3} />
      ):(
        <table className="min-w-full table-auto border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 text-left">Image</th>
            <th className="border p-2 text-left">Product Name</th>
            <th className="border p-2 text-left">Category</th>
            <th className="border p-2 text-left">Price</th>
            <th className="border p-2 text-left">Sizes</th>
            <th className="border p-2 text-left">Stock</th>
            <th className="border p-2 text-left">Sold</th>
            <th className="border p-2 text-left">Discount</th>
            <th className="border p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.products?.map((product:any) => (
            <tr key={product._id} className="hover:bg-gray-50">
              <td className="border p-2 text-center">
                <img
                  src={product.images[0].url}
                  alt={product.name}
                  className="w-16 h-16 object-cover mx-auto"
                />
              </td>
              <td className="border p-2">{product?.name}</td>
              <td className="border p-2">{product?.category?.name}</td>
              <td className="border p-2">
                {Math.floor(
                  product?.price - (product?.price * product?.discount) / 100
                )}{" "}
                ₹
              </td>
              <td className="border p-2">{product?.sizes.join(", ")}</td>
              <td className="border p-2">{product?.stock}</td>
              <td className="border p-2">{product?.sold}</td>
              <td className="border p-2">
                {product?.discount ? `${product?.discount}%` : "No Discount"}
              </td>
              <td className="border p-2 flex justify-center gap-2">
                <button
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                  onClick={() => handleUpdate(product._id)}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )
     }
      </div>


      <div className="mt-4 flex justify-between items-center">
        <div>
          <span>{`Total Products: ${data?.totalProducts}`}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
          >
            Previous
          </button>
          <span>{`Page ${page} of ${data?.totalPage}`}</span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={data?.totalProducts <= page * pageSize}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;
