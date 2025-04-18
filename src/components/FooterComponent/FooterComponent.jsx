import React from 'react'
import { FooteracSectionItems, FooteracSectionLink, FooteracSectionList, FooterContent, FooterContentDirectoryColumn, FooterCopyright, FooterInformationShop, FooterLocalLink, FooterShop, FooterTitleInformation, FooterWrapper  } from './style'

const FooterComponent = () => {
    return (
        <FooterWrapper>
            <FooterContent>

                <FooterContentDirectoryColumn>
                    <FooterTitleInformation>
                        <h3>
                            Shop and Learn
                        </h3>
                    </FooterTitleInformation>
                    <FooteracSectionList>
                        <FooteracSectionItems>
                            <FooteracSectionLink to="/mac">Acer</FooteracSectionLink>
                            <FooteracSectionLink to="/ipad">Asus</FooteracSectionLink>
                            <FooteracSectionLink to="/iphone">Dell</FooteracSectionLink>
                            <FooteracSectionLink to="/watch">HP</FooteracSectionLink>
                            <FooteracSectionLink to="/airpod">LG</FooteracSectionLink>
                            <FooteracSectionLink>Lenovo</FooteracSectionLink>

                        </FooteracSectionItems>
                    </FooteracSectionList>

                </FooterContentDirectoryColumn>

                <FooterContentDirectoryColumn>
                    <FooterTitleInformation>
                        <h3>
                            Services
                        </h3>
                    </FooterTitleInformation>
                    <FooteracSectionList>
                        <FooteracSectionItems>
                            <FooteracSectionLink>TuanThanhShop Music</FooteracSectionLink>
                            <FooteracSectionLink>TuanThanhShop TV+</FooteracSectionLink>
                            <FooteracSectionLink>TuanThanhShop Arcade</FooteracSectionLink>
                            <FooteracSectionLink>Cloud</FooteracSectionLink>
                            <FooteracSectionLink>TuanThanhShop One</FooteracSectionLink>
                            <FooteracSectionLink>TuanThanhShop Books</FooteracSectionLink>
                            <FooteracSectionLink>TuanThanhShop Podcasts</FooteracSectionLink>
                            <FooteracSectionLink>App Store</FooteracSectionLink>
                        </FooteracSectionItems>
                    </FooteracSectionList>
                    <FooterTitleInformation>
                        <h3>
                            Account
                        </h3>
                    </FooterTitleInformation>
                    <FooteracSectionList>
                        <FooteracSectionItems>
                            <FooteracSectionLink>Manage Your TuanThanhShop ID</FooteracSectionLink>
                            <FooteracSectionLink>Cloud.com</FooteracSectionLink>
                        </FooteracSectionItems>
                    </FooteracSectionList>
                </FooterContentDirectoryColumn>

                <FooterContentDirectoryColumn>
                    <FooterTitleInformation>
                        <h3>
                            For Business
                        </h3>
                    </FooterTitleInformation>
                    <FooteracSectionList>
                        <FooteracSectionItems>
                            <FooteracSectionLink>TuanThanhShop and Business</FooteracSectionLink>
                        </FooteracSectionItems>
                    </FooteracSectionList>

                    <FooterTitleInformation>
                        <h3>
                            For Education
                        </h3>
                    </FooterTitleInformation>
                    <FooteracSectionList>
                        <FooteracSectionItems>
                            <FooteracSectionLink>TuanThanhShop and Education</FooteracSectionLink>
                        </FooteracSectionItems>
                    </FooteracSectionList>

                    <FooterTitleInformation>
                        <h3>
                            For Healthcare
                        </h3>
                    </FooterTitleInformation>
                    <FooteracSectionList>
                        <FooteracSectionItems>
                            <FooteracSectionLink>TuanThanhShop in Healthcare</FooteracSectionLink>
                            <FooteracSectionLink>Health on TuanThanhShop Watch</FooteracSectionLink>
                        </FooteracSectionItems>
                    </FooteracSectionList>
                </FooterContentDirectoryColumn>

                <FooterContentDirectoryColumn>
                    <FooterTitleInformation>
                        <h3>
                            TuanThanhShop Values
                        </h3>
                    </FooterTitleInformation>
                    <FooteracSectionList>
                        <FooteracSectionItems>
                            <FooteracSectionLink>Accessibility</FooteracSectionLink>
                            <FooteracSectionLink>Environment</FooteracSectionLink>
                            <FooteracSectionLink>Privacy</FooteracSectionLink>
                            <FooteracSectionLink>Supplier Responsibility</FooteracSectionLink>
                        </FooteracSectionItems>
                    </FooteracSectionList>

                    <FooterTitleInformation>
                        <h3>
                            For Education
                        </h3>
                    </FooterTitleInformation>
                    <FooteracSectionList>
                        <FooteracSectionItems>
                            <FooteracSectionLink>Investors</FooteracSectionLink>
                            <FooteracSectionLink>Ethics & Compliance</FooteracSectionLink>
                            <FooteracSectionLink>Events</FooteracSectionLink>
                            <FooteracSectionLink>Contact TuanThanhShop</FooteracSectionLink>
                        </FooteracSectionItems>
                    </FooteracSectionList>
                </FooterContentDirectoryColumn>
            </FooterContent>
            <FooterInformationShop>
                <FooterShop>
                <a href="/vn/buy/">Find a retailer</a> near you.
                </FooterShop>
                <hr style={{color: "gray"}}></hr>
                <FooterCopyright>
                Copyright © 2025 TuanThanhShop Inc. All rights reserved.
                <FooterLocalLink>VietNam</FooterLocalLink>
                </FooterCopyright>
            </FooterInformationShop>
        </FooterWrapper>
    )
}

export default FooterComponent