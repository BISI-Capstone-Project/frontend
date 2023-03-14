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
        border: 2px solid #1e2127;
    }
`;

export default TableContainer;
