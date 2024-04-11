import { Breadcrumb, BreadcrumbActionTypes, SET_BREADCRUMBS } from '../types/breadcrumbTypes';

export const setBreadcrumbs = (breadcrumbs: Breadcrumb[]): BreadcrumbActionTypes => ({
  type: SET_BREADCRUMBS,
  payload: breadcrumbs,
});