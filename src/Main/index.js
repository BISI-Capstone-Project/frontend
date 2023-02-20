import React from 'react';
import { Button } from 'react-bootstrap';

const Main = () => (
    <>
        <Button
            onClick={() => alert('EDA is gonna be processed and file a report file will be downloaded')}
        >
            EDA
        </Button>
        <hr />
        <Button
            onClick={() => alert('Prediction for the next 2 weeks using ML')}
        >
            Prediction
        </Button>
    </>
);

export default Main;
