import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import API from '../api';
import Btn from '../styles/Button';

const Main = () => {
    const [appStatus, setAppStatus] = useState('');
    const [load, setLoad] = useState(true);

    const checkStatus = () => {
        API.healthCheck.get(
            (response) => response.data.data,
        ).then((response) => {
            if (response.status === 200) setAppStatus('Running');
            else setAppStatus('Not running');
        }).finally(() => setLoad(false));
    };

    useEffect(() => checkStatus(), []);

    useEffect(() => console.log(appStatus), [appStatus]);

    return (
        <>
            {load ? (
                <span class="loader"></span>
            ) : appStatus}
            <hr />
            <Row>
                <Col>
                    <Btn>
                        EDA
                    </Btn>
                </Col>
                <Col>
                    <Btn>
                        Forecasting
                    </Btn>
                </Col>
            </Row>
        </>
    )
};

export default Main;
