import "./MenuView.css";

const ExplainMenu = () => {
  return (
    <div className="explain-menu">
      <div className="menu-item">
        <img
          src="src/pages/MenuView/Pictures/panda_bowl.jpg"
          alt="Panda Bowl"
        />
        <p>Panda Bowl</p>
        <p>1 Side 1 Entree</p>
      </div>
      <div className="menu-item">
        <img
          src="src/pages/MenuView/Pictures/panda_plate.jpg"
          alt="Panda Plate"
        />
        <p>Panda Plate</p>
        <p>1 Side 2 Entree</p>
      </div>
      <div className="menu-item">
        <img
          src="src/pages/MenuView/Pictures/panda_bigger_plate.jpg"
          alt="Panda Bigger Plate"
        />
        <p>Panda Bigger Plate</p>
        <p>1 Side 3 Entree</p>
      </div>
    </div>
  );
};

export default ExplainMenu;
