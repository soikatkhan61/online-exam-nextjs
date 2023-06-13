import { createSlice } from '@reduxjs/toolkit';

const addQuestionSlice = createSlice({
  name: 'addQuestionSlice',
  initialState: {
    questions: [],
    loading: true,
  },
  reducers: {
    addQuestion: (state, action) => {
        console.log(action);
        const payload = Array.isArray(action.payload) ? action.payload : [action.payload];
        state.questions.push(...payload);

    },
    clearQuestion:(state)=>{
      state.questions = []
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { addQuestion,clearQuestion ,setLoading } = addQuestionSlice.actions;

export default addQuestionSlice.reducer;
