// import { Button } from 'antd'
// import React from 'react'


// const ButtonComponent = ({size, bordered, styleButton, styleTextButton, textButton, backgroundColorButton,disabled, colorButton, ...rest}) => {
//   return (
//     <Button
//         size={size} 
//         style={{
//             ...styleButton,
//             background: disabled && '#ccc'
//         }}
//         // style={{ backgroundColor: backgroundColorButton, border: !bordered && 'none' }}s
//         {...rest}
//     ><span style={{color: colorButton}}>{textButton}</span></Button>
//   )
// }

// export default ButtonComponent


// import { Button } from 'antd';
// import React from 'react';
// import PropTypes from 'prop-types';

// const ButtonComponent = ({ 
//     size, 
//     bordered, 
//     styleButton, 
//     styleTextButton, 
//     textButton, 
//     backgroundColorButton, 
//     colorButton, 
//     disabled,
//     ...rest 
// }) => {
//     const buttonStyle = {
//         backgroundColor: backgroundColorButton,
//         border: bordered ? undefined : 'none',
//         ...styleButton,
//     };

//     const textStyle = {
//         color: colorButton,
//         ...styleTextButton,
//     };

//     return (
//         <Button size={size} style={buttonStyle} {...rest}>
//             <span style={textStyle}>{textButton}</span>
//         </Button>
//     );
// };

// ButtonComponent.defaultProps = {
//     size: 'middle',
//     bordered: true,
//     styleButton: {},
//     styleTextButton: {},
//     textButton: 'Button',
//     backgroundColorButton: '#1890ff', // Default antd button color
//     colorButton: '#ffffff',
// };

// ButtonComponent.propTypes = {
//     size: PropTypes.oneOf(['small', 'middle', 'large']),
//     bordered: PropTypes.bool,
//     styleButton: PropTypes.object,
//     styleTextButton: PropTypes.object,
//     textButton: PropTypes.string,
//     backgroundColorButton: PropTypes.string,
//     colorButton: PropTypes.string,
// };

// export default ButtonComponent;
import { Button } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';

const ButtonComponent = ({ 
    size = 'middle', 
    bordered = true, 
    styleButton = {}, 
    styleTextButton = {}, 
    textButton = 'Button', 
    backgroundColorButton = '#1890ff', 
    colorButton = '#ffffff',
    className = '',
    isLoading = false,
    // disabled= true ,
    ...rest 
}) => {
    return (
        <Button
            size={size}
            className={className}
            style={{
                // background: disabled && '#ccc',
                backgroundColor: backgroundColorButton,
                border: bordered ? '1px solid #d9d9d9' : 'none',
                ...styleButton,
            }}
            {...rest}
        >
            <span style={{ color: colorButton, ...styleTextButton }}>
                {textButton}
            </span>
        </Button>
    );
};

ButtonComponent.propTypes = {
    size: PropTypes.oneOf(['small', 'middle', 'large']),
    bordered: PropTypes.bool,
    styleButton: PropTypes.object,
    styleTextButton: PropTypes.object,
    textButton: PropTypes.string,
    backgroundColorButton: PropTypes.string,
    colorButton: PropTypes.string,
    className: PropTypes.string,
};

export default ButtonComponent;
