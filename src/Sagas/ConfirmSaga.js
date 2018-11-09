import { take, put, race, call } from 'redux-saga/effects'
import ConfirmActions from '../Redux/ConfirmRedux'
import {ConfirmTypes} from '../Redux/ConfirmRedux'

export function* confirmSaga(confirmationMessage, data) {
    // Cause the dialog to be shown (reducer will put the message
    // in the store; the main shell UI component will receive the
    // message in its props and then display the dialog)
    yield put(ConfirmActions.confirmShow(confirmationMessage, data))
    // Wait for either a yes or a no.
    // The dialog UI component receives yes and no event handlers
    // in its props that dispatch these actions.
    const { yes } = yield race({
        yes: take(ConfirmTypes.CONFIRM_YES),
        no: take(ConfirmTypes.CONFIRM_NO)
    })
    // Tell a reducer to hide the dialog
    yield put(ConfirmActions.confirmHide())
    // Returns true if the 'yes' action was received
    return !!yes
}
