import React from 'react'
import PropTypes from 'prop-types'
import noScroll from 'no-scroll'
import Portal from 'react-minimalist-portal'

class ABModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showPortal: props.open,
        }
    }

    componentDidMount() {
        // if (this.props.closeOnEsc) {
        //     document.addEventListener('keydown', this.handleKeydown)
        // }
        // Block scroll when initial prop is open
        if (this.props.open) {
            this.blockScroll()
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.open && nextProps.open) {
            this.setState(
                {
                    showPortal: true,
                },
                () => {
                    this.blockScroll()
                    if (this.props.closeOnEsc) {
                        document.addEventListener('keydown', this.handleKeydown)
                    }
                }
            )
        }
        if (this.props.open && !nextProps.open) {
            this.handleExited()
            if (this.props.closeOnEsc) {
                document.removeEventListener('keydown', this.handleKeydown)
            }
        }
    }

    componentWillUnmount() {
        if (this.props.closeOnEsc) {
            document.removeEventListener('keydown', this.handleKeydown)
        }
        this.unblockScroll()
        if (this.timeout) {
            clearTimeout(this.timeout)
        }
    }

    onClickOverlay = e => {
        const { classes, closeOnOverlayClick } = this.props
        if (!closeOnOverlayClick || typeof e.target.className !== 'string') {
            return
        }
        const className = e.target.className.split(' ')
        if (className.indexOf(classes.overlay) !== -1) {
            e.stopPropagation()
            this.props.onClose()
        }
    }

    onClickCloseIcon = e => {
        e.stopPropagation();
        this.props.onClose();
    }

    handleKeydown = e => {
        if (e.keyCode === 27) {
            this.props.onClose()
        }
    }

    handleExited = () => {
        this.setState({ showPortal: false })
        this.unblockScroll()
    }

    // eslint-disable-next-line class-methods-use-this
    blockScroll() {
        noScroll.on()
    }

    unblockScroll = () => {
        const openedModals = document.getElementsByClassName(
            this.props.classes.modal
        )
        if (openedModals.length === 1) {
            noScroll.off()
        }
    }

    render() {
        const { showPortal } = this.state
        if (!showPortal) return null
        return (
            <Portal>
                <div className={`modal-overlay modal-overlay--fixed`}>
                    <var className={`css-data-holder _modal-css-data-holder`}/>
                    <div className={`dim${this.props.dark ? ' dim--dark' : ''}`} onClick={this.onClickOverlay}/>
                    <div className={`_modal-wrapper js-modal-positioning no-hl${this.props.extraClass ? ' ' + this.props.extraClass : ''}`}>
                        <i className={`ic icon-close3 _modal__close modal__close${this.props.showCloseIcon ? '' : ' ng-hide'}`} onClick={this.onClickCloseIcon}/>
                        <div className={`_modal js-modal-measure modal`} onClick={e=>e.stopPropagation()}>
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </Portal>
        )
    }
}

ABModal.propTypes = {
    closeOnEsc: PropTypes.bool,
    closeOnOverlayClick: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    classNames: PropTypes.object,
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
    dark: PropTypes.bool,
    showCloseIcon: PropTypes.bool,
    extraClass: PropTypes.string,
}

ABModal.defaultProps = {
    closeOnEsc: true,
    closeOnOverlayClick: true,
    showCloseIcon: true,
    classNames: {},
    children: null,
    dark: false,
}

export default ABModal