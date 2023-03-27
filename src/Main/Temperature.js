import styled from "styled-components";

const Container = styled.div`
`;

const Temperature = (props) => {
    return (
        <Container value={props.value}>
            {props?.value ? `${props?.value} °C` : ''}
        </Container>
    );
};

export default Temperature;
