import "../App.css"; // Custom CSS for 3D effect

const LoaderFit = () => {
  return (
    <div className="flex items-center justify-center h-[200px]">
      <div className="cube">
        <div className="face face1"></div>
        <div className="face face2"></div>
        <div className="face face3"></div>
        <div className="face face4"></div>
        <div className="face face5"></div>
        <div className="face face6"></div>
      </div>
    </div>
  );
};

export default LoaderFit;
