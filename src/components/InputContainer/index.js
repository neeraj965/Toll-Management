const CustomDropdown = ({ options, state, setState }) => (
  <>
    <select
      className='selectContainer'
      name='selectList'
      id='selectList'
      onChange={(e) => e.target.value}
    >
      <option value=''>Select Vehicle type</option>
      {options?.map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
    <input
      className='vehicleInput'
      type='text'
      placeholder='Single Journey'
      value={state.single}
      onChange={(e) => setState({ ...state, ...{ single: e.target.value } })}
    />
    <input
      className='vehicleInput'
      type='text'
      placeholder='Return Journey'
      value={state.return}
      onChange={(e) => setState({ ...state, ...{ return: e.target.value } })}
    />
  </>
);

export default CustomDropdown;
