import "./ExplainMenu.css";

const ExplainMenu = () => {
  return (
    <div className="menu-explain-menu">
      <div className="menu-item">
        <img
          src="src/Pictures/MenuViewPics/panda_bowl.jpg"
          alt="Panda Bowl"
        />
        <p>Panda Bowl</p>
        <p>1 Side 1 Entree</p>
      </div>
      <div className="menu-item">
        <img
          src="src/Pictures/MenuViewPics/panda_plate.jpg"
          alt="Panda Plate"
        />
        <p>Panda Plate</p>
        <p>1 Side 2 Entree</p>
      </div>
      <div className="menu-item">
        <img
          src="src/Pictures/MenuViewPics/panda_bigger_plate.jpg"
          alt="Panda Bigger Plate"
        />
        <p>Panda Bigger Plate</p>
        <p>1 Side 3 Entree</p>
      </div>
    </div>
  );
};

export default ExplainMenu;