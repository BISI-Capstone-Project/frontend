import styled from "styled-components";
import Colors from "../Colors";

const Box = styled.div`
    display: inline-block;
    width: 12px;
    height: 12px;
    background: ${(props) => props?.red === true ? Colors.danger : Colors["table-background"]};
    border: 2px solid ${Colors.background};
    margin-left: 0.5em;
    margin-right: 0.5em;
`;

export default Box;
