// import { Button } from 'antd'
// import React from 'react'


// const ButtonComponent = ({size, bordered, styleButton, styleTextButton, textButton, backgroundColorButton, colorButton, ...rest}) => {
//   return (
//     <Button
//         size={size} 
//         style={{ backgroundColor: backgroundColorButton, border: !bordered && 'none' }}
//         {...rest}
//     ><span style={{color: colorButton}}>{textButton}</span></Button>
//   )
// }

// export default ButtonComponent
import { Button } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';

const ButtonComponent = ({ 
    size, 
    bordered, 
    styleButton, 
    styleTextButton, 
    textButton, 
    backgroundColorButton, 
    colorButton, 
    ...rest 
}) => {
    const buttonStyle = {
        backgroundColor: backgroundColorButton,
        border: bordered ? undefined : 'none',
        ...styleButton,
    };

    const textStyle = {
        color: colorButton,
        ...styleTextButton,
    };

    return (
        <Button size={size} style={buttonStyle} {...rest}>
            <span style={textStyle}>{textButton}</span>
        </Button>
    );
};

ButtonComponent.defaultProps = {
    size: 'middle',
    bordered: true,
    styleButton: {},
    styleTextButton: {},
    textButton: 'Button',
    backgroundColorButton: '#1890ff', // Default antd button color
    colorButton: '#ffffff',
};

ButtonComponent.propTypes = {
    size: PropTypes.oneOf(['small', 'middle', 'large']),
    bordered: PropTypes.bool,
    styleButton: PropTypes.object,
    styleTextButton: PropTypes.object,
    textButton: PropTypes.string,
    backgroundColorButton: PropTypes.string,
    colorButton: PropTypes.string,
};

export default ButtonComponent;
