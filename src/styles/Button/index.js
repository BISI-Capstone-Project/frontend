import { Button } from "react-bootstrap";
import styled from "styled-components";

const Btn = styled(Button)`
    border-radius: 80px;
    background: #17181a;
    border: 0px;
    padding: 1em;
    padding-left: 2em;
    padding-right: 2em;
    font-size: 0.7em;

    &:hover {
        background: #000000;
    }

    &:disabled {
        background: #000000;
    }
`;

export default Btn;
