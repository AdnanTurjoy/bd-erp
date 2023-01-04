import { useEffect, useState } from "react";
function CommonDropdown({
  selected,
  setSelected,
  options,
  isBangladesh,
  section,
  setAvailable,
  isAvailable
}) {
  const [isActive, setIsActive] = useState(false);
  const [searchValue,setSearchValue] = useState("")
  const [showValue,setShowValue] =useState([]);
  useEffect(()=>{
    setShowValue(options)
  },[options])
  useEffect(()=>{
    let value = searchValue.toLowerCase();
    const SearchedProductText = options?.filter((op) => {
      if(section === "division"){
        var optionValue = op.division.toLowerCase();
      }
      else if(section === "district"){
        var optionValue = op.district.toLowerCase();
      }
      else if(section === "upazilla"){
        var optionValue = op.toLowerCase();
      }
     
      return optionValue.includes(value);
    });
    
    setShowValue(SearchedProductText);
    
  },[searchValue])
  return (
    <div
      className="dropdown"
      style={{  pointerEvents: isBangladesh === "Bangladesh" && isAvailable  ? "" : "none" }}
    >
      <div className="dropdown-btn" onClick={(e) => setIsActive(!isActive)} style={{backgroundColor: isBangladesh === "Bangladesh" && isAvailable ? "" : "#C0C0C0"}}>
        {selected}
       
      </div>
      {isActive && (
        <div className="dropdown-content">
            <input onChange={(e)=>setSearchValue(e.target.value)} value={searchValue} placeholder={`Search ${section}`}/>
          {showValue?.map((option, _id) => (
              <div
                onClick={(e) => {
                  setSelected(() => {
                    // section === "division" ? option.division : option.district;
                    if ( section === "division") {
                       return option.division;
                    }
                    else if(section === "district"){
                        return option.district;
                    }
                    else if(section==="upazilla"){
                        return option;
                    }
                  });
                  setIsActive(false);
                  setAvailable(true);
                }}
                className="dropdown-item"
                key={_id}
              >
                {section === "upazilla" && option}
                {section === "division" ? option.division : option.district}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default CommonDropdown;
