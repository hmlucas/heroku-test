import "./MenuView.css";
import ExplainMenu from "./ExplainMenu";
import EntreeMenu from "./EntreeMenu";
import SideAndAppMenu from "./SideAndAppMenu";

const MenuView = () => {
  return (
    <div className="menu-view">
      <div className="left-panel">
        <ExplainMenu />
      </div>

      <div className="middle-panel">
        <EntreeMenu />
      </div>
      <div className="right-panel">
        <SideAndAppMenu />
      </div>
    </div>
  );
};

export default MenuView;
