/* 
  * Author: Adel MD. Adnan
  * Project Name: Billing/shipping Form
  * Date: 03/01/2023
*/
import "./App.css";
import { useEffect, useState } from "react";
import CountryDropdown from "./components/CountryDropdown";
import CommonDropdown from "./components/CommonDropdown";
import totalCountry from "./countryData/totalCountry";

function App() {

  // BILLING STATE
  const [billingName, setBillingName] = useState("");
  const [countryselected, setCountrySelected] = useState("Choose Country");
  const [divisionSelected, setDivisionSelected] = useState("Choose division");
  const [districtSelected, setDistrictSelected] = useState("Choose district");
  const [upazillaSelected, setUpazillaSelected] = useState("Choose upazilla");
  const [billingzipCode, setBillingZipCode] = useState("");
  const [billingHouseNo, setBillingHouseNo] = useState("");
  const [billingPhoneNo, setBillingPhoneNo] = useState("");
  const [billingFax, setBillingFax] = useState("");
  // AVAILABLE 
  const [billingdivisionAvailable, setBillingdivisionAvailable] = useState(false);
  const [billingdistrictAvailable, setBillingdistrictAvailable] = useState(false);
  const [billingupazillaAvailable, setBillingupazillaAvailable] = useState(false);
  const [shippingdivisionAvailable, setShippingdivisionAvailable] = useState(false);
  const [shippingdistrictAvailable, setShippingdistrictAvailable] = useState(false);
  const [shippingupazillaAvailable, setShippingupazillaAvailable] = useState(false);
  // SHIPPING STATE
  const [shippingName, setShippingName] = useState("");
  const [shippingcountryselected, setShippingCountrySelected] =
    useState("Choose Country");
  const [shippingdivisionSelected, setShippingDivisionSelected] =
    useState("Choose division");
  const [shippingdistrictSelected, setShippingDistrictSelected] =
    useState("Choose district");
  const [shippingupazillaSelected, setShippingUpazillaSelected] =
    useState("Choose upazilla");
  const [shippingzipCode, setShippingZipCode] = useState("");
  const [shippingHouseNo, setShippingHouseNo] = useState("");
  const [shippingPhoneNo, setShippingPhoneNo] = useState("");
  const [shippingFax, setShippingFax] = useState("");

  // STORE DATA FROM API
  const [division, setDivision] = useState([]);
  const [district, setDistrict] = useState([]);

  // COPY BILLING STATE
  const [isCopyBilling, setIsCopyBilling] = useState(false);

  // ALL SELECTED DATA 
  const [billingData,setBillingData]=useState({})
  const [shippingData,setShippingData]=useState({})

  // FETCHING DIVISION AND DISTRICT
  useEffect(() => {
    fetch("https://bdapis.com/api/v1.1/divisions")
      .then((res) => res.json())
      .then((data) => setDivision(data.data));

    fetch(`https://bdapis.com/api/v1.1/division/${divisionSelected}`)
      .then((res) => res.json())
      .then((data) => setDistrict(data.data));
  }, [divisionSelected]);
  useEffect(() => {
    fetch(`https://bdapis.com/api/v1.1/division/${shippingdivisionSelected}`)
      .then((res) => res.json())
      .then((data) => setDistrict(data.data));
  }, [shippingdivisionSelected]);

  // GET UPAZILLA FROM SELECTED DISTRICT
  const getUpazilla = () => {
    const sel = district?.find((dis) => {
      return dis.district === districtSelected;
    });
    return sel?.upazilla;
  };
  const getShippingUpazilla = () => {
    const sel = district?.find((dis) => {
      return dis.district === shippingdistrictSelected;
    });
    return sel?.upazilla;
  };

  // COPY BILLING DATA INTO SHIPPING
  const copyBill = () => {
    setIsCopyBilling(true);
    setShippingName(billingName);
    setShippingCountrySelected(countryselected);
    setShippingDivisionSelected(divisionSelected);
    setShippingDistrictSelected(districtSelected);
    setShippingUpazillaSelected(upazillaSelected);
    setShippingZipCode(billingzipCode);
    setShippingHouseNo(billingHouseNo);
    setShippingPhoneNo(billingPhoneNo);
    setShippingFax(billingFax);
    setShippingdivisionAvailable(true);
    setShippingdistrictAvailable(true);
    setShippingupazillaAvailable(true);
  };
  const handleSubmit=()=>{
     const billing={
     name: billingName,
     country: countryselected,
     division: divisionSelected,
     district:districtSelected,
     upazilla: upazillaSelected,
     phone : billingPhoneNo,
     }
     const shipping={
      name: shippingName,
      country: shippingcountryselected,
      division: shippingdivisionSelected,
      district:shippingdistrictSelected,
      upazilla: shippingupazillaSelected,
      House: shippingHouseNo,
      phone : shippingPhoneNo,
      }
   setBillingData(billing);
   setShippingData(shipping)
   
  }
  console.log(billingData,shippingData); 
  return (
    <div className="article">
      <div className="main-section">
         {/* BILLING PART */}
        <div className="billing-section">
        <div className="shipping-header">
            <h3>BILLING ADDRESS</h3>
          </div>
       
          <h5> Attention</h5>
          <form>
            <label></label>
            <input
              type="text"
              placeholder="Enter person/site name"
              onChange={(e) => setBillingName(e.target.value)}
              value={billingName}
            />
            <br></br>
            <label>Country</label>
   
            <CountryDropdown
              selected={countryselected}
              setSelected={setCountrySelected}
              options={totalCountry}
           
              setAvailable={setBillingdivisionAvailable}
            />
            <label>Division/province/state</label>
         
            <CommonDropdown
              isBangladesh={countryselected}
              selected={divisionSelected}
              setSelected={setDivisionSelected}
              options={division}
              section="division"
              isAvailable={billingdivisionAvailable}
              setAvailable={setBillingdistrictAvailable}
              
            />
      
            <label>District</label>
         
            <CommonDropdown
              isBangladesh={countryselected}
              selected={districtSelected}
              setSelected={setDistrictSelected}
              options={district}
              section="district"
              isAvailable={billingdistrictAvailable}
              setAvailable={setBillingupazillaAvailable}
            />
        
            <label>Thana/upazilla</label>
   
            <CommonDropdown
              isBangladesh={countryselected}
              selected={upazillaSelected}
              setSelected={setUpazillaSelected}
              options={getUpazilla()}
              section="upazilla"
              isAvailable={billingupazillaAvailable}
            />
      
            <label>Zip code</label>
         
            <input
              type="text"
              placeholder=""
              onChange={(e) => setBillingZipCode(e.target.value)}
            />
           
            <label>House/apertment no.</label>
       
            <input
              type="text"
              placeholder=""
              onChange={(e) => setBillingHouseNo(e.target.value)}
            />
         
            <label>Phone</label>
     
            <input
              type="text"
              placeholder=""
              onChange={(e) => setBillingPhoneNo(e.target.value)}
            />
        
            <label>Fax</label>
     
            <input
              type="text"
              placeholder=""
              onChange={(e) => setBillingFax(e.target.value)}
            />
          </form>
        </div>
        {/* SHIPPING PART */}
        <div className="shipping-section">
          <div className="shipping-header">
            <h3>SHIPPING ADDRESS</h3>
            <h5 className="copy-address" onClick={copyBill}>
            ?????? Copy billing address
            </h5>
          </div>
          <h5> Attention</h5>

          <form>
            <label></label>
            <input
              type="text"
              placeholder="Enter person/site name"
              onChange={(e) => setShippingName(e.target.value)}
              value={shippingName}
            />
       
            <label>Country</label>
     
            <CountryDropdown
              selected={shippingcountryselected}
              setSelected={setShippingCountrySelected}
              options={totalCountry}  
              setAvailable={setShippingdivisionAvailable}
            />
            <label>Division/province/state</label>
       
            <CommonDropdown
              isBangladesh={shippingcountryselected}
              selected={shippingdivisionSelected}
              setSelected={setShippingDivisionSelected}
              options={division}
              section="division"
              isAvailable={shippingdivisionAvailable}   
              setAvailable={setShippingdistrictAvailable}
            />
         
            <label>District</label>
      
            <CommonDropdown
              isBangladesh={shippingcountryselected}
              selected={shippingdistrictSelected}
              setSelected={setShippingDistrictSelected}
              options={district}
              section="district"
              isAvailable={shippingdistrictAvailable}
              setAvailable={setShippingupazillaAvailable} 
            />
       
            <label>Thana/upazilla</label>
         
            <CommonDropdown
              isBangladesh={shippingcountryselected}
              selected={shippingupazillaSelected}
              setSelected={setShippingUpazillaSelected}
              options={getShippingUpazilla()}
              section="upazilla"
              isAvailable={shippingupazillaAvailable}
            />
        
            <label>Zip code</label>
        
            <input
              type="text"
              placeholder=""
              onChange={(e) => setShippingZipCode(e.target.value)}
              value={shippingzipCode}
            />
  
            <label>House/apertment no.</label>
       
            <input
              type="text"
              placeholder=" "
              onChange={(e) => setShippingHouseNo(e.target.value)}
              value={shippingHouseNo}
            />
      
            <label>Phone</label>
        
            <input
              type="text"
              placeholder=""
              onChange={(e) => setShippingPhoneNo(e.target.value)}
              value={shippingPhoneNo}
            />
        
            <label>Fax</label>
       
            <input
              type="text"
              placeholder=""
              onChange={(e) => setShippingFax(e.target.value)}
              value={shippingFax}
            />
          </form>
        </div>
        <br></br>
       
        
      </div>
      <div className="submit-button">
        <button onClick={handleSubmit}>Submit</button>
      </div>
      
    </div>
  );
}

export default App;
