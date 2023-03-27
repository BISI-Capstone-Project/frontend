import TableContainer from "../styles/TableContainer";

const Group = () => (
    <TableContainer>
        <thead>
            <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Role description</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>João Carolino</td>
                <td>Project Manager</td>
                <td>
                    <ul>
                        <li>Project Coordination</li>
                        <li>Stakeholder Management</li>
                        <li>Scope Management</li>
                    </ul>
                </td>
            </tr>
            <tr>
                <td>Micky Mwiti</td>
                <td>Data Analyst</td>
                <td>
                    <ul>
                        <li>Data Exploratory</li>
                        <li>Predictive modeling</li>
                        <li>Machine learning operations</li>
                    </ul>
                </td>
            </tr>
            <tr>
                <td>Tao Yang</td>
                <td>Lead Data Clerk</td>
                <td>
                    <ul>
                        <li>Granola bar supplier</li>
                        <li>Costco Driver</li>
                    </ul>
                </td>
            </tr>
            <tr>
                <td>Vinícius Gonzalez Caetano</td>
                <td>Software Developer</td>
                <td>
                    <ul>
                        <li>Software development</li>
                        <li>Data integration</li>
                        <li>DevOps engineering</li>
                    </ul>
                </td>
            </tr>
            <tr>
                <td>Yan Klein</td>
                <td>Visual Expert</td>
                <td>
                    <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </td>
            </tr>
        </tbody>
    </TableContainer>
);

export default Group;
