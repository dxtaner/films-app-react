const renderSelectOptions = (options) => {
  return options.map((option) => (
    <option key={option.id} value={option.id}>
      {option.name}
    </option>
  ));
};

export default renderSelectOptions;
