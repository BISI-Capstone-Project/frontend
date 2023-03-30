import { Col, Row } from "react-bootstrap";
import styled from "styled-components";
import Btn from "../styles/Button";
import TableContainer from "../styles/TableContainer";
import TbRow from "../styles/TbRow";

const Link = styled.a`
    // color: #ffffff;
    text-decoration: none;
`;

const BASE_DIR = 'https://bisi-capstone-project-2023.azurewebsites.net/static';

const RESOURCES = [
    {
        'text': 'Volume forecast',
        'link': 'output.xlsx',
        'type': 'Volume forecast after applying ML',
    },
    {
        'text': 'Merged file after data processing',
        'link': 'merged_file.xlsx',
        'type': 'Combined file used on the ML models',
    },
    {
        'text': 'Original resource data',
        'link': 'Original_Data.csv',
        'type': 'Volume Data',
    },
    {
        'text': 'Mississauga - Daily weather report',
        'link': 'weatherstats_mississauga_daily.csv',
        'type': 'Weather daily data',
    },
    {
        'text': 'Victoria - Daily weather report',
        'link': 'weatherstats_victoria_daily.csv',
        'type': 'Weather daily data',
    },
    {
        'text': 'Red Deer - Daily weather report',
        'link': 'weatherstats_reddeer_daily.csv',
        'type': 'Weather daily data',
    },
    {
        'text': 'Montreal - Daily weather report',
        'link': 'weatherstats_montreal_daily.csv',
        'type': 'Weather daily data',
    },
    {
        'text': 'Mississauga - Daily weather forecast',
        'link': 'weatherstats_mississauga_forecast_daily.csv',
        'type': 'Weather Forecast',
    },
    {
        'text': 'Victoria - Daily weather forecast',
        'link': 'weatherstats_victoria_forecast_daily.csv',
        'type': 'Weather Forecast',
    },
    {
        'text': 'Red Deer - Daily weather forecast',
        'link': 'weatherstats_reddeer_forecast_daily.csv',
        'type': 'Weather Forecast',
    },
    {
        'text': 'Montreal - Daily weather forecast',
        'link': 'weatherstats_montreal_forecast_daily.csv',
        'type': 'Weather Forecast',
    }
]

const Resources = () => (
    <Row>
        <Col xl={6} lg={6} md={12} sm={12}>
            <TableContainer style={{ margin: '1em' }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th></th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {RESOURCES.map((res) => (
                        <TbRow>
                            <td>{res.text}</td>
                            <td style={{ textAlign: 'center' }}>
                                <Link
                                    href={`${BASE_DIR}/${res.link}`}
                                    download
                                >
                                    Download
                                </Link>
                            </td>
                            <td style={{ textAlign: 'center' }}>
                                {res.type}
                            </td>
                        </TbRow>
                    ))}
                </tbody>
            </TableContainer>
        </Col>
    </Row>
);

export default Resources;
