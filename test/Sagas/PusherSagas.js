import {getPusher, external} from '../../src/Sagas/PusherSagas';
import { runSaga } from 'redux-saga';

describe('PusherSagas', () => {
    describe('getPusher', () => {
        it('connnect to Pusher', () => {
        //     let dispatched = [];

        //    const Pusher = sinon.stub(external, 'Pusher');

        //     runSaga({
        //         dispatch: action => dispatched.push(action)
        //     }, getPusher);

        //     expect(Pusher.callCount).to.equal(1);
        //     expect(Pusher.calledWith(
        //         process.env.REACT_APP_PUSHER_KEY, 
        //         {
        //             encrypted: true,
        //             cluster: 'ap1',
        //         }
        //     )).to.equal(true);
        //     console.log(dispatched);
        })
    })
})