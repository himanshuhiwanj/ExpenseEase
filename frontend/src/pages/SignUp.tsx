import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // For password visibility toggle
import LeftSection from '../components/signup/LeftSection';
import { useNavigate } from 'react-router-dom';
const API_URL1 = import.meta.env.VITE_API_URL;
const API_URL = `${API_URL1}/api/users/register`;
const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()

  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null >(null);
  const [success, setSuccess] = useState(false);
 

  const { firstName, lastName, email, password } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

   

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setSuccess(true);
      setFormData({ firstName: '', lastName: '', email: '', password: '' });
      console.log('User registered successfully:', data);
      navigate("/login");

    } catch (err) {
      setError(err instanceof Error? err.message : "");
      console.error('Error during registration:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-screen'>
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="flex bg-gray-800 rounded-lg shadow-xl overflow-hidden max-w-5xl w-full">
        {/* Left Section - Image Carousel and Text */}
        <LeftSection/>
        {/* Right Section - Signup Form */}
        <div className="w-full md:w-1/2 p-8 bg-gray-800 text-white flex flex-col justify-center">
          <h1 className="text-3xl font-semibold mb-2">Create an account</h1>
          <p className="text-gray-400 text-sm mb-6">
            Already have an account? <a href="/login" className="text-purple-400 hover:underline">Log in</a>
          </p>

          {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg relative mb-4">
          <span className="block sm:inline">Registration successful!</span>
        </div>
      )}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Fields */}
            <div className="flex space-x-4">
              <input
                type="text"
                value={firstName}
                name="firstName"
                onChange={handleChange}
                placeholder="First Name" // Placeholder text
                required
                className="flex-1 p-3 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
              />
              <input
                type="text"
                name="lastName"
                value={lastName}
                onChange={handleChange}
                placeholder="Last name" // Placeholder text
                required
                className="flex-1 p-3 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
              />
            </div>
            
            {/* Email Field */}
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full p-3 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
            />

            {/* Password Field */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                name="password"
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="w-full p-3 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10 placeholder-gray-400"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/*Terms & Conditions Checkbox
            <div className="flex items-center text-sm">
              <input 
                  type="checkbox" 
                  id="terms" 
                  checked={isTermsAccepted}
                  onChange={handleCheckboxChange} 
                  className="form-checkbox text-purple-600 bg-gray-700 border-gray-600 rounded" 
                  />
              <label htmlFor="terms" className="ml-2 text-gray-400">
                I agree to the <a href="#" className="text-purple-400 hover:underline">Terms & Conditions</a>
              </label>
            </div>*/}

            {/* Create Account Button */}
            <button
          type="submit"
          className={`w-full p-3 bg-purple-600 rounded-md hover:bg-purple-700 transition duration-300 font-semibold
            ${loading ? 'bg-purple-400 cursor-not-allowed' : ''}`}
          disabled={loading }
        >
          {loading ? 'Registering...' : 'Create Account'}
        </button>
          </form>

          {/* Or register with section */}
          

          
        </div>
      </div>
    </div>
    </div>
  );
};

export default SignupPage;