import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const API_URL1 = import.meta.env.VITE_API_URL;

const API_URL = `${API_URL1}/api/users/login`;

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { email, password } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields.");
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      console.log("Using backend API 1:", API_URL);
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log("Using backend API 2:", API_URL);
      let data: any = {};
      const text = await response.text();
      console.log("Using backend API 3:", API_URL);
      if (text) {
        try { data = JSON.parse(text); } catch { /* ignore parse error */ }
      }

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      // Store both the token and the email received from the API response
      if (data?.token) localStorage.setItem('token', data.token);
      if (data?.email) localStorage.setItem('email', data.email);

      setSuccess(true);
      console.log('User logged in successfully:', data);
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-screen'>
      <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
        <div className="flex bg-gray-800 rounded-lg shadow-xl overflow-hidden max-w-5xl w-full">
          {/* Left Section (Placeholder for consistency) */}
          <div className="hidden md:flex w-1/2 bg-gray-900 text-white p-12 flex-col justify-between items-center relative">
            <h2 className="text-4xl font-bold mb-4">Expense Ease</h2>
            <div className="relative w-full h-80 flex items-center justify-center">
              {/* This is where a carousel or static image would go */}
              <div className="absolute inset-0 bg-purple-600 rounded-full opacity-10"></div>
              <div className="absolute inset-10 bg-purple-600 rounded-full opacity-10"></div>
              <h1 className="text-5xl font-extrabold text-white text-center">Welcome Back</h1>
            </div>
            <p className="text-gray-400 text-sm mt-4">
              Access your expense data and stay on top of your finances with ease.
            </p>
          </div>

          {/* Right Section - Login Form */}
          <div className="w-full md:w-1/2 p-8 bg-gray-800 text-white flex flex-col justify-center">
            <h1 className="text-3xl font-semibold mb-2">Log in to your account</h1>
            <p className="text-gray-400 text-sm mb-6">
              Don't have an account? <a href="/signup" className="text-purple-400 hover:underline">Sign up</a>
            </p>

            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg relative mb-4">
                <span className="block sm:inline">Login successful!</span>
              </div>
            )}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4">
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
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
                  placeholder="Password"
                  required
                  className="w-full p-3 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10 placeholder-gray-400"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
                      <path fillRule="evenodd" d="M1.5 12c0-1.284 3.146-7 10.5-7 7.353 0 10.5 5.716 10.5 7s-3.147 7-10.5 7c-7.354 0-10.5-5.716-10.5-7ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.5 12c0 1.284-3.147 7-10.5 7-1.542 0-3.146-.382-4.664-1.064l-.973-.487-.974-.488a.75.75 0 1 1 .974-1.632l.974.488.973.487c1.474.673 3.017 1.034 4.591 1.034 5.927 0 8.529-4.236 9.49-6.096a.75.75 0 0 0 0-.818c-.96-1.86-3.563-6.095-9.49-6.095-1.574 0-3.117.361-4.591 1.034l-4.593 2.096a.75.75 0 0 0-.585.875.75.75 0 0 0 .875.585l2.454-1.121c1.235-.564 2.544-.925 3.906-.925 6.001 0 9.495 4.14 10.5 5.715Z" />
                      <path d="M12.984 9.714a.75.75 0 0 1 1.054 1.06l-3.864 3.863a.75.75 0 0 1-1.055-1.06l3.864-3.863Z" />
                      <path d="m11.135 7.641-3.322 3.322a.75.75 0 0 1-1.246-.708l1.09-3.966a.75.75 0 0 1 .961-.594 6.78 6.78 0 0 1 .47-.19ZM12 9a3 3 0 0 1 3 3v.25l-.578.578a.75.75 0 0 1-1.06-1.06L13.939 12a1.5 1.5 0 0 0-1.414-1.414L12 10.586V10.5A3 3 0 0 1 12 9Z" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Forgot Password Link */}
              <div className="text-right text-sm">
                <a href="#" className="text-purple-400 hover:underline">Forgot password?</a>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className={`w-full p-3 bg-purple-600 rounded-md hover:bg-purple-700 transition duration-300 font-semibold
                  ${loading ? 'bg-purple-400 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
