import { configureStore } from "@reduxjs/toolkit";
import  userReducer  from "./features/user/userSlice";
import addQuestionSlice from "./features/question/addQuestionSlice";
import examSlice from "./features/exam/examSlice";
export const store = configureStore({
  reducer: {
    user:userReducer,
    questions:addQuestionSlice,
    exams:examSlice
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
