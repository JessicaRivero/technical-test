export const SET_BREADCRUMBS = 'SET_BREADCRUMBS';

interface SetBreadcrumbsAction {
  type: typeof SET_BREADCRUMBS;
  payload: Breadcrumb[];
}

export type BreadcrumbActionTypes = SetBreadcrumbsAction;

export interface Breadcrumb {
  name: string;
}