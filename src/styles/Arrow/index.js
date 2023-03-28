import styled from 'styled-components';
import Colors from '../Colors';

const Arrow = styled.i`
    display: inline-block;
    padding: 6px;
    margin-left: 20px;
    left: 0;
    float: left;

    border: solid ${Colors.container};
    transform: rotate(45deg);
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
`;

export default Arrow;
