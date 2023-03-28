import styled from "styled-components";
import Colors from "../styles/Colors";

const IframeContent = styled.iframe`
    position: absolute;
    margin: 0 auto;
    overflow-y: scroll;
    width: 100%;
    height: 100% !important;
    padding-left: 6em;
    padding-right: 6em;
    padding-bottom: 6em;
    padding-top: 1em;
    background: ${Colors.background};
`;

const BI = (
    <IframeContent
        title="capstone"
        load="lazy"
        src="https://app.powerbi.com/reportEmbed?reportId=786a0b31-978b-437e-9ec6-9d5e6b530cc7&autoAuth=true&ctid=ec1bd924-0a6a-4aa9-aa89-c980316c0449"
        frameborder="0"
        allowFullScreen="true"
    />
);

export default BI;
