import { useState } from "react";
import { useDeleteUserMutation, useGetAllUsersQuery, useUpdateUserROleMutation } from "../../redux/api/userApi";
import { FaTrash } from "react-icons/fa";
import { debounce } from "lodash";
import toast from "react-hot-toast";
import ConfirmationModal from "../../components/shared/ConfirmModel";
import Loader from "../../components/shared/Loader/Loader";
import MenuBtn from "../../components/admin/MenuBtn";

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [modalType, setModalType] = useState<"delete" | "roleChange" | null>(null);
  const [newRole, setNewRole] = useState<string | null>(null);

  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const { data, error, isLoading } = useGetAllUsersQuery({ page, keyword: searchTerm });
const [updateRole, { isLoading: isUpdating }] = useUpdateUserROleMutation();
  const handlePageChange = (newPage: number) => setPage(newPage);

  const handleSearchChange = debounce((e) => setSearchTerm(e.target.value), 500);

  const handleDeleteClick = (userId: string) => {
    setSelectedUserId(userId);
    setModalType("delete");
  };

  const handleRoleClick = (userId: string, role: string) => {
    setSelectedUserId(userId);
    setNewRole(role);
    setModalType("roleChange");
  };

  const handleDeleteConfirm = async () => {
    if (!selectedUserId) return;
    try {
      const res = await deleteUser(selectedUserId).unwrap();
      toast.success(res?.data?.message || "User deleted successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete user.");
    } finally {
      setModalType(null);
      setSelectedUserId(null);
    }
  };

  const handleRoleConfirm = async () => {
    if (!selectedUserId || !newRole) return;
    try {
     
    const res = await updateRole({ id: selectedUserId, data: { role: newRole } }).unwrap();
      toast.success(res?.data?.message || "User role updated successfully!");
    } catch (error: any) {
      toast.error("Failed to update user role.");
    } finally {
      setModalType(null);
      setSelectedUserId(null);
      setNewRole(null);
    }
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedUserId(null);
    setNewRole(null);
  };

  if (isLoading) return <Loader />;
  if (error) return <div className="text-center text-red-500">Error loading users</div>;

  return (
    <div className="container mx-auto p-6 relative">
      <div className="absolute top-4 right-4">
        <MenuBtn />
      </div>
      <h2 className="text-3xl font-semibold mb-6">User Management ({data?.totalUsers})</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name"
          onChange={handleSearchChange}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

  
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        {data?.users?.length === 0 ? (
          <div className="text-center py-4 text-gray-500">No users found</div>
        ) : (
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-600">
                <th className="px-4 py-2 border-b">Name</th>
                <th className="px-4 py-2 border-b">Email</th>
                <th className="px-4 py-2 border-b">Role</th>
                <th className="px-4 py-2 border-b">Gender</th>
                <th className="px-4 py-2 border-b">Avatar</th>
                <th className="px-4 py-2 border-b">Created Date</th>
                <th className="px-4 py-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.users?.map((user: any) => (
                <tr key={user._id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border-b">{user.name}</td>
                  <td className="px-4 py-2 border-b">{user.email}</td>
                  <td className="px-4 py-2 border-b">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleClick(user._id, e.target.value)}
                      className="p-2 border border-gray-300 rounded"
                    >
                      <option value="user">user</option>
                      <option value="admin">
                        admin
                      </option>
                    </select>
                  </td>
                  <td className="px-4 py-2 border-b">{user.gender}</td>
                  <td className="px-4 py-2 border-b">
                    {user.avatar && user.avatar[0]?.url ? (
                      <img
                        src={user.avatar[0].url}
                        alt={user.name}
                        className="w-12 h-12 rounded-full"
                      />
                    ) : (
                      "No Avatar"
                    )}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border-b">
                    <button
                      onClick={() => handleDeleteClick(user._id)}
                      className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

   
      <div className="mt-4 flex justify-center">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 transition duration-300"
          >
            Previous
          </button>
          <span>
            Page {page} of {data?.totalPage || 1}
          </span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === data?.totalPage}
            className="px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 transition duration-300"
          >
            Next
          </button>
        </div>
      </div>

  
      {modalType === "delete" && (
        <ConfirmationModal
          isOpen={!!modalType}
          onClose={closeModal}
          onConfirm={handleDeleteConfirm}
          title="Delete User"
          description="Are you sure you want to delete this user? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          loading={isDeleting}
        />
      )}
      {modalType === "roleChange" && (
        <ConfirmationModal
          isOpen={!!modalType}
          onClose={closeModal}
          onConfirm={handleRoleConfirm}
          title="Change User Role"
          description={`Are you sure you want to change this user's role to ${newRole}?`}
          confirmText="Confirm"
          cancelText="Cancel"
          loading={false}
        />
      )}
    </div>
  );
};

export default UserManagement;