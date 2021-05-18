import { FETCH_PEOPLE, FETCH_PEOPLE_SUCCESS, FETCH_SELECTED_PERSON, FETCH_SELECTED_PERSON_SUCCESS } from '@app/constants/actionType';
import { ICast, IPeopleState, IResponse } from '@app/types/types';

export const fetchSelectedPerson = (id: string | number) => (<const>{
  type: FETCH_SELECTED_PERSON,
  payload: id,
});

export const fetchPeople = (page = 1) => (<const>{
  type: FETCH_PEOPLE,
  payload: { page },
});

export const fetchPeopleSuccess = (data: IResponse<ICast[]>) => (<const>{
  type: FETCH_PEOPLE_SUCCESS,
  payload: data
});

export const fetchSelectedPersonSuccess = (data: IPeopleState['current']) => (<const>{
  type: FETCH_SELECTED_PERSON_SUCCESS,
  payload: data
});

export type TPeopleActionType =
  | ReturnType<typeof fetchSelectedPerson>
  | ReturnType<typeof fetchPeople>
  | ReturnType<typeof fetchPeopleSuccess>
  | ReturnType<typeof fetchSelectedPersonSuccess>;
