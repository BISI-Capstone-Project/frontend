import styled from 'styled-components';
import Colors from '../Colors';

const Arrow = styled.i`
    display: inline-block;
    padding: 6px;
    left: 0;
    margin-bottom: 15px;

    border: solid ${Colors.container};
    transform: rotate(45deg);
    ${(props) => {
        if (!props?.show) {
            return `
                border-width: 0 3px 3px 0;
                -webkit-transform: rotate(45deg);
            `;
        }
        return `
            border-width: 0 3px 3px 0;
            -webkit-transform: rotate(225deg);
        `
    }}
`;

export default Arrow;
