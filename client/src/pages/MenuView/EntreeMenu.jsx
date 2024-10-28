import menuOptionsStore from "../../store/menuOptionsStore";

function MenuView() {
  const { menuEntrees, fetchEntrees, isLoading, error } = menuOptionsStore();

  const handleFetchEntrees = () => {
    fetchEntrees();
  };

  return (

    <div>
      <h1>Menu Options</h1>
      <div>
        <button onClick={handleFetchEntrees}>Entrees</button>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {menuEntrees.length > 0 && (
        <div>
          <h2>Menu Items:</h2>
          <ul>
            {menuEntrees.map((item) => (
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

export default MenuView;
