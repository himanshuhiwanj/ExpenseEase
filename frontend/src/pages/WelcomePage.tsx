
import TypingAnimation from '../components/TypingAnimation'

const WelcomePage = () => {
  return (
    <div className='w-screen min-h-screen flex flex-col '>
     

     
      <nav className="w-full bg-white backdrop-blur-sm bg-opacity-80 shadow-lg fixed top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* App Name/Logo */}
        <div className="flex-shrink-0">
          <h1 className="text-xl md:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-green-600">
            ExpenseEase
          </h1>
        </div>

        {/* Auth Links */}
        <div className="flex px-10 space-x-1 md:space-x-1 items-center ">
          <a href="/login" className="font-semibold text-m md:text-md text-gray-800 hover:text-gray-600 transition-colors duration-300 px-6 py-2   hover:bg-gray-300 ">
            Login
          </a>
          <a href="/signup" className="font-bold text-m md:text-md text-purple-600 hover:text-purple-700 transition-colors duration-300  px-6 py-2   hover:bg-gray-300  ">
            Sign Up
          </a>
        </div>
      </div>
    </nav>
    
    {/* Two-column hero: typing (left) and CTA (right) */}
    <section className="w-full px-6 md:px-10 pt-20 pb-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="order-1">
          <TypingAnimation/>
        </div>
        <div className="order-2">
          <div className="bg-gradient-to-r from-purple-50 to-green-50 border border-gray-200 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Take control of your money with clarity and confidence
            </h2>
            <p className="mt-4 text-gray-600 text-base md:text-lg">
              Track every expense, plan smarter with savings goals, and export beautiful PDF reports.
              Your finances, organized and stress-free.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="/signup" className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors">
                Get Started
              </a>
              <a href="/login" className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-gray-800 font-semibold border border-gray-300 hover:bg-gray-100 transition-colors">
                I already have an account
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Features Section */}
    <section className="w-full px-6 md:px-10 pb-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900">Track Transactions</h3>
          <p className="mt-2 text-gray-600">Log income and expenses with category, date, reference, and payment mode.</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900">Plan Goals</h3>
          <p className="mt-2 text-gray-600">Create savings goals and keep your progress in sight on the dashboard.</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900">Export Reports</h3>
          <p className="mt-2 text-gray-600">Download a color-coded PDF report with running balance anytime.</p>
        </div>
      </div>
    </section>
    </div>
   
  )
}

export default WelcomePage
