import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import LangDropdown from './LangDropdown'
import withDropdown from "../withDropdown"
import {translate} from 'react-i18next'

const LanguageDropdown = withDropdown(LangDropdown)

class Footer extends Component {

    render() {
        const {t} = this.props
        return (
            <footer className="main-footer">
                <div className="container cf footer-wrapper">
                    <div className="main-footer__left">
                        <ul className="main-footer__main-ul">
                            <li>
                                <Link className="main-ul__link" to="/about">
                                    {t('About us')}
                                </Link>
                            </li>
                            <li>
                                <Link className="main-ul__link" to="/faq">
                                    {t('FAQ')}
                                </Link>
                            </li>
                            <li>
                                <Link className="main-ul__link" to="/contact">
                                    {t('Contact us')}
                                </Link>
                            </li>
                            <li>
                                <Link className="main-ul__link" to="/policies">
                                    {t('Policies')}
                                </Link>
                            </li>
                            <li>
                                <Link className="main-ul__link" to="/affiliate">
                                    {t('Affiliate')}
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="main-footer__right">
                        <div className="__right__lang">
                            <span className="__right__span">{t('language')}{t('colon')}</span>
                            <LanguageDropdown options={this.props.languages}/>
                        </div>
                    </div>
                </div>
                <hr className="main-footer__hr"/>
                <div className="main-footer__site-map__wrapper container cf">
                    <div className="main-footer__sitemap">
                        <Link className="main-footer__sitemap-link" to="/slots">{t('SLOTS')}</Link>
                        <ul className="sitemap-list">
                            <li>
                                <Link className="sitemap-item" to="/slots?sort=bestselling&price=discounted&page=1">ON SALE</Link>
                            </li>
                            <li>
                                <Link className="sitemap-item" to="/slots?sort=bestselling&page=1">BESTSELLERS</Link>
                            </li>
                            <li>
                                <Link className="sitemap-item" to="/slots?sort=date&page=1">Newest releases</Link>
                            </li>
                            <li>
                                <Link className="sitemap-item" to="/slots?sort=rating&page=1">Top rated</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="main-footer__sitemap">
                        <Link className="main-footer__sitemap-link" to="/live">{t('LIVE')}</Link>
                        <ul className="sitemap-list">
                            <li><Link className="sitemap-item" to="/live#AG">AG</Link></li>
                            <li><Link className="sitemap-item" to="/live#MG">MG</Link></li>
                            <li><Link className="sitemap-item" to="/live#PT">PT</Link></li>
                            <li><Link className="sitemap-item" to="/live#BBIN">BBIN</Link></li>
                            <li><Link className="sitemap-item" to="/live">GPI</Link></li>
                        </ul>
                    </div>
                    <div className="main-footer__sitemap">
                        <Link className="main-footer__sitemap-link" to="/sports">{t('SPORTS')}</Link>
                        <ul className="sitemap-list">
                            <li><Link className="sitemap-item" to="/support/website_help">Website FAQ</Link></li>
                            <li><Link className="sitemap-item" to="/hc/categories/201400969">Games support</Link>
                            </li>
                            <li><Link className="sitemap-item" to="/support/policies">Policies</Link></li>
                            <li><Link className="sitemap-item" to="/hc">Contact us</Link></li>
                        </ul>
                    </div>
                    <div className="main-footer__sitemap">
                        <Link className="main-footer__sitemap-link" to="/lottery">{t('LOTTERY')}</Link>
                        <ul className="sitemap-list">
                            <li><Link className="sitemap-item" to="/forum">Forums</Link></li>
                            <li><Link className="sitemap-item" to="/wishlist">Community wishlist</Link></li>
                        </ul>
                    </div>
                    <div className="main-footer__sitemap">
                        <Link className="main-footer__sitemap-link" to="/account">{t('My AB Gaming')}</Link>
                        <ul className="sitemap-list">
                            <li>
                                <Link className="sitemap-item" to="/account/favorite">{t('favorite')}</Link>
                            </li>
                            <li>
                                <Link className="sitemap-item" to="/account/profile">
                                    {t('profile & setting')}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="main-footer__socials container">
                    <div className="socials__buttons cf">
                        <Link to="/facebook" className="main-footer__social-button">
                            <i className="ic icon-facebook footer-fb dark-social"/>
                            Facebook
                        </Link>
                        <span>&nbsp;</span>
                        <Link to="/twitter" className="main-footer__social-button">
                            <i className="ic icon-twitter footer-twitter dark-social"/>
                            Twitter
                        </Link>
                        <span>&nbsp;</span>
                        <Link to="/plus" className="main-footer__social-button">
                            <i className="ic icon-googleplus footer-gplus dark-social"/>
                            Google Plus
                        </Link>
                        <span>&nbsp;</span>
                        <Link to="/tumblr" className="main-footer__social-button">
                            <i className="ic icon-tumblr footer-tumblr dark-social"/>
                            Tumblr
                        </Link>
                        <span>&nbsp;</span>
                        <Link to="/youtube" className="main-footer__social-button">
                            <i className="ic icon-youtube footer-youtube dark-social"/>
                            Youtube
                        </Link>
                        <span>&nbsp;</span>
                        <Link to="/twitch" className="main-footer__social-button">
                            <i className="ic icon-twitch footer-twitch dark-social"/>
                            Twitch
                        </Link>
                        <span>&nbsp;</span>
                        <Link to="/reddit" className="main-footer__social-button">
                            <i className="ic icon-reddit footer-reddit dark-social"/>
                            Reddit
                        </Link>
                        <span>&nbsp;</span>
                        <Link to="/rss" className="main-footer__social-button">
                            <i className="ic icon-rss footer-rss dark-social"/>
                            Rss
                        </Link>
                        <span>&nbsp;</span>
                        <div className="social-strecher"/>
                    </div>
                </div>
                <div className="main-footer__dark-footer">
                    <div className="container cf">
                        <ul className="dark-footer__ul">
                            <li>
                                <Link className="datk-footer-link" to="/support/policies/">Legal</Link>
                            </li>
                            <li>
                                <Link className="datk-footer-link" to="/115003539989-Company-Reorganisation">Company reorganisation</Link>
                            </li>
                            <li>
                                <Link className="datk-footer-link" to="/cookies">Cookie Policy</Link>
                            </li>
                            <li>
                                <Link className="datk-footer-link" to="/thanks">Our thanks</Link>
                            </li>
                            <li className="dark-footer__strecher">&nbsp;</li>
                        </ul>
                        <div className="dark-footer__copyrights">
                            © 2017.
                            Part of <Link to="/"><div className="dark-footer__logo"/></Link> group.
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}

export default translate()(Footer)