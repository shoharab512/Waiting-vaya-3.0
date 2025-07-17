import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
interface problemState {

  problem: any;
  allUser: any;
  loading: boolean;
  count: number;
  delete: number;
  // public
  page: any;
  totalPages: any;
  // student
  studentPage: any;
  studentTotalPages: any;
  userCreatedProblems: any;
  // solver
  solverProblemArisePage: any,
  solverProblemAriseTotalPages: any,
  solverProblemSolvePage: any,
  solverProblemSolveTotalPages: any,
  // 
  ariseProblems: any;
  solverSolveProblems: any;
  solveCount: any;


}

const initialState: problemState = {

  problem: [],
  allUser: [],
  loading: false,
  count: 0,
  delete: 0,
  // public
  page: 1,
  totalPages: 0,
  // student
  studentPage: 1,
  studentTotalPages: 0,
  userCreatedProblems: [],
  // solver
  solverProblemArisePage: 1,
  solverProblemAriseTotalPages: 0,
  solverProblemSolvePage: 1,
  solverProblemSolveTotalPages: 0,
  // 
  ariseProblems: [],
  solverSolveProblems: [],
  solveCount: 0

};

export const problemSlice = createSlice({
  name: "problem",
  initialState,
  reducers: {
    setProblem: (state, action) => {
      state.problem = action.payload;
    },
    setAllUser: (state, action) => {
      state.allUser = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setCount: (state, action) => {
      state.count = state.count + 1;
    },
    setDelete: (state, action) => {
      state.delete = state.delete + 1;
    },
    // public
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    // student
    setStudentPage: (state, action) => {
      state.studentPage = action.payload;
    },
    setStudentTotalPages: (state, action) => {
      state.studentTotalPages = action.payload;
    },
    setUserCreatedProblems: (state, action) => {
      state.userCreatedProblems = action.payload;
    }
    // solver
    ,
    setSolverProblemArisePage: (state, action) => {
      state.solverProblemArisePage = action.payload;
    }
    ,
    setSolverProblemAriseTotalPages: (state, action) => {
      state.solverProblemAriseTotalPages = action.payload;
    }
    ,
    setSolverProblemSolvePage: (state, action) => {
      state.solverProblemSolvePage = action.payload;
    }
    ,
    setSolverProblemSolveTotalPages: (state, action) => {
      state.solverProblemSolveTotalPages = action.payload;
    }
    ,
    setAriseProblems: (state, action) => {
      state.ariseProblems = action.payload;
    }
    ,
    setSolverSolveProblems: (state, action) => {
      state.solverSolveProblems = action.payload;
    }
    ,
    setSolveCount: (state, action) => {
      state.solveCount = action.payload;
    }

  },
});

export const { setProblem, setLoading, setCount, setPage,setSolveCount, setStudentPage, setStudentTotalPages, setSolverProblemArisePage, setSolverProblemSolvePage, setTotalPages, setAriseProblems, setSolverSolveProblems, setUserCreatedProblems, setDelete, setSolverProblemAriseTotalPages, setSolverProblemSolveTotalPages, setAllUser } = problemSlice.actions;
export const selectAllUser = (state: RootState) => state.problem.allUser;
export const selectLoading = (state: RootState) => state.problem.loading;
export const selectCount = (state: RootState) => state.problem.count;
export const selectDelete = (state: RootState) => state.problem.delete;
// public
export const selectProblem = (state: RootState) => state.problem.problem;
export const selectPage = (state: RootState) => state.problem.page;
export const selectTotalPages = (state: RootState) => state.problem.totalPages;
// student
export const selectStudentPage = (state: RootState) => state.problem.studentPage;
export const selectStudentTotalPages = (state: RootState) => state.problem.studentTotalPages;
export const selectUserCreatedProblems = (state: RootState) => state.problem.userCreatedProblems;
// solver
export const selectSolverProblemArisePage = (state: RootState) => state.problem.solverProblemArisePage;
export const selectSolverProblemAriseTotalPages = (state: RootState) => state.problem.solverProblemAriseTotalPages;
export const selectSolverProblemSolvePage = (state: RootState) => state.problem.solverProblemSolvePage;
export const selectSolverProblemSolveTotalPages = (state: RootState) => state.problem.solverProblemSolveTotalPages;
export const selectAriseProblems = (state: RootState) => state.problem.ariseProblems;
export const selectSolverSolveProblems = (state: RootState) => state.problem.solverSolveProblems;
// solve count
export const selectSolveCount = (state: RootState) => state.problem.solveCount;





export default problemSlice.reducer;
