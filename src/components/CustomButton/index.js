// Packages Imports
import { Link } from "react-router-dom";

const ButtonComponent = ({ name, onClick, link = "" }) => {
  return (
    <>
      {link ? (
        <Link to={link}>
          <button className='primary' onClick={onClick}>
            {name}
          </button>
        </Link>
      ) : (
        <button className='primary' onClick={onClick}>
          {name}
        </button>
      )}
    </>
  );
};

export default ButtonComponent;
