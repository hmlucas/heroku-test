import "./CustomerView.css";
import UniversalNavbar from "../../components/UniversalNavbar";
import CustomerMenu from "./CustomerMenu";
import CustomerNavbar from "./CustomerNavbar";

function CustomerView() {
  return (
    <>
      {/* <h1>Customer View</h1> */}
      <CustomerNavbar />
      <CustomerMenu />
      <UniversalNavbar />
    </>
  );
}

export default CustomerView;
