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

  const imageMapping = {
    'Chow_Mein': 'src/assets/menuview/Chow_Mein.jpg',
    'Fried_Rice': 'src/assets/menuview/Fried_Rice.jpg',
    'White_Rice': 'src/assets/menuview/White_Rice.jpg',
    'Super_Greens': 'src/assets/menuview/Super_Greens.jpg',
    'Egg_roll': 'src/assets/menuview/Egg_Roll.jpg',
    'Rangoon': 'src/assets/menuview/Ragoon.jpg',
    'Veggie_roll': 'src/assets/menuview/Veggie_Roll.jpg',
    'Apple_Pie_Roll': 'src/assets/menuview/Apple_Pie_Roll.jpg',

    // Add other sides and their corresponding images
};


  const getImageSource = (item) => {
    const key = item.option.replace(/ /g, "_");
    return imageMapping[key] || item.image; // Return mapped image or default image
  };

  return (
    <div className="menu-sideandapp-menu">
      <div className="header-container">
        <h1>Sides and Apps</h1>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {filteredSides.length > 0 && (
        <div>
          <h2>Sides:</h2>
          <div className="menu-columns">
            <div className="menu-column">
              <ul>
                {filteredSides.slice(0, Math.ceil(filteredSides.length / 2)).map((item) => (
                  <li key={item.option}>
                    <img
                      src={getImageSource(item)}
                      alt={item.option}
                      className="side-image"
                    />
                    {item.option.replace(/_/g, " ")}{" "}
                    {item.additional_charge > 0 && `(+${item.additional_charge})`}
                  </li>
                ))}
              </ul>
            </div>
            <div className="menu-column">
              <ul>
                {filteredSides.slice(Math.ceil(filteredSides.length / 2)).map((item) => (
                  <li key={item.option}>
                    <img
                      src={getImageSource(item)}
                      alt={item.option}
                      className="side-image"
                    />
                    {item.option.replace(/_/g, " ")}{" "}
                    {item.additional_charge > 0 && `(+${item.additional_charge})`}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {menuApps.length > 0 && (
        <div>
          <h2>Appetizers:</h2>
          <div className="menu-columns">
            <div className="menu-column">
              <ul>
                {menuApps.slice(0, Math.ceil(menuApps.length / 2)).map((item) => (
                  <li key={item.option}>
                    <img
                      src={getImageSource(item)}
                      alt={item.option}
                      className="app-image"
                    />
                    {item.option.replace(/_/g, " ")}{" "}
                    {item.additional_charge > 0 && `(+${item.additional_charge})`}
                  </li>
                ))}
              </ul>
            </div>
            <div className="menu-column">
              <ul>
                {menuApps.slice(Math.ceil(menuApps.length / 2)).map((item) => (
                  <li key={item.option}>
                    <img
                      src={getImageSource(item)}
                      alt={item.option}
                      className="app-image"
                    />
                    {item.option.replace(/_/g, " ")}{" "}
                    {item.additional_charge > 0 && `(+${item.additional_charge})`}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SideAndAppMenu;
