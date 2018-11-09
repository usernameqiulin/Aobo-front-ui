import React from 'react';

const SpotsScroll = (WrappedComponent, options = {}) => {
    // const trackPage = page => {
    //     GoogleAnalytics.set({
    //         page,
    //         ...options,
    //     });
    //     GoogleAnalytics.pageview(page);
    // };
    //
    const HOC = class extends React.Component {
        componentDidMount() {
            // 监听 window.resize 事件
            // window.addEventListener("resize", this.glueMe.bind(this));

            // const page = this.props.location.pathname;
            // trackPage(page);
        }

        componentWillUnmount() {
            // window.removeEventListener("resize", this.glueMe.bind(this));

        }

        componentWillReceiveProps(nextProps) {
            // const currentPage = this.props.location.pathname;
            // const nextPage = nextProps.location.pathname;
            //
            // if (currentPage !== nextPage) {
            //     trackPage(nextPage);
            // }
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    };
    return HOC;
};

export default SpotsScroll;