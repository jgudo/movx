import { getPeople, getSelectedPerson, getSelectedPersonCasting } from '@app/services/api';
import { FETCH_PEOPLE, FETCH_SELECTED_PERSON } from '@app/constants/actionType';
import { all, call, put } from 'redux-saga/effects';
import { setLoading } from '../actions/miscActions';
import { fetchPeopleSuccess, fetchSelectedPersonSuccess } from '../actions/peopleActions';

interface ISagaArgs {
  type: any;
  payload: any;
}

export function* peopleSaga({ type, payload }: ISagaArgs): any {
  switch (type) {
    case FETCH_PEOPLE: {
      try {
        yield put(setLoading(true));

        const people = yield call(getPeople, payload.page);
        yield put(fetchPeopleSuccess(people));
        yield put(setLoading(false));
      } catch (err) {
        yield put(setLoading(false));
      }

      break;
    }
    case FETCH_SELECTED_PERSON: {
      try {
        yield put(setLoading(true));

        const [actor, casting] = yield all([
          call(getSelectedPerson, payload),
          call(getSelectedPersonCasting, payload),
        ]);

        yield put(fetchSelectedPersonSuccess({ actor, casting: casting.cast }));
        yield put(setLoading(false));
      } catch (err) {
        yield put(setLoading(false));
      }

      break;
    }
    default:
      throw new Error('Unexpected action type');
  }
}
