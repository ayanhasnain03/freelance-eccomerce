import React, { useState } from "react";
import {
  useGetAllContactsQuery,
  useReplyContactMutation,
} from "../../redux/api/userApi";
import { toast } from "react-hot-toast";
import moment from "moment";

const ContactManagement: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [replyContact, setReplyContact] = useState<any | null>(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [isMessageModalOpen, setMessageModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState("");

  const { data, isLoading, error } = useGetAllContactsQuery({
    page: currentPage.toString(),
    limit: "10",
  });

  const [reply, { isLoading: isReplying }] = useReplyContactMutation();

  const handleReply = (contact: any) => {
    setReplyContact(contact);
    setReplyMessage(""); 
  };

  const handleCloseModal = () => {
    setReplyContact(null);
    setReplyMessage("");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSendReply = async () => {
    if (!replyMessage.trim()) {
      toast.error("Please enter a reply message.");
      return;
    }

    try {
      await reply({
        id: replyContact._id,
        data: { reply: replyMessage },
      }).unwrap();
      toast.success("Reply sent successfully!");
      handleCloseModal();
    } catch (error) {
      toast.error("Failed to send reply. Please try again.");
    }
  };

  const handleViewMessage = (message: string) => {
    setSelectedMessage(message);
    setMessageModalOpen(true);
  };

  const handleCloseMessageModal = () => {
    setMessageModalOpen(false);
    setSelectedMessage("");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-white via-gray-200 to-gray-400">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) {
    toast.error("Failed to fetch contacts. Please try again later.");
    return (
      <div className="flex items-center justify-center h-screen text-gray-700">
        <p>Error loading contacts.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gradient-to-r from-white via-gray-100 to-gray-300 rounded-xl">
      <h1 className="text-5xl font-bold text-gray-900 mb-6 text-center">
        Contact Management
      </h1>

      {data?.contacts?.length === 0 ? (
        <p className="text-center text-gray-500">No contacts found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.contacts?.map((contact: any) => (
            <div
              key={contact._id}
              className="bg-white p-6 rounded-lg shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300 ease-in-out"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-semibold text-gray-800">
                  {contact.name}
                </h2>
                <span className="text-gray-500 text-sm">
                  {moment(contact.date).format("MMM Do, YYYY")}
                </span>
              </div>

              <p
                className="text-gray-600 mt-2 cursor-pointer hover:text-[#fc0000] text-sm"
                onClick={() => handleViewMessage(contact.message)}
              >
                {contact.message.length > 100
                  ? `${contact.message.slice(0, 100)}...`
                  : contact.message}
              </p>

              {contact.reply && (
                <div className="mt-4 p-4 bg-gray-100 border-l-4 border-[#fc0000]">
                  <p className="text-sm font-semibold text-[#fc0000]">Reply:</p>
                  <p className="text-gray-700">{contact.reply}</p>
                </div>
              )}

              <div className="mt-4 space-y-2">
                <div className="flex items-center">
                  <span className="font-medium text-gray-700">Email:</span>
                  <p className="ml-2 text-gray-500">{contact.email}</p>
                </div>
                <div className="flex items-center">
                  <span className="font-medium text-gray-700">Phone:</span>
                  <p className="ml-2 text-gray-500">{contact.phoneNo}</p>
                </div>
                <div className="flex items-center">
                  <span className="font-medium text-gray-700">Created At:</span>
                  <p className="ml-2 text-gray-500">
                    {moment(contact.createdAt).format("DD-MM-YYYY")}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-between space-x-4">
                <button
                  className="bg-black text-white px-6 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 transform transition-all duration-200 ease-in-out"
                  onClick={() => handleReply(contact)}
                >
                  Reply
                </button>
                <button
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transform transition-all duration-200 ease-in-out"
                  onClick={() => window.open(`mailto:${contact.email}`)}
                >
                  Email Contact
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="mt-6 flex justify-center space-x-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-6 py-3 text-white bg-[#fc0000] rounded-lg shadow-md hover:bg-[#e50000] focus:outline-none disabled:bg-gray-400 transform transition-all duration-200 ease-in-out"
        >
          Prev
        </button>
        <span className="text-gray-800 text-lg">{`Page ${currentPage}`}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === data.totalPage}
          className="px-6 py-3 text-white bg-[#fc0000] rounded-lg shadow-md hover:bg-[#e50000] focus:outline-none disabled:bg-gray-400 transform transition-all duration-200 ease-in-out"
        >
          Next
        </button>
      </div>

      {/* Reply Modal */}
      {replyContact && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-70">
          <div className="bg-white p-8 rounded-lg w-96 shadow-lg transform scale-95 transition-all duration-300">
            <h2 className="text-2xl font-bold text-[#fc0000] mb-4">
              Reply to {replyContact?.name}
            </h2>
            <textarea
              className="w-full p-4 border border-gray-300 rounded-md mb-4"
              placeholder="Type your reply here..."
              rows={5}
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
            />
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={handleCloseModal}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
              >
                Close
              </button>
              <button
                onClick={handleSendReply}
                className="bg-[#fc0000] text-white px-6 py-2 rounded-lg hover:bg-[#e50000] disabled:opacity-50"
                disabled={isReplying}
              >
                {isReplying ? "Sending..." : "Send Reply"}
              </button>
            </div>
          </div>
        </div>
      )}

  
      {isMessageModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-70">
          <div className="bg-white p-8 rounded-lg w-96 shadow-lg">
            <h2 className="text-2xl font-bold text-[#fc0000] mb-4">
               Message
            </h2>
            <p className="text-gray-700">{selectedMessage}</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleCloseMessageModal}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactManagement;
