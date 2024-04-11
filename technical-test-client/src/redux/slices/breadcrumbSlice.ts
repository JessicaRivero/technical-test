import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Breadcrumb {
  name: string;
}

interface BreadcrumbState {
  breadcrumbs: Breadcrumb[];
}

const initialState: BreadcrumbState = {
  breadcrumbs: [],
};

const breadcrumbsSlice = createSlice({
  name: 'breadcrumbs',
  initialState,
  reducers: {
    setBreadcrumbs: (state, action: PayloadAction<string[]>) => {
      const categoryCounts = action.payload.reduce((acc: Record<string, number>, name: string) => {
        acc[name] = (acc[name] || 0) + 1;
        return acc;
      }, {});

      let maxCount = 0;
      let mostFrequentCategory = '';
      Object.entries(categoryCounts).forEach(([category, count]) => {
        if (count > maxCount) {
          maxCount = count;
          mostFrequentCategory = category;
        }
      });
      state.breadcrumbs = mostFrequentCategory ? [{ name: mostFrequentCategory }] : [];
    },
    clearBreadcrumbs: (state) => {
      state.breadcrumbs = [];
    },
  },
});

export const { setBreadcrumbs, clearBreadcrumbs } = breadcrumbsSlice.actions;
export default breadcrumbsSlice.reducer;