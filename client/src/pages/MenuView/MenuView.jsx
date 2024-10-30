import "./MenuView.css";
import ExplainMenu from "./ExplainMenu";
import EntreeMenu from "./EntreeMenu";
import SideAndAppMenu from "./SideAndAppMenu";
import UniversalNavbar from "../../components/UniversalNavbar";

const MenuView = () => {
  return (
    <div className="menu-view">
      <div className="menu-left-panel">
        <ExplainMenu />
      </div>

      <div className="menu-middle-panel">
        <EntreeMenu />
      </div>
      <div className="menu-right-panel">
        <SideAndAppMenu />
      </div>
      <UniversalNavbar />
    </div>
  );
};

export default MenuView;
