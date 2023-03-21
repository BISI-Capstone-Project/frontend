import styled from "styled-components";
import Colors from "../Colors";

const tbCell = styled.td`
    width: 100%;
    text-align: center;

    ${(props) => {
        if (props?.volume > 5000) {
            return `
                background: ${Colors.danger} !important;
            `;
        }
        if (props?.volume > 3000) {
            return `
                background: ${Colors.warning} !important;
            `;
        }
        return '';
    }}
`;

export default tbCell;
