import { useEffect } from "react";
import menuOptionsStore from "../../store/menuOptionsStore";
import "./SideAndAppmenu.css";

function SideAndAppMenu() {
  const { menuSides, menuApps, fetchApps, fetchSides, isLoading, error } =
    menuOptionsStore();

  useEffect(() => {
    fetchSides();
    fetchApps();
  }, [fetchSides, fetchApps]);
  const filteredSides = menuSides.filter(item => !item.option.includes("1/2"));
  return (
    <div className="menu-sideandapp-menu">

      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {filteredSides.length > 0 && (
        <div>
          <h2>Sides:</h2>
          <ul>
            {filteredSides.map((item) => (
              <li key={item.option}>
                {item.option.replace(/_/g, " ")}{" "}
                {item.additional_charge > 0 && `(+${item.additional_charge})`}
              </li>
            ))}
          </ul>
        </div>
      )}

      {menuApps.length > 0 && (
        <div>
          <h2>Appetizers:</h2>
          <ul>
            {menuApps.map((item) => (
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
