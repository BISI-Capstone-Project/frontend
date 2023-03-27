import { Table } from 'react-bootstrap';
import styled from 'styled-components';

const TableContainer = styled(Table)`
    color: #c4c4c4;

    tr {
        background: #282c34;
        border: 2px solid #1e2127;
        margin: 1em;
    }
    td {
        font-size: 1.2em;
        border: 2px solid #1e2127;
    }
`;

export default TableContainer;
