import styled from "styled-components";

const Image = styled.img`
    background: #f9f9f9;
    padding: 1px;
    width: 2.25em;
    height: 2.25em;
    margin-right: 2em;
    border-radius: 30em;
`;

const Icons = (props) => {
    const checkText = () => {
        const options = {
            'snow': 'https://cdn.weatherstats.ca/images/conditions/17.gif',
            'rain': 'https://cdn.weatherstats.ca/images/conditions/14.gif'
        };

        if (props.text) {
            const validated_text = props.text.toLowerCase();

            if (validated_text.includes('snow')) return options.snow;
            if (validated_text.includes('rain')) return options.rain;
        }

        return null;
    };
    return checkText() && <Image src={checkText()} />
};

export default Icons;
