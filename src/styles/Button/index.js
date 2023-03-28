import { Button } from "react-bootstrap";
import styled from "styled-components";
import Colors from "../Colors";

const BtnContainer = styled(Button)`
    border-radius: 80px;
    background: #17181a;
    border: 0px;
    padding: 1em;
    padding-left: 2em;
    padding-right: 2em;
    font-size: 0.7em;

    &:hover {
        background: ${Colors.container};
    }

    &:disabled {
        background: #000000;
    }

    &:focus {
        background: ${Colors.container} !important;
    }
`;

export const NavBtn = styled(BtnContainer)`
    &:hover {
        background: ${Colors.container};
    }

`;

const Btn = styled(BtnContainer)`
    &:hover {
        box-shadow: 0px 2px 20px 1px ${Colors.shadow};
        background: ${Colors.background};
        color: ${Colors.container};
    }

    &:disabled {
        background: #000000;
    }
`;

export default Btn;
