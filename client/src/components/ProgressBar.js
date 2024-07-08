function ProgressBar({ progress }) {

  const colors = [
    'rgb(224, 71, 0)',
    'rgb(255, 187, 0)',
    'rgb(0, 136, 255)',
    'rgb(34, 153, 54)'
  ]

  const randomColor = colors[Math.floor(Math.random() * colors.length)];
    return (
      <div className="bg-white rounded-lg overflow-hidden 
        xs:w-[80px] xs:h-[8px] xs:ml-3 xs:mr-3  sm:w-[120px] sm:h-[10px] sm:ml-20 sm:mr-20
        md:w-[140px] md:h-[11px] md:ml-40 md:mr-40  xl:ml-40 xl:mr-40  2xl:w-[160px] 2xl:h-[12px] 3xl:w-[160px] 3xl:h-[14px] 3xl:ml-64 3xl:mr-64">
        <div 
          className="h-[14px]"
          style={{ width: `${progress}%`, background: randomColor }}>

          </div>
      </div>
    );
  }
  
  export default ProgressBar;
  