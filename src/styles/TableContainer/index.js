import { Table } from 'react-bootstrap';
import styled from 'styled-components';
import Colors from '../Colors';

const border = `2px solid ${Colors.background}`;

const TableContainer = styled(Table)`
    box-shadow: 0px 2px 20px 1px #a0a0a0;
    tr {
        background: ${Colors['table-background']};
        border: ${border};
        margin: 1em;
        color: ${Colors['table-color']};
    }
    td {
        font-size: 1.2em;
        border: ${border};
    }
`;

export default TableContainer;
