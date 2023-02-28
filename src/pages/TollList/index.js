// Packages Imports
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faTrash,
  faRotateBack,
} from "@fortawesome/free-solid-svg-icons";

// Components Imports
import ButtonComponent from "../../components/CustomButton";
import VehicleModal from "../../components/VehicleModal";
import TollModal from "../../components/TollModal";

// Utils Imports
import { Storage } from "../../utils/Storage";

const TollList = () => {
  const [tolls, setTolls] = useState([]);
  const [isVehicleOpen, setIsVehicleOpen] = useState(false);
  const [isTollOpen, setIsTollOpen] = useState(false);
  const [isSearch, setIsSearch] = useState(false);

  // Retrieve data from localstorage
  useEffect(() => {
    const value = Storage.getValueFromLS("tollsData");
    if (value !== null) {
      setTolls(JSON.parse(value));
    }
  }, [isTollOpen, isVehicleOpen]);

  // Open add new vehicle modal
  const handleVehicleEntry = () => {
    setIsVehicleOpen(true);
  };

  // Open add new toll modal
  const handleNewToll = () => {
    setIsTollOpen(true);
  };

  // Delete a particular toll
  const handleTollDelete = (data) => {
    const value = JSON.parse(Storage.getValueFromLS("tollsData"));
    const filteredData = value?.filter((toll) => toll?.tollName !== data);
    if (value !== "null" && value?.length > 1) {
      Storage.setValueToLS("tollsData", JSON.stringify(filteredData));
      setTolls(filteredData);
    } else {
      Storage.removeValueFromLS("tollsData");
      setTolls([]);
    }
  };

  // Handle Search Input
  const handleSearchbar = (e) => {
    if (e.keyCode === 13) {
      const requiredData = tolls.filter(
        (toll) =>
          toll.tollName.toLowerCase() === e.target.value.toLowerCase().trim()
      );
      setIsSearch(true);
      setTolls(requiredData);
    }
  };

  // Restore original data
  const handleResetData = () => {
    const value = Storage.getValueFromLS("tollsData");
    setTolls(JSON.parse(value));
    setIsSearch(false);
  };

  return (
    <section className='vehicleContainer'>
      <h1 className='vehicleTitle'>Toll Management Application</h1>
      <div className='header'>
        <div className='leftContainer'>
          <h2 className='headerTitle'>Tollgate List | </h2>
          <div className='searchContainer'>
            <button type='submit'>
              <FontAwesomeIcon icon={faSearch} />
            </button>
            <input
              type='text'
              placeholder='Search..'
              name='search'
              onKeyDown={handleSearchbar}
            />
          </div>
          {isSearch && (
            <div className='headerFilter' onClick={handleResetData}>
              <FontAwesomeIcon icon={faRotateBack} />
            </div>
          )}
        </div>
        <div className='rightContainer'>
          <ButtonComponent
            name='Add vehicle entry'
            onClick={handleVehicleEntry}
          />
          <ButtonComponent name='Add new toll' onClick={handleNewToll} />
          <ButtonComponent
            name='Back to vehicle logs'
            onClick={() => {}}
            link='/'
          />
        </div>
      </div>
      {tolls && tolls.length > 0 ? (
        <table className='tableContainer'>
          <thead>
            <tr>
              <th className='heading'>Toll Name</th>
              <th className='heading'>Car/Jeep/Van</th>
              <th className='heading'>LCV</th>
              <th className='heading'>Truck/Bus</th>
              <th className='heading'>Heavy Vehicle</th>
            </tr>
          </thead>
          {tolls?.map((data) => (
            <tbody className='contentContainer' key={data.tollName}>
              <tr>
                <td className='content'>
                  <span
                    className='trash'
                    onClick={() => handleTollDelete(data.tollName)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </span>
                  {data.tollName}
                </td>
                <td className='content'>{data.smallVehicle}</td>
                <td className='content'>{data.mediumVehicle}</td>
                <td className='content'>{data.largeVehicle}</td>
                <td className='content'>{data.heavyVehicle}</td>
              </tr>
            </tbody>
          ))}
        </table>
      ) : (
        <div className='errorMessage'>
          No data exists. Click on Add new toll Button to add some data.
        </div>
      )}
      {isVehicleOpen && <VehicleModal setIsOpen={setIsVehicleOpen} />}
      {isTollOpen && <TollModal setIsOpen={setIsTollOpen} />}
    </section>
  );
};

export default TollList;
