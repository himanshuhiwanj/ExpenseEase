import { useEffect, useState } from 'react';

const TypingAnimation = () => {
  const features = [
    'add expenses instantly',
    'view detailed reports',
    'categorize transactions',
    'control your budget',
    'achieve savings goals',
  ];

  const [featureIndex, setFeatureIndex] = useState(0);
  const [featureText, setFeatureText] = useState('');
  const [isFeatureTyping, setIsFeatureTyping] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentFeature = features[featureIndex];

    if (isFeatureTyping) {
      // Logic for typing out the text
      if (featureText.length < currentFeature.length) {
        timer = setTimeout(() => {
          setFeatureText(currentFeature.substring(0, featureText.length + 1));
        }, 80);
      } else {
        // Pause after typing is complete
        timer = setTimeout(() => setIsFeatureTyping(false), 2000);
      }
    } else {
      // Logic for erasing the text
      if (featureText.length > 0) {
        timer = setTimeout(() => {
          setFeatureText(currentFeature.substring(0, featureText.length - 1));
        }, 50);
      } else {
        // Switch to the next feature and start typing again
        setIsFeatureTyping(true);
        setFeatureIndex((prevIndex) => (prevIndex + 1) % features.length);
      }
    }
    return () => clearTimeout(timer);
  }, [featureText, isFeatureTyping, featureIndex, features]);

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
        `}
      </style>
      <div className="flex flex-col items-start justify-center text-left p-4 font-poppins">
        <span className="text-xl md:text-3xl font-semibold text-gray-700">
          With our app, you can
        </span>
        <p className="text-2xl md:text-4xl font-bold text-green-600 mt-2 whitespace-nowrap  border-r-4 border-r-green-500 animate-typing-erasing">
          {featureText}
        </p>
      </div>
    </>
  );
};

export default TypingAnimation;
