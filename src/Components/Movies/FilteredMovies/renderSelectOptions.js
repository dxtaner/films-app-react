const renderSelectOptions = (options) => {
  if (!Array.isArray(options)) return null;

  return options.map((option) => (
    <option
      key={option.id}
      value={option.id}
      style={{ backgroundColor: "#1A202C", color: "white" }}
    >
      {option.name}
    </option>
  ));
};

export default renderSelectOptions;
