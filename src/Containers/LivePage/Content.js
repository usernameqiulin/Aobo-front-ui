import React from 'react'
import i18n from '../../i18n';
import {translate} from "react-i18next";
import './Block.css'

class Content extends React.PureComponent {

    render() {
        return (
            <section className="live-content">
                <div className="container">
                    <header className="big-header">
                        <h1>真人娱乐 至尊享受</h1>
                    </header>
                    <ul className="features-list">
                        <li className="features-list__element">
                            <svg className="live-icon"><use xlinkHref="#icon-lips"/></svg>
                            <h2 className="features-list__label">
                                <span>顶级美女</span>
                            </h2>
                            <p className="features-list__text">
                                只需一次点击就可以安装任何游戏，而GOG Galaxy将把它保持在最新状态。您还可以通过可选的带宽控制和计划任务来额外控制这一过程。
                            </p>
                        </li>
                        <li className="features-list__element">
                            <svg className="live-icon"><use xlinkHref="#icon-video"/></svg>
                            <h2 className="features-list__label">
                                <span>高清视频</span>
                            </h2>
                            <p className="features-list__text">
                                再也不会丢失进度了！您的存档将会自动备份到云端，并在您的电脑间保持同步。（仅限支持的游戏）
                            </p>
                        </li>
                        <li className="features-list__element">
                            <svg className="live-icon"><use xlinkHref="#icon-celebrate"/></svg>
                            <h2 className="features-list__label">
                                <span>欧美现场</span>
                            </h2>
                            <p className="features-list__text">
                                您来决定何时以及如何玩您的游戏。GOG Galaxy将一直可以在没有网络连接的情况下工作，您使用GOG Galaxy安装的游戏也一样。
                            </p>
                        </li>
                    </ul>
                </div>
            </section>
        )
    }
}
export default translate()(Content)