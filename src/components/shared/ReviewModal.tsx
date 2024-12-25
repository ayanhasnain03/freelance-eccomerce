import React, { useState, ChangeEvent, FormEvent } from 'react';
import { FaStar, FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useCreateReviewMutation } from '../../redux/api/productApi';

interface ReviewModalProps {
  productId: string;
  isOpen: boolean;
  closeModal: () => void;
}

const MAX_COMMENT_LENGTH = 50; 

const ReviewModal: React.FC<ReviewModalProps> = ({ productId, isOpen, closeModal }) => {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number | null>(null);
  const [comment, setComment] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [createReview, { isLoading }] = useCreateReviewMutation();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile) {

      if (selectedFile.size > 5000000) {
        toast.error('File size should not exceed 5MB.');
        return;
      }
  
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(selectedFile.type)) {
        toast.error('Only JPEG, JPG, or PNG images are allowed.');
        return;
      }

      setFile(selectedFile);


      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_COMMENT_LENGTH) {
      setComment(value);
    }
  };

  const submitReview = async (e: FormEvent) => {
    e.preventDefault();

    if (rating === 0 || rating < 1 || rating > 5) {
      toast.error('Please select a rating between 1 and 5');
      return;
    }

    if (!comment.trim()) {
      toast.error('Comment is required');
      return;
    }

    const formData = new FormData();
    formData.append('productId', productId);
    formData.append('rating', String(rating)); 
    formData.append('comment', comment);
    if (file) formData.append('reviewImage', file);

    try {
     
      await createReview(formData).unwrap();

      toast.success('Review submitted successfully!');

      setRating(0);
      setComment('');
      setFile(null);
      setImagePreview(null);
      closeModal();
    } catch (error: any) {
      toast.error(error?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className={`fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 ${isOpen ? 'block' : 'hidden'}`}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <FaTimes size={20} />
        </button>
        <h2 className="text-2xl font-semibold mb-4">Submit Your Review</h2>

        <form onSubmit={submitReview} className="space-y-4">
          <div className="flex items-center">
            <span className="mr-2">Rating:</span>
            {[...Array(5)].map((_, index) => {
              const starRating = index + 1;
              return (
                <FaStar
                  key={index}
                  className={`cursor-pointer text-xl ${starRating <= (hover || rating) ? 'text-yellow-500' : 'text-gray-300'}`}
                  onClick={() => setRating(starRating)}
                  onMouseEnter={() => setHover(starRating)}
                  onMouseLeave={() => setHover(null)}
                />
              );
            })}
          </div>

          <div>
            <textarea
              value={comment}
              onChange={handleCommentChange}
              placeholder="Write your review here..."
              className="w-full p-2 border border-gray-300 rounded-md"
              rows={4}
            />
            <div className="text-sm text-gray-500 mt-1">
              {comment.length}/{MAX_COMMENT_LENGTH} characters
            </div>
          </div>

          <div>
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {imagePreview && (
            <div className="mt-4">
              <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-md border border-gray-300" />
            </div>
          )}

          <div className="flex justify-between items-center mt-4">
            <button type="button" onClick={closeModal} className="text-gray-700 hover:text-gray-500">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`bg-teal-600 text-white px-4 py-2 rounded-md ${isLoading ? 'opacity-50' : ''}`}
            >
              {isLoading ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
