// Packages Imports
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faSearch,
  faRotateBack,
} from "@fortawesome/free-solid-svg-icons";

// Components Imports
import ButtonComponent from "../../components/CustomButton";
import VehicleModal from "../../components/VehicleModal";
import TollModal from "../../components/TollModal";

// Utils Imports
import { Storage } from "../../utils/Storage";

// Styles Imports
import "./VehicleList.css";

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [isVehicleOpen, setIsVehicleOpen] = useState(false);
  const [isTollOpen, setIsTollOpen] = useState(false);
  const [isSearch, setIsSearch] = useState(false);

  useEffect(() => {
    const value = Storage.getValueFromLS("vehiclesData");
    if (value !== null) {
      setVehicles(JSON.parse(value));
    }
  }, [isVehicleOpen, isTollOpen]);

  // Open add new vehicle modal
  const handleVehicleEntry = () => {
    setIsVehicleOpen(true);
  };

  // Open add new toll modal
  const handleNewToll = () => {
    setIsTollOpen(true);
  };

  // Handle Search Input
  const handleSearchbar = (e) => {
    if (e.keyCode === 13) {
      const requiredData = vehicles.filter(
        (vehicle) =>
          vehicle.number.toLowerCase() === e.target.value.toLowerCase().trim()
      );
      setIsSearch(true);
      setVehicles(requiredData);
    }
  };

  // Restore original data
  const handleResetData = () => {
    const value = Storage.getValueFromLS("vehiclesData");
    setVehicles(JSON.parse(value));
    setIsSearch(false);
  };

  return (
    <section className='vehicleContainer'>
      <h1 className='vehicleTitle'>Toll Management Application</h1>
      <div className='header'>
        <div className='leftContainer'>
          <h2 className='headerTitle'>Toll entries/Vehicle entries | </h2>
          <div className='headerFilter'>
            <FontAwesomeIcon icon={faFilter} />
            <span class='tooltiptext'>Filter has not been implemented</span>
          </div>
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
            name='View all tolls'
            onClick={() => {}}
            link='toll-list'
          />
        </div>
      </div>
      {vehicles && vehicles.length > 0 ? (
        <table className='tableContainer'>
          <thead>
            <tr>
              <th className='heading'>Vehicle Type</th>
              <th className='heading'>Vehicle Number</th>
              <th className='heading'>Date/Time</th>
              <th className='heading'>Toll name</th>
              <th className='heading'>Tariff</th>
            </tr>
          </thead>
          {vehicles?.map((data) => (
            <tbody className='contentContainer' key={data.number}>
              <tr>
                <td className='content'>{data.type}</td>
                <td className='content'>{data.number}</td>
                <td className='content'>{data.time}</td>
                <td className='content'>{data.tollName}</td>
                <td className='content'>{data.tarrif}</td>
              </tr>
            </tbody>
          ))}
        </table>
      ) : (
        <div className='errorMessage'>
          No data exists. Click on Add vehicle entry Button to add some data.
        </div>
      )}
      {isVehicleOpen && <VehicleModal setIsOpen={setIsVehicleOpen} />}
      {isTollOpen && <TollModal setIsOpen={setIsTollOpen} />}
    </section>
  );
};

export default VehicleList;
