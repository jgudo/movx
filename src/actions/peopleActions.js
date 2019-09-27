import { FETCH_SELECTED_PERSON, FETCH_PEOPLE } from 'constants/constants';

export const fetchSelectedPerson = id => ({
  type: FETCH_SELECTED_PERSON,
  payload: id
});

export const fetchPeople = (query, page = 1) => ({
  type: FETCH_PEOPLE,
  payload: {
    query,
    page
  }
});
