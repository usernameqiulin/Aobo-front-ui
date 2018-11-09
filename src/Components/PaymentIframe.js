import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

class PaymentIframe extends React.Component {

    static propTypes = {
        param: PropTypes.object.isRequired,
    }

    onLoad = (e) => {
        this.container.className = 'GalaxyAccountsFrameContainer l-loaded'
    }

    close = e => this.props.onClose()

    updateIFrameContents = () => {
        ReactDOM.render((
                <form method={`POST`} action={this.props.param.url} id={`E_FORM`} name={`E_FORM`}>
                    {Object.keys(this.props.param.params).map((k, i) => {
                        return <input key={i} type="hidden" name={k} value={this.props.param.params[k]}/>
                    })}
                </form>
            ),
            this.el,
            () => {
                let MyIFrame = this.iframe.contentWindow || this.iframe.contentDocument
                const form = MyIFrame.document.getElementById('E_FORM')
                if (form) {
                    form.submit()
                }
            })
    }

    render() {
        return ReactDOM.createPortal(
            <React.Fragment>
                <div className={`GalaxyAccountsFrameContainer__overlay`}/>
                <div id={`GalaxyAccountsFrameContainer`} ref={r => this.container = r}>
                    <div className={`GalaxyAccountsFrameContainer__container payment`}>
                        <div className={`container cf`}>
                            <i className={`ic icon-cancel`} onClick={this.close}/>
                            <iframe
                                ref={r => this.iframe = r}
                                frameBorder={0}
                                onLoad={this.onLoad}
                                className={`PaymentFrameContainer__iframe`}
                            />
                        </div>
                    </div>
                </div>
            </React.Fragment>,
            document.body
        )
    }

    componentDidMount() {
        const frameBody = this.iframe.contentDocument.body,
            el = document.createElement('div')
        frameBody.appendChild(el)
        this.el = el
        this.updateIFrameContents()
    }

    shouldComponentUpdate() {
        return false
    }
}

export default PaymentIframe