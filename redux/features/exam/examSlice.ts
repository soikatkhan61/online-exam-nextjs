import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Exam {
    id: number,
    name: string,
    topic: string,
    marks: number,
    duration: number,
    startTime: Date,
    endTime: Date
}

interface ExamState {
    exams: Exam[];
    loading: boolean;
}

const initialState: ExamState = {
    exams: [],
    loading: true,
};

const examSlice = createSlice({
    name: 'examSlice',
    initialState,
    reducers: {
        setExam: (state, action: PayloadAction<Exam>) => {
            const payload = Array.isArray(action.payload) ? action.payload : [action.payload];
            state.exams.push(...payload);
        },
        clearExams: (state) => {
            state.exams = [];
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        addNewExam: (state, action: PayloadAction<Exam>) => {
            state.exams.push(action.payload);
        },
        deleteAnExam: (state, action: PayloadAction<number>) => {
            state.exams = state.exams.filter((exam, index) => index !== action.payload);
        },
    },
});

export const { setExam, clearExams, setLoading } = examSlice.actions;

export default examSlice.reducer;
