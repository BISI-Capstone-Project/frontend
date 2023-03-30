import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { ButtonGroup, Col, Navbar, ProgressBar, Row } from 'react-bootstrap';
import logo from './../ac.png';
import API from '../api';
import Btn, { NavBtn } from '../styles/Button';
import styled from 'styled-components';
import Toast from '../styles/Toast';
import CityName from '../styles/Texts';
import Group from './Group';
import TableContainer from '../styles/TableContainer';
import BI from '../BI';
import TbRow from '../styles/TbRow';
import TbCell from '../styles/TbCell';
import Icons from './Icons';
import Temperature from './Temperature';
import Colors from '../styles/Colors';
import CustomNavBar from '../styles/CustomNavbar';
import Arrow from '../styles/Arrow';
import Box from '../styles/Box';

const Container = styled.div`
    color: #fff;
    background: ${Colors.background};
    overflow-y: scroll;
    padding-top: 65px;
    height: 100vh;

    ::-webkit-scrollbar {
        display: none;
    }
`;

const Content = styled.div`
    padding: 2em;
    display: absolute;
    height: 100vh;
`;

const ClickableTbRow = styled(TbRow)`
    &:hover {
        cursor: pointer;
        background: ${Colors['table-hover']};
        transition: 0.35s;
    }
`;

const Main = () => {
    const [appStatus, setAppStatus] = useState('Not running');
    const [forecast, setForecast] = useState(null);
    const [forecastLoad, setForecastload] = useState(false);
    const [load, setLoad] = useState(true);
    const [forecastResults, setForecastResults] = useState(null);
    const [tab, setTab] = useState('ml');
    const [forecastVolume, setForecastVolume] = useState(null);
    const [status, setStatus] = useState({
        'setp': 3,
        'name': 'Machine Learning',
        'status': false,
        'running': false,
        'msg': '',
    });
    const [openTb, setOpenTb] = useState([]);

    const handleError = () => {
        Toast.error('An error occurred');
    };

    const checkStatus = () => {
        API.healthCheck.get().then((response) => {
            if (response.status === 200) setAppStatus('Running');
            else setAppStatus('Not running');
        }).finally(() => setLoad(false));
    };

    const handleMLResponse = (response) => {
        setForecastResults(response.data);
        setStatus((obj) => ({
            ...obj,
            status: true,
            msg: response.data.status
        }));
    };

    const mlProcessing = async () => API.ml().then(
        (response) => handleMLResponse(response),
        async () => {
            await API.runMml().then(
                () => API.ml().then(
                    (response) => handleMLResponse(response),
                ),
                () => handleError(),
            );
        },
    );

    const handleForecastForWeather = () => {
        setForecastload(true);
        Toast.promise(
            API.weatherForecast().then(
                (response) => {
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

    const getText = (text) => {
        return text
            .replaceAll('zero', '0')
            .replaceAll(' ', '')
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

    useEffect(() => {
        if (forecast && forecastResults) {
            const cities = Object.keys(forecastResults?.results?.means);
            const obj = {}

            cities.forEach((city) => {
                obj[city.toLowerCase()] = true;
            });

            setOpenTb(obj);

            const __list__ = [];
            forecast?.cities.forEach((element) => {
                try {
                    let name = element.city;
                    if (name === 'montreal') name = 'brossard';
                    if (name === 'reddeer') name = 'red deer';

                    const __inner_list__ = [];

                    forecastResults?.results?.cities.forEach((volume, index) => {;
                        __inner_list__.push({
                            'volume': volume[name.toUpperCase()],
                            'calendar_date': volume['CALENDAR_DATE'],
                            'cloudprecip': element.results['cloudprecip'][index],
                            'temperatures': element.results['temperatures'][index],
                        });
                    });

                    __list__[name] = __inner_list__;

                } catch (e) {
                    console.log(e);
                }
            });

            setForecastVolume(__list__);
        }
    }, [forecast]);

    const TableStatus = () => useMemo(() => (
        status ? (
            <tbody>
                <TbRow key={status.setp}>
                    <td style={{ width: '25%' }}>
                        {status.name}
                    </td>
                    <td style={{ width: '25%' }}>
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
                </TbRow>
                <TbRow>
                    <td style={{ width: '25%' }}>
                        Weather Forecast
                    </td>
                    <td style={{ width: '25%' }}>
                        {status.running && (
                            <ProgressBar
                                variant={forecast ? 'success' : 'info'}
                                animated={!forecast}
                                style={{ width: '100%' }}
                                now={100}
                                label={!forecast ? 'Running' : 'Completed'}
                            />
                        )}
                    </td>
                </TbRow>
            </tbody>
        ) : null
    ), []);

    const IframeEDA = () => useMemo(() => (
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
                        <NavBtn
                            onClick={() => setTab('ml')}
                            disabled={tab === 'ml'}
                        >
                            Model Training
                        </NavBtn>
                        <NavBtn
                            onClick={() => setTab('bi')}
                            disabled={tab === 'bi'}
                        >
                            Dashboard
                        </NavBtn>
                        <NavBtn
                            onClick={() => setTab('eda')}
                            disabled={tab === 'eda'}
                        >
                            EDA
                        </NavBtn>
                        <NavBtn
                            onClick={() => setTab('group')}
                            disabled={tab === 'group'}
                        >
                            Group
                        </NavBtn>
                    </ButtonGroup>
                </div>
            </CustomNavBar>
                {tab === 'ml' && (
                    <Content>
                        {!forecastResults && !forecast && (
                            <div style={{ marginLeft: '1em', marginBottom: '1em' }}>
                                <Btn
                                    onClick={() => handleForecasting()}
                                    disabled={forecastResults || status.running === true}
                                >
                                    Click to run the model
                                </Btn>
                            </div>
                        )}
                        <Row>
                            <Col xl={4} md={6} sm={12}>
                                <TableContainer>
                                    <TableStatus />
                                </TableContainer>
                            </Col>
                            {forecast && (
                                <Col xl={4} md={6} sm={12}>
                                    <TableContainer>
                                        <tbody>
                                            <TbRow style={{ textAlign: 'center' }}>
                                                <td colSpan={2}>
                                                    <strong>Legend</strong>
                                                </td>
                                            </TbRow>
                                            <TbRow>
                                                <td>
                                                    <Box red={false} />
                                                    Under average for the city
                                                </td>
                                                <td>
                                                    <Box red={true} />
                                                    Above average for the city
                                                </td>
                                            </TbRow>
                                        </tbody>
                                    </TableContainer>
                                </Col>
                            )}
                        </Row>
                        <Row>
                            {forecastResults && (
                                <>
                                    <Col xl={12} lg={12} md={12} sm={12}>
                                        {forecast && (
                                                <>
                                                    {forecastVolume && Object.keys(forecastVolume).map((key) => (
                                                        <TableContainer>
                                                            <Fragment
                                                                key={`${key}__`}
                                                            >
                                                                <thead>
                                                                    <ClickableTbRow
                                                                        style={{ textAlign: 'center' }}
                                                                        onClick={() => setOpenTb((obj) => ({
                                                                            ...obj,
                                                                            [key]: !openTb[key]
                                                                        }))}
                                                                    >
                                                                        <td>
                                                                            <Arrow show={openTb[key]} />
                                                                        </td>
                                                                        <td colSpan={5} style={{ textAlign:'left' }}>
                                                                            <CityName>
                                                                                {key}
                                                                            </CityName>
                                                                            <small>Average volume: {forecastResults?.results?.means[key.toUpperCase()]}</small>
                                                                        </td>
                                                                    </ClickableTbRow>
                                                                </thead>
                                                                {openTb[key] === true && (
                                                                    <Fragment>
                                                                        <thead>
                                                                            <TbRow>
                                                                                <th>{' '}</th>
                                                                                <th>{' '}</th>
                                                                                <th colSpan={2}>Precipitation</th>
                                                                                <th colSpan={2}>Temperature</th>
                                                                            </TbRow>
                                                                            <TbRow>
                                                                                <th>Date</th>
                                                                                <th>Volume</th>
                                                                                <th>Day</th>
                                                                                <th>Night</th>
                                                                                <th>Day</th>
                                                                                <th>Night</th>
                                                                            </TbRow>
                                                                        </thead>
                                                                        <tbody>
                                                                            {forecastVolume[key].map((element, index) => {
                                                                                const check = (arr) => {
                                                                                    if (arr?.length === 2) return [
                                                                                        arr[0], arr[1],
                                                                                    ];
                                                                                    return ['', ''];
                                                                                };

                                                                                return (
                                                                                    <TbRow
                                                                                        key={`${key}_${index}`}
                                                                                    >
                                                                                        <td style={{ width: '10%', textAlign: 'center' }}>
                                                                                            {element['calendar_date'].substring(0, 10)}
                                                                                        </td>
                                                                                        <TbCell
                                                                                            style={{ width: '10%' }}
                                                                                            volume={element['volume']}
                                                                                            mean={forecastResults?.results?.means[key.toUpperCase()]}
                                                                                        >
                                                                                            {element['volume']}
                                                                                        </TbCell>
                                                                                        <td>
                                                                                            {check(element['cloudprecip'])[0] !== '' ? (
                                                                                                <Fragment>
                                                                                                    {check(element['cloudprecip'])[0] && (
                                                                                                        <Icons text={check(element['cloudprecip'])[0]} />
                                                                                                    )}
                                                                                                    {check(element['cloudprecip'])[0].replaceAll("\"", "")}
                                                                                                </Fragment>
                                                                                            ) : 'N/A'}
                                                                                        </td>
                                                                                        <td>
                                                                                            {check(element['cloudprecip'])[1] !== '' ? (
                                                                                                <Fragment>
                                                                                                    {check(element['cloudprecip'])[1] && (
                                                                                                        <Icons text={check(element['cloudprecip'])[1]} />
                                                                                                    )}
                                                                                                    {check(element['cloudprecip'])[1].replaceAll("\"", "")}
                                                                                                </Fragment>
                                                                                            ) : 'N/A'}
                                                                                        </td>
                                                                                        <td>
                                                                                            {check(element['temperatures'])[0] !== '' ? (
                                                                                                <Temperature
                                                                                                    style={{ width: '5%' }}
                                                                                                    value={getText(check(element['temperatures'])[0])}
                                                                                                />
                                                                                            ) : 'N/A'}
                                                                                        </td>
                                                                                        <td>
                                                                                            {check(element['temperatures'])[1] !== '' ? (
                                                                                                <Temperature
                                                                                                    style={{ width: '5%' }}
                                                                                                    value={getText(check(element['temperatures'])[1])}
                                                                                                />
                                                                                            ) : 'N/A'}
                                                                                        </td>
                                                                                    </TbRow>
                                                                                )
                                                                            })}
                                                                        </tbody>
                                                                    </Fragment>
                                                                )}
                                                            </Fragment>
                                                        </TableContainer>
                                                    ))}
                                                </>
                                            )}
                                        <TableContainer style={{ marginBottom: '200px' }}>
                                            <thead>
                                                <TbRow>
                                                    <th colSpan={2}>
                                                        <h6>Best model:</h6>
                                                    </th>
                                                    <th colSpan={3}>
                                                        <h6>
                                                            {`${Number(forecastResults?.results?.accuracy) * 100} %`}
                                                            {' - '}
                                                            {forecastResults?.results?.best_model}
                                                        </h6>
                                                    </th>
                                                </TbRow>
                                                <TbRow>
                                                    <th>Name</th>
                                                    <th>MAE</th>
                                                    <th>MSE</th>
                                                    <th>Performance</th>
                                                </TbRow>
                                            </thead>
                                            <tbody>
                                                <TbRow>
                                                    <td>Description</td>
                                                    <td>
                                                        <small>
                                                            MAE gives an idea of how far off the predictions are from the actual values,
                                                            without considering the direction of the error.
                                                        </small>
                                                    </td>
                                                    <td>
                                                        <small>
                                                            MSE gives an idea of how spread out the errors are, and it puts more weight
                                                            on larger errors compared to MAE.
                                                        </small>
                                                    </td>
                                                    <td>
                                                        <small>
                                                            Represents how good the machine learning model performs when predicting the
                                                            test data target.
                                                        </small>
                                                    </td>
                                                </TbRow>
                                                {forecastResults && forecastResults?.results.models.map((result, i) => (
                                                    <TbRow key={`${i}_results_ml`}>
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
                                                            {`${result.error['R2'] * 100} %`}
                                                        </td>
                                                    </TbRow>
                                                ))}
                                            </tbody>
                                        </TableContainer>
                                    </Col>
                                </>
                            )}
                        </Row>
                    </Content>
                )}
                {tab === 'bi' && BI}
                {tab === 'eda' && <IframeEDA />}
                {tab === 'group' && <Group />}
        </Container>
    )
};

export default Main;
