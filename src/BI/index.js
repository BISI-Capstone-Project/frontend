import styled from "styled-components";

const IframeContent = styled.iframe`
    position: absolute;
    background: #fff;
    margin: 0 auto;
    overflow-y: scroll;
    width: 100%;
    height: 100% !important;
    padding-left: 6em;
    padding-right: 6em;
    padding-bottom: 6em;
    background: #e9e9e9;
`;

const BI = (
    <IframeContent
        title="capstone"
        load="lazy"
        src="https://app.powerbi.com/reportEmbed?reportId=e9c2f228-d8f9-4e16-8d72-abacd3b9a936&autoAuth=true&ctid=ec1bd924-0a6a-4aa9-aa89-c980316c0449"
        frameborder="0"
        allowFullScreen="true"
    />
);

export default BI;
