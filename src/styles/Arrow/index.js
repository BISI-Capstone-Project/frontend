import styled from 'styled-components';

const Arrow = styled.i`
    display: inline-block;
    padding: 3px;

    ${(props) => {
        if (props.icon) {
            if (props.icon === 'up') {
                return `
                    border: solid #0a940f;
                    border-width: 0 3px 3px 0;
                    transform: rotate(-135deg);
                    -webkit-transform: rotate(-135deg);
                `
            }
            if (props.icon === 'down') {
                return `
                    border: solid #940a0a;
                    transform: rotate(45deg);
                    border-width: 0 3px 3px 0;
                    -webkit-transform: rotate(45deg);
                `
            }
        }
    }}
`;

export default Arrow;
