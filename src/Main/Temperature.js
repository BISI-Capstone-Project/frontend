import styled from "styled-components";
import Colors from "../styles/Colors";

const Container = styled.td`
    ${(props) => {
        if (Number(props?.value) < -10) {
            return `
                background: ${Colors.danger} !important;
            `;
        }
        if (Number(props?.value) < -5) {
            return `
                background: ${Colors.warning} !important;
            `;
        }
        return '';
    }}
`;

const Temperature = (props) => {
    return (
        <Container value={props.value}>
            {props?.value ? `${props?.value} °C` : ''}
        </Container>
    );
};

export default Temperature;
