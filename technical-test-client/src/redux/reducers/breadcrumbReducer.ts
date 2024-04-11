import { Breadcrumb, BreadcrumbActionTypes, SET_BREADCRUMBS } from '../types/breadcrumbTypes';

interface BreadcrumbState {
  breadcrumbs: Breadcrumb[];
}

const initialState: BreadcrumbState = {
  breadcrumbs: [],
};

export const breadcrumbReducer = (
  state = initialState,
  action: BreadcrumbActionTypes
): BreadcrumbState => {
  switch (action.type) {
    case SET_BREADCRUMBS:
      return {
        ...state,
        breadcrumbs: action.payload,
      };
    default:
      return state;
  }
};