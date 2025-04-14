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
                            <FooteracSectionLink to="/mac">Mac</FooteracSectionLink>
                            <FooteracSectionLink to="/ipad">Ipad</FooteracSectionLink>
                            <FooteracSectionLink to="/iphone">Iphone</FooteracSectionLink>
                            <FooteracSectionLink to="/watch">Watch</FooteracSectionLink>
                            <FooteracSectionLink to="/airpod">Airpods</FooteracSectionLink>
                            <FooteracSectionLink>TV & Home</FooteracSectionLink>

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
                            <FooteracSectionLink>Apple Music</FooteracSectionLink>
                            <FooteracSectionLink>Apple TV+</FooteracSectionLink>
                            <FooteracSectionLink>Apple Arcade</FooteracSectionLink>
                            <FooteracSectionLink>Cloud</FooteracSectionLink>
                            <FooteracSectionLink>Apple One</FooteracSectionLink>
                            <FooteracSectionLink>Apple Books</FooteracSectionLink>
                            <FooteracSectionLink>Apple Podcasts</FooteracSectionLink>
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
                            <FooteracSectionLink>Manage Your Apple ID</FooteracSectionLink>
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
                            <FooteracSectionLink>Apple and Business</FooteracSectionLink>
                        </FooteracSectionItems>
                    </FooteracSectionList>

                    <FooterTitleInformation>
                        <h3>
                            For Education
                        </h3>
                    </FooterTitleInformation>
                    <FooteracSectionList>
                        <FooteracSectionItems>
                            <FooteracSectionLink>Apple and Education</FooteracSectionLink>
                        </FooteracSectionItems>
                    </FooteracSectionList>

                    <FooterTitleInformation>
                        <h3>
                            For Healthcare
                        </h3>
                    </FooterTitleInformation>
                    <FooteracSectionList>
                        <FooteracSectionItems>
                            <FooteracSectionLink>Apple in Healthcare</FooteracSectionLink>
                            <FooteracSectionLink>Health on Apple Watch</FooteracSectionLink>
                        </FooteracSectionItems>
                    </FooteracSectionList>
                </FooterContentDirectoryColumn>

                <FooterContentDirectoryColumn>
                    <FooterTitleInformation>
                        <h3>
                            Apple Values
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
                            <FooteracSectionLink>Contact Apple</FooteracSectionLink>
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
                Copyright © 2022 Apple Inc. All rights reserved.
                <FooterLocalLink>VietNam</FooterLocalLink>
                </FooterCopyright>
            </FooterInformationShop>
        </FooterWrapper>
    )
}

export default FooterComponent