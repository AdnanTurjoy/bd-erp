import { useEffect, useState } from "react";
function Dropdown({ selected, setSelected,options }) {
  const [isActive, setIsActive] = useState(false);
  const [searchValue,setSearchValue] = useState("")
  const [showValue,setShowValue] =useState([]);
  useEffect(()=>{
    setShowValue(options)
  },[options])
  useEffect(()=>{
    let value = searchValue.toLowerCase();
    const SearchedProductText = options?.filter((op) => {
        var optionValue = op.toLowerCase();
      return optionValue.includes(value);
    });
    
    setShowValue(SearchedProductText);
   // console.log(options);
  },[searchValue])
  return (
    <div className="dropdown" >
      <div className="dropdown-btn" onClick={(e) => setIsActive(!isActive)}>
        {selected}
        <span className="fas fa-caret-down"></span>
      </div>
      {isActive && (
        <div className="dropdown-content">
                      <input onChange={(e)=>setSearchValue(e.target.value)} value={searchValue} placeholder="Seach country(Bangladesh Available)"/>

          {showValue?.map((option,key) => (
            <div
              onClick={(e) => {
                setSelected(option);
                setIsActive(false);
              }}
              className="dropdown-item"
             key={key}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
