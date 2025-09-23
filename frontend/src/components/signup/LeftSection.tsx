import { useState , useEffect } from 'react';
import localImage from '../../assets/image.png';
const LeftSection = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
      // Define your image URLs here
      const images = [
        'https://media.istockphoto.com/id/1319517808/vector/man-stands-at-a-huge-calculator-finance-and-investments-budgeting-vector-flat-illustration.jpg?s=612x612&w=0&k=20&c=9PH-J-VFM91uo9D7S4E3exTCJ-d8dWuoRnrPVViqRc0=', // Replace with your first image URL
        'https://cdn.dribbble.com/userupload/19636912/file/still-8fbb07225a27a2f91872f221445621bf.png?resize=400x0', // Replace with your second image URL
        localImage,   // Replace with your third image URL
        // Add more image URLs as needed
      ];

      // Effect to handle automatic image rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % images.length // Loop back to the first image
      );
    }, 5000); // Change image every 5 seconds (5000 milliseconds)

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, [images.length]); // Re-run effect if the number of images changes

  return (
    
      <div className="relative   bg-gray-700 p-8 flex flex-col justify-between hidden md:flex">
          <div className="absolute inset-0">
            {/* Image Carousel */}
            {images.map((imageSrc, index) => (
              <img
                key={index}
                src={imageSrc}
                alt={`Background ${index + 1}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                  index === currentImageIndex ? 'opacity-70' : 'opacity-0'
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
          </div>
          
          <div className="relative z-10 flex justify-between items-start">
            {/* Logo/Brand Name */}
            <div className="text-white text-3xl font-bold">ExpenseEase</div> 
            {/* Back to website button */}
            
          </div>

          <div className="relative z-10 text-white mt-auto">
            {/* Main tagline */}
            <h2 className="text-3xl font-semibold mb-4">Add Expenses, View Reports, and Stay on Top of Your Finances</h2>
            {/* Carousel indicators */}
            <div className="flex space-x-2 mt-4">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentImageIndex ? 'w-6 bg-white' : 'bg-white opacity-50'
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>

 
  )
}

export default LeftSection
