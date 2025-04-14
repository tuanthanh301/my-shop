import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const colors = {
    itemHeader: "#f5f5f7",
    white: "white",
    dictional:"#06c",
    black: "black",
    orange: "orange",
    itemFooter: "#424245",
    textFooter: "#6e6e73",
}
export const FooterWrapper = styled.div`
    margin-top: 20px;
    width: 100%;
    height: 500px;
    background-color: #f5f5f7;
`
export const FooterContent = styled.div`
    height: 85%;
    margin: 0 auto;
    max-width: 1000px;
    padding: 0 22px;
    padding-left: max(22px,env(safe-area-inset-left));
    padding-right: max(22px,env(safe-area-inset-right));
    display: flex;
    flex-direction: row;
    
`
export const FooterContentDirectoryColumn = styled.div`
    width: 100%;
    height: 100%;
    margin-top: 20px;
`
export const FooterTitleInformation = styled.label`
    font-size: 12px;
    line-height: 1.33337;
    letter-spacing: -.01em;
    
`
export const FooteracSectionList = styled.ul`
    font-size: 12px;
    line-height: 1.33337;
    letter-spacing: -.01em;
    padding: 0;
    margin-top: 10px;
`
export const FooteracSectionItems = styled.li`
    font-size: 12px;
    line-height: 1.33337;
    letter-spacing: -.01em;
    list-style-type: none;
    display: flex;
    flex-direction: column;
    padding: 0;
    margin-top: 10px;
`
export const FooteracSectionLink = styled(Link)`
    color: ${colors.itemFooter};
    padding: 1px 2px;
    cursor: pointer;
    font-size: 12px;
    text-decoration: none;
    :hover{
        text-decoration: underline;
    }
    margin-bottom: 0.8em;
`


export const FooterInformationShop = styled.div`
    max-width: 1000px;  
    height: 15%;
    margin: auto;
`
export const FooterShop = styled.div`
    width: 100%;  
    color: ${colors.textFooter};
    font-size: 12px;
`
export const FooterCopyright = styled.div`
    width: 100%; 
    position: relative; 
    color: ${colors.textFooter};
    font-size: 12px;
`
export const FooterLocalLink = styled.label`
    position: absolute;
    bottom: 0;
    right: 0;
`
