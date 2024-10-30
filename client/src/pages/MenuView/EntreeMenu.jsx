import { useEffect } from "react";
import menuOptionsStore from "../../store/menuOptionsStore";
import "./EntreeMenu.css";

function EntreeMenu() {
  const { menuEntrees, fetchEntrees, isLoading, error } = menuOptionsStore();

  useEffect(() => {
    fetchEntrees();
  }, [fetchEntrees]);
  useEffect(() => {
    const scrollInterval = setInterval(() => {
      const menuContainer = document.querySelector('.menu-entree-menu');
      if (menuContainer) {
        if (menuContainer.scrollTop + menuContainer.clientHeight >= menuContainer.scrollHeight) {
          menuContainer.scrollTop = 0; 
        } else {
          menuContainer.scrollTop += 2; // Scroll down
        }
      }
    }, 80); // Adjust interval for scroll speed

    return () => clearInterval(scrollInterval); // Clean up on unmount
  }, []);

  const imageMapping = {
    'Orange_Chicken': 'src/Pictures/MenuViewPics/Orange_Chicken.jpg',
    'Blazing_Burbon_Chicken': 'src/Pictures/MenuViewPics/Blazing_Burbon_Chicken.jpg',
    'Black_Pepper_Steak': 'src/Pictures/MenuViewPics/Black_Pepper_Steak.jpg',
    'Honey_Walnut_Shrimp': 'src/Pictures/MenuViewPics/Honey_Walnut_Shrimp.jpg',
    'Teriyaki_Chicken': 'src/Pictures/MenuViewPics/Teriyaki_Chicken.jpg',
    'Broccoli_Beef': 'src/Pictures/MenuViewPics/Broccoli_Beef.jpg',
    'Kung_Pao': 'src/Pictures/MenuViewPics/Kung_Pao.jpg',
    'Honey_Sesame': 'src/Pictures/MenuViewPics/Honey_Sesame.jpg',
    'Beijing_Beef': 'src/Pictures/MenuViewPics/Beijing_Beef.jpg',
    'Mushroom_Chicken': 'src/Pictures/MenuViewPics/Mushroom_Chicken.jpg',
    'Sweetfire_Chicken': 'src/Pictures/MenuViewPics/Sweetfire_Chicken.jpg',
    'String_Bean_Chicken': 'src/Pictures/MenuViewPics/String_Bean_Chicken.jpg',
    'Black_Pepper_Chicken': 'src/Pictures/MenuViewPics/Black_Pepper_Chicken.jpg',
    // Add other mappings as needed
};

  // Function to get the image source based on the item name
  const getImageSource = (item) => {
    const key = item.option.replace(/ /g, "_"); 
    return imageMapping[key] || item.image; 
  };

  return (
    <div className="menu-entree-menu">
      <div className="header-container">
        <h1>Entree Options</h1>
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {menuEntrees.length > 0 && (
        <div className="menu-columns">
          <div className="menu-column">
            <ul>
              {menuEntrees.slice(0, Math.ceil(menuEntrees.length / 2)).map((item) => (
                <li key={item.option}>
                  <img
                    src={getImageSource(item)} 
                    alt={item.option} 
                    className="entree-image"
                  />
                  <p>{item.option.replace(/_/g, " ")}</p>
                  {item.additional_charge > 0 && <span>(+${item.additional_charge})</span>}
                </li>
              ))}
            </ul>
          </div>
          <div className="menu-column">
            <ul>
              {menuEntrees.slice(Math.ceil(menuEntrees.length / 2)).map((item) => (
                <li key={item.option}>
                  <img
                    src={getImageSource(item)} 
                    alt={item.option} 
                    className="entree-image"
                  />
                  <p>{item.option.replace(/_/g, " ")}</p>
                  {item.additional_charge > 0 && <span>(+${item.additional_charge})</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default EntreeMenu;
