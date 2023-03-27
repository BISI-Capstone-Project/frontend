import styled from "styled-components";
import Colors from "../Colors";

const tbCell = styled.td`
    width: 100%;
    text-align: center;
    font-size: 1.5em !important;
    font-weight: bold;

    ${(props) => {
        if (props?.volume && props?.mean) {
            if (props?.volume > props.mean) {
                return `
                    background: ${Colors.danger} !important;
                `;
            }
        }
        return '';
    }}
`;

export default tbCell;
