import { Navbar } from "react-bootstrap";
import styled from "styled-components";
import Colors from "../Colors";

const CustomNavBar = styled(Navbar)`
    background: ${Colors.container};
    position: fixed;
    border-bottom: 1px solid #1e2127;
    padding: 0.5em;
    left: 0;
    top: 0;
    right: 0;
    z-index: 999;
    box-shadow: 0px 7px 10px 1px #000;
`;

export default CustomNavBar;