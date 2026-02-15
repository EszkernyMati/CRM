
import React,{useState,useEffect} from "react";
import "./loadingScreen.css";

const LoadingScreen = () =>{
     const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    
    return (
      <div className="loading-overlay">
        <div className="loading-bar-container">
          <div className="loading-bar"></div>
        </div>
        <p className="loading-text">Wczytywanie...</p>
      </div>
    );
  }
}
export default LoadingScreen;