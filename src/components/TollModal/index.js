// Packages Imports
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

// Components Imports
import CustomDropdown from "../InputContainer";

// Utils Imports
import { Storage } from "../../utils/Storage";

// Data Imports
import { VehicleTypes } from "../../data/Vehicles";

const TollModal = ({ setIsOpen }) => {
  const [tollName, setTollName] = useState("");
  const [smallVehicle, setSmallVehicle] = useState({
    single: "",
    return: "",
  });
  const [mediumVehicle, setMediumVehicle] = useState({
    single: "",
    return: "",
  });
  const [largeVehicle, setLargeVehicle] = useState({
    single: "",
    return: "",
  });
  const [heavyVehicle, setHeavyVehicle] = useState({
    single: "",
    return: "",
  });

  // Submit Toll Details
  const handleTollDetails = (e) => {
    e.preventDefault();
    if (
      smallVehicle.single !== "" &&
      smallVehicle.return !== "" &&
      mediumVehicle.single !== "" &&
      mediumVehicle.return !== "" &&
      largeVehicle.single !== "" &&
      largeVehicle.return !== "" &&
      heavyVehicle.single !== "" &&
      heavyVehicle.return !== ""
    ) {
      const tollDetails = {
        tollName,
        smallVehicle: `${smallVehicle.return}/${smallVehicle.single}`,
        mediumVehicle: `${mediumVehicle.return}/${mediumVehicle.single}`,
        largeVehicle: `${largeVehicle.return}/${largeVehicle.single}`,
        heavyVehicle: `${heavyVehicle.return}/${heavyVehicle.single}`,
      };
      const value = Storage.getValueFromLS("tollsData");
      if (value !== "null" && value?.length > 0) {
        Storage.setValueToLS(
          "tollsData",
          JSON.stringify([...JSON.parse(value), ...[tollDetails]])
        );
      } else {
        Storage.setValueToLS("tollsData", JSON.stringify([tollDetails]));
      }
      setIsOpen(false);
    } else {
      setIsOpen(false);
      console.log(
        "Please make sure that each vehicle types is different with no empty fields"
      );
    }
  };

  return (
    <>
      <div className='darkBG' onClick={() => setIsOpen(false)} />
      <div className='centered'>
        <div className='modal'>
          <h5 className='modalHeader'>Add new toll</h5>
          <button className='closeBtn' onClick={() => setIsOpen(false)}>
            <FontAwesomeIcon icon={faClose} />
          </button>
          <div className='modalContent'>
            <div className='tollName'>
              <h6 className='tollTitle'>Toll Name*</h6>
              <input
                className='tollInput'
                type='text'
                placeholder='Enter toll name'
                value={tollName}
                onChange={(e) => setTollName(e.target.value)}
              />
            </div>
            <div className='tollFare'>
              <h6 className='tollTitle'>Vehicle Fare details*</h6>
              <div className='tollFareContent'>
                <CustomDropdown
                  options={VehicleTypes}
                  state={smallVehicle}
                  setState={setSmallVehicle}
                />
              </div>
              <div className='tollFareContent'>
                <CustomDropdown
                  options={VehicleTypes}
                  state={mediumVehicle}
                  setState={setMediumVehicle}
                />
              </div>
              <div className='tollFareContent'>
                <CustomDropdown
                  options={VehicleTypes}
                  state={largeVehicle}
                  setState={setLargeVehicle}
                />
              </div>
              <div className='tollFareContent'>
                <CustomDropdown
                  options={VehicleTypes}
                  state={heavyVehicle}
                  setState={setHeavyVehicle}
                />
              </div>
            </div>
          </div>
          <button className='addButton' onClick={handleTollDetails}>
            Add details
          </button>
        </div>
      </div>
    </>
  );
};

export default TollModal;
