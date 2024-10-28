import menuOptionsStore from "../../store/menuOptionsStore";

function SideAndAppMenu() {
  const { menuSides, fetchApps, isLoading, fetchSides, error } =
    menuOptionsStore();

  const handleFetchSides = () => {
    fetchSides();
  };

  const handleFetchApps = () => {
    fetchApps();
  };

  return (
    <div>
      <h1>Menu Options</h1>
      <div>
        <button onClick={handleFetchSides}>Sides</button>
        <button onClick={handleFetchApps}>Appetizers</button>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {menuSides.length > 0 && (
        <div>
          <h2>Menu Items:</h2>
          <ul>
            {menuSides.map((item) => (
              <li key={item.option}>
                {item.option.replace(/_/g, " ")}{" "}
                {item.additional_charge > 0 && `(+${item.additional_charge})`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SideAndAppMenu;
