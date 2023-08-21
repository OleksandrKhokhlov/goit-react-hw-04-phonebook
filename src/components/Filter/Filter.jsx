export const Filter = ({ onChange }) => {
  return (
    <>
      <label htmlFor="filter">
        Find contacts by name  
        <input
          type="text"
          id="filter"
          name="filter"
          onChange={evt => {
            onChange(evt.target.value);
          }}
        />
      </label>
    </>
  );
};
