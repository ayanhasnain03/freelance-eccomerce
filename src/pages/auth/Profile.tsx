import { useSelector } from "react-redux";
import { useState } from "react";
import { FiUpload } from "react-icons/fi";
import { Link } from "react-router-dom";


const Profile = () => {
  const { user } = useSelector((state: any) => state.user);


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [avatar, setAvatar] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    gender: user.gender,
  });

  const handleEditClick = () => setIsModalOpen(true);
  const handlePasswordModalOpen = () => setIsPasswordModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleClosePasswordModal = () => setIsPasswordModalOpen(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(e.target.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated profile", formData, avatar);
    setIsModalOpen(false);
  };

  const handleLogout = () => {
console.log("Logout clicked");
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center text-gray-800">
      <div className="container mx-auto py-10 px-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-6xl mx-auto flex flex-col lg:flex-row">
          {/* Left Section */}
          <div className="text-white flex flex-col items-center py-8 px-6 lg:w-1/3">
            <img
              src={avatar ? URL.createObjectURL(avatar) : user.avatar[0]?.url || "https://i.pravatar.cc/300"}
              alt="Profile"
              className="w-40 h-40 rounded-full border-4 border-white object-cover shadow-2xl"
            />
            <h2 className="text-2xl font-semibold mt-4">{user.name}</h2>
            <p className="text-sm text-gray-200">{user.role}</p>
            <div className="mt-6">
              <button
                className="w-full bg-white text-blue-500 px-4 py-2 rounded-lg mb-3 hover:bg-gray-200 transition"
                onClick={handleEditClick}
              >
                Edit Profile
              </button>
              <button
                className="w-full bg-white text-blue-500 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
                onClick={handlePasswordModalOpen}
              >
                Update Password
              </button>

              {
                user.role === "admin" && (
                  <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-600 transition">
                    <Link to="/dashboard">Admin Dashboard</Link>
                  </button>
                )
              }


              <button
                className="w-full bg-red-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-red-600 transition"
                onClick={handleLogout}
              >
                Logout
              </button>

            </div>
          </div>
          {/* Right Section */}
          <div className="lg:w-2/3 p-8">
            <h3 className="text-xl font-semibold mb-4">About Me</h3>
            <p className="text-gray-700 mb-6">
              <strong>Gender:</strong> {user.gender}
            </p>
            <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <span className="bg-blue-100 text-blue-500 p-2 rounded-full mr-4">📧</span>
                <span>{user.email}</span>
              </li>
              <li className="flex items-center">
                <span className="bg-blue-100 text-blue-500 p-2 rounded-full mr-4">📞</span>
                <span>+1 (555) 123-4567</span>
              </li>
            </ul>
            <button className="mt-8 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition">
              View Orders
            </button>
          </div>
        </div>
      </div>
      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
            <h3 className="text-lg font-semibold mb-4">Edit Profile</h3>
            <div className="text-center mb-6">
              <div className="relative">
                <img
                  src={avatar ? URL.createObjectURL(avatar) : user.avatar[0]?.url || "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="mx-auto rounded-full w-32 h-32 object-cover"
                />
                <label
                  htmlFor="imageUpload"
                  className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer"
                >
                  <FiUpload className="w-5 h-5" />
                </label>
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Gender</label>
                <select
                  name="gender"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Password Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
            <h3 className="text-lg font-semibold mb-4">Update Password</h3>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">Current Password</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">New Password</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Confirm Password</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                  onClick={handleClosePasswordModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
