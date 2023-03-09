import React, { useEffect, useMemo, useState } from 'react';
import { ButtonGroup, Col, Navbar, ProgressBar, Row, Table } from 'react-bootstrap';
import logo from './../ac.png';
import API from '../api';
import Btn from '../styles/Button';
import styled from 'styled-components';
import { toast } from 'react-toastify';

const Container = styled.div`
    color: #fff;
    overflow-y: scroll;
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

const Main = () => {
    const [appStatus, setAppStatus] = useState('Not running');
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
        toast.error('An error occurred');
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

    const handleForecasting = () => {
        setStatus((obj) => ({
            ...obj,
            running: true,
        }));
        mlProcessing();
    };

    useEffect(() => checkStatus(), []);

    useEffect(() => {
        if (tab === 'eda') toast.info('Loading EDA');
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
    ), [status]);

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
                    </ButtonGroup>
                </div>
            </CustomNavBar>
                {tab === 'ml' ? (
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
                                    <Col xl={4} lg={4} md={12} sm={12}>
                                        <TableContainer>
                                            <thead>
                                                <tr>
                                                    <th>Date</th>
                                                    <th>Volume</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {forecastResults && forecastResults?.results.predictions['CALENDAR_DATE'].map((result, i) => {
                                                    return (
                                                        <tr>
                                                            <td>
                                                                {result}
                                                            </td>
                                                            <td>
                                                                {forecastResults?.results.predictions['ACTUAL_VOLUME'][i]}
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </TableContainer>
                                    </Col>
                                    <Col xl={8} lg={8} md={12} sm={12}>
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
                                                {forecastResults && forecastResults?.results.models.map((result) => (
                                                    <tr>
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
                ) : (
                    <iframe
                        style={{
                            position: 'absolute',
                            background: '#fff',
                            margin: '0 auto',
                            overflowY: 'scroll',
                            width: '100%',
                            height: '100%'
                        }}
                        src='https://bisi-capstone-project-2023.azurewebsites.net/static/output.html'
                    />
                )}
        </Container>
    )
};

export default Main;
