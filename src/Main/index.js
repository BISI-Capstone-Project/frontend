import React, { useEffect, useMemo, useState } from 'react';
import { ButtonGroup, Col, Navbar, ProgressBar, Row } from 'react-bootstrap';
import logo from './../ac.png';
import API from '../api';
import Btn from '../styles/Button';
import styled from 'styled-components';
import Arrow from '../styles/Arrow';
import Toast from '../styles/Toast';
import CityName from '../styles/Texts';
import Group from './Group';
import TableContainer from '../styles/TableContainer';

const Container = styled.div`
    color: #fff;
    overflow-y: scroll;

    ::-webkit-scrollbar {
        display: none;
    }
    margin-bottom: 20em;
`;

const CustomNavBar = styled(Navbar)`
    background: #282c34;
    border-bottom: 1px solid #1e2127;
    padding: 0.5em;
`;

const Content = styled.div`
    padding: 2em;
    background: #1e2127;
    display: absolute;
    height: 100vh;
`;

const TemperatureFont = styled.small`
    font-size: 1.25em;
`;

const Main = () => {
    const [appStatus, setAppStatus] = useState('Not running');
    const [forecast, setForecast] = useState(null);
    const [forecastLoad, setForecastload] = useState(false);
    const [load, setLoad] = useState(true);
    const [forecastResults, setForecastResults] = useState(null);
    const [tab, setTab] = useState('ml');
    const [status, setStatus] = useState({
        'setp': 3,
        'name': 'Machine Learning',
        'status': false,
        'running': false,
        'msg': '',
    });

    const handleError = () => {
        Toast.error('An error occurred');
    };

    const checkStatus = () => {
        API.healthCheck.get().then((response) => {
            if (response.status === 200) setAppStatus('Running');
            else setAppStatus('Not running');
        }).finally(() => setLoad(false));
    };

    const mlProcessing = () => API.ml().then(
        (response) => {
            setForecastResults(response.data);
            setStatus((obj) => ({
                ...obj,
                status: true,
                msg: response.data.status
            }));
        },
        () => handleError(),
    );

    const handleForecastForWeather = () => {
        setForecastload(true);
        Toast.promise(
            API.weatherForecast().then(
                (response) => {
                    console.log(response.data.data);
                    setForecast(response.data.data);
                },
            ),
            {
                'pending': 'Loading weather forecast',
                'success': 'Data loaded',
                'error': 'An error occurred',
            }
        );
    };

    const handleForecasting = () => {
        if (!forecastLoad) handleForecastForWeather();
        setStatus((obj) => ({
            ...obj,
            running: true,
        }));
        Toast.promise(
            mlProcessing(),
            {
                'pending': 'Fetching data',
                'success': 'ML data loaded',
                'error': 'An error occurred',
            }
        )
    };

    const getIcon = (text) => {
        if (text.includes('High')) return 'up';
        if (text.includes('Low')) return 'down';
        return null;
    };

    const getText = (text) => {
        return text
            .replaceAll('.', "")
            .replaceAll('plus', "")
            .replaceAll('minus', "-")
            .replaceAll("\"", "")
            .replaceAll('High', '')
            .replaceAll('Low', '');
    };

    useEffect(() => {
        checkStatus();
    }, []);

    useEffect(() => {
        if (tab === 'eda') Toast.info('Loading EDA');
    }, [tab]);

    const TableStatus = () => useMemo(() => (
        status ? (
            <tbody>
                <tr key={status.setp}>
                    <td>
                        {status.name}
                    </td>
                    <td style={{ width: '50%', maxWidth: '200px' }}>
                        {status.running && (
                            <ProgressBar
                                variant={status.status ? 'success' : 'info'}
                                animated={!status.status}
                                style={{ width: '100%' }}
                                now={100}
                                label={(status.running && !status.status) ? 'Running' : status.msg}
                            />
                        )}
                    </td>
                </tr>
            </tbody>
        ) : null
    ), []);
    return (
        <Container>
            <CustomNavBar>
                <Navbar.Brand>
                    <img src={logo} className="App-logo" alt="logo" />
                </Navbar.Brand>
                <h6>
                    {load ? (
                        <span className="loader"></span>
                        ) : appStatus}
                </h6>
                <div style={{ marginLeft: '1em' }}>
                    <ButtonGroup>
                        <Btn
                            onClick={() => setTab('ml')}
                            disabled={tab === 'ml'}
                        >
                            Model Training
                        </Btn>
                        <Btn
                            onClick={() => setTab('eda')}
                            disabled={tab === 'eda'}
                        >
                            EDA
                        </Btn>
                        <Btn
                            onClick={() => setTab('group')}
                            disabled={tab === 'group'}
                        >
                            Group
                        </Btn>
                    </ButtonGroup>
                </div>
            </CustomNavBar>
                {tab === 'ml' && (
                    <Content>
                        <div style={{ marginLeft: '1em', marginBottom: '1em' }}>
                            <Btn
                                onClick={() => handleForecasting()}
                                disabled={forecastResults || status.running === true}
                            >
                                {!forecastResults ? 'Click to run the model' : 'Completed'}
                            </Btn>
                        </div>
                        <Row>
                            <Col
                                xl={forecastResults ? 3 : 4}
                                lg={forecastResults ? 3 : 4}
                                md={forecastResults ? 4 : 12}
                                sm={forecastResults ? 4 : 12}
                            >
                                <TableContainer>
                                    <TableStatus />
                                </TableContainer>
                            </Col>
                        </Row>
                        <Row>
                            {forecastResults && (
                                <>
                                    <Col xl={12} lg={12} md={12} sm={12}>
                                        {forecast && (
                                                <TableContainer>
                                                    <thead>
                                                        <tr>
                                                            <th>{' '}</th>
                                                            <th>{' '}</th>
                                                            <th colSpan={2}>Precipitation</th>
                                                            <th colSpan={2}>Temperature</th>
                                                        </tr>
                                                        <tr>
                                                            <th>Date</th>
                                                            <th>Volume</th>
                                                            <th>Day</th>
                                                            <th>Night</th>
                                                            <th>Day</th>
                                                            <th>Night</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {forecast?.cities?.map((city) => (
                                                            <>
                                                                <tr>
                                                                    <td
                                                                        colSpan={7}
                                                                        style={{ textAlign: 'center' }}
                                                                    >
                                                                        <CityName>
                                                                            {city.city}
                                                                        </CityName>
                                                                    </td>
                                                                </tr>
                                                                {city?.results['period_string']?.map((item, index) => (
                                                                    index % 2 === 0 && (
                                                                        <tr key={`item_${index}`}>
                                                                            <td style={{ textAlign: 'center', width: '10%' }}>
                                                                                {forecastResults?.results.predictions[index]['CALENDAR_DATE'].substring(0, 10)}
                                                                            </td>
                                                                            <td>
                                                                                {forecastResults?.results.predictions[index]['ACTUAL_VOLUME']}
                                                                            </td>
                                                                            <td style={{ width: '30%' }}>
                                                                                {city.results['cloudprecip'][index].replaceAll("\"", "")}
                                                                            </td>
                                                                            <td style={{ width: '30%' }}>
                                                                                {city.results['cloudprecip'][index + 1].replaceAll("\"", "")}
                                                                            </td>
                                                                            <td style={{ width: '10%' }}>
                                                                                <Arrow
                                                                                    icon={getIcon(city.results['temperatures'][index].replaceAll("\"", ""))}
                                                                                />
                                                                                <TemperatureFont>
                                                                                    {getText(city.results['temperatures'][index])}
                                                                                </TemperatureFont>
                                                                            </td>
                                                                            <td style={{ width: '10%' }}>
                                                                                <Arrow
                                                                                    icon={getIcon(city.results['temperatures'][index + 1].replaceAll("\"", ""))}
                                                                                />
                                                                                <TemperatureFont>
                                                                                    {getText(city.results['temperatures'][index])}
                                                                                </TemperatureFont>
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                ))}
                                                            </>
                                                        ))}
                                                    </tbody>
                                                </TableContainer>
                                            )}
                                        <TableContainer>
                                            <thead>
                                                <tr>
                                                    <th colSpan={2}>Best model:</th>
                                                    <th colSpan={3}>
                                                        {`${Number(forecastResults?.results?.accuracy) * 100} %`}
                                                        {' - '}
                                                        {forecastResults?.results?.best_model}
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>MAE</th>
                                                    <th>MSE</th>
                                                    <th>R2</th>
                                                    <th>R-Squared</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {forecastResults && forecastResults?.results.models.map((result, i) => (
                                                    <tr key={`${i}_results_ml`}>
                                                        <td>
                                                            {result.name}
                                                        </td>
                                                        <td>
                                                            {result.error['MAE']}
                                                        </td>
                                                        <td>
                                                            {result.error['MSE']}
                                                        </td>
                                                        <td>
                                                            {result.error['R2']}
                                                        </td>
                                                        <td>
                                                            {result.error['R-Squared']}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </TableContainer>
                                    </Col>
                                </>
                            )}
                        </Row>
                    </Content>
                )}
                {tab === 'eda' && (
                    <iframe
                        title='EDA report'
                        style={{
                            position: 'absolute',
                            background: '#fff',
                            margin: '0 auto',
                            overflowY: 'scroll',
                            width: '100%',
                            height: '100%'
                        }}
                        load="lazy"
                        src='https://bisi-capstone-project-2023.azurewebsites.net/static/output.html'
                    />
                )}
                {tab === 'group' && <Group />}
        </Container>
    )
};

export default Main;
