// Packages Imports
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

// Utils Imports
import { Storage } from "../../utils/Storage";
import { dateTimeFormatter } from "../../utils/Utils";

// Data Imports
import { VehicleTypes, TollNames } from "../../data/Vehicles";

// Styles Imports
import "./VehicleModal.css";

const VehicleModal = ({ setIsOpen }) => {
  const [tollName, setTollName] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleTariff, setVehicleTariff] = useState("");

  // Add new vehicles
  const handleVehicleEntry = () => {
    const value = Storage.getValueFromLS("vehiclesData");
    const vehicleDetails = {
      type: vehicleType,
      number: vehicleNumber,
      time: dateTimeFormatter(new Date()),
      tollName: tollName,
      tarrif: vehicleTariff,
    };
    if (value !== "null" && value?.length > 0) {
      Storage.setValueToLS(
        "vehiclesData",
        JSON.stringify([...JSON.parse(value), ...[vehicleDetails]])
      );
      setIsOpen(false);
    } else {
      Storage.setValueToLS("vehiclesData", JSON.stringify([vehicleDetails]));
      setIsOpen(false);
    }
  };

  return (
    <>
      <div className='darkBG' onClick={() => setIsOpen(false)} />
      <div className='centered'>
        <div className='modal'>
          <h5 className='modalHeader'>Add new entry</h5>
          <button className='closeBtn' onClick={() => setIsOpen(false)}>
            <FontAwesomeIcon icon={faClose} />
          </button>
          <div className='modalContent'>
            <div className='tollNameContainer'>
              <h6 className='title'>Select toll name*</h6>
              <select
                className='selectContainer'
                name='selectList'
                id='selectList'
                onChange={(e) => setTollName(e.target.value)}
              >
                <option value=''>Select toll name</option>
                {TollNames?.map(({ label, value }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div className='tollNameContainer'>
              <h6 className='title'>Select vehicle type*</h6>
              <select
                className='selectContainer'
                name='selectList'
                id='selectList'
                onChange={(e) => setVehicleType(e.target.value)}
              >
                <option value=''>Select Vehicle type</option>
                {VehicleTypes?.map(({ label, value }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div className='vehicleInputContainer'>
              <h6 className='title'>Vehicle Number*</h6>
              <input
                className='vehicleNumber'
                type='text'
                placeholder='Enter your vehicle number'
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value)}
              />
            </div>
            <div className='vehicleInputContainer'>
              <h6 className='title'>Tariff*</h6>
              <input
                className='vehicleNumber'
                type='text'
                placeholder='Tariff amount'
                value={vehicleTariff}
                onChange={(e) => setVehicleTariff(e.target.value)}
              />
            </div>
          </div>
          <button className='addButton' onClick={handleVehicleEntry}>
            Add Entry
          </button>
        </div>
      </div>
    </>
  );
};

export default VehicleModal;
