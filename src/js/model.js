import "core-js";
import ResultView from "./views/resultsPgaeView";
import MenuView from "./views/menuView";

export const state = {
  fields: [],
  data: [],
  unitsArr: [],
  totalCourses: "",
  totalUnits: "",
  totalPoints: "",
  totalGradesValue: "",
  cgpaStandard: "5.00",
  CGPA: "",
  cgpaClass: "First class",
  remark: "",
  advice: "",
  errorExists: false,
  errorMsg: "",
};

const updateState = function (el) {
  const fields = document.querySelectorAll(".main-slide__form--field");
  state.fields = fields;
};

const inputFieldHandler = function (inputField) {
  const courseCode = inputField.children[1].value.toLowerCase();
  const courseUnit = +inputField.children[2].value;
  const courseGrade = inputField.children[3].value;

  if (!courseCode.trim()) {
    state.errorExists = true;
    state.errorMsg = "Empty fields are not allowed!";
    MenuView.updateErrorMessage(state);
    // throw new Error("Empty fields are not allowed!");
  } else {
    state.errorExists = false;
  }

  return { courseCode, courseUnit, courseGrade };
};

const generateStateData = function () {
  updateState();
  const fieldsArr = [...state.fields];
  state.data = [];
  fieldsArr.forEach((el) => {
    const elData = inputFieldHandler(el);
    state.data.push(elData);
  });
  state.totalCourses = state.data.length;
};

const generateTotalPoints = function () {
  generateStateData();
  const totalPointsArr = state.data.map((el) => el.courseUnit);

  const totalPoints = totalPointsArr.reduce((prevValue, currValue) => {
    return prevValue + currValue;
  });

  state.unitsArr = totalPointsArr;
  state.totalUnits = totalPoints;
  state.totalPoints = totalPoints * +state.cgpaStandard;
};

const generateGradeValues = function () {
  generateTotalPoints();

  const allGrades = state.data.map((el) => el.courseGrade);
  let allGradesValue = 0;
  allGrades.forEach((el, idx) => {
    const correspondingUnit = state.unitsArr[idx];

    switch (el) {
      case "A":
        allGradesValue += 5 * correspondingUnit; //😍
        break;
      case "B":
        allGradesValue += 4 * correspondingUnit; //🙂
        break;
      case "C":
        allGradesValue += 3 * correspondingUnit; //🙄
        break;
      case "D":
        allGradesValue += 2 * correspondingUnit; //😥
        break;
      case "E":
        allGradesValue += 1 * correspondingUnit; //😫
        break;
      case "F":
        allGradesValue += 0; //😭
        break;

      default:
        allGradesValue + 0;
        break;
    }

    state.totalGradesValue = allGradesValue;
  });
};

export const calculateCGPA = function () {
  generateGradeValues();

  const CGPA =
    (state.totalGradesValue / state.totalPoints) * +state.cgpaStandard;
  state.CGPA = CGPA.toFixed(2);

  if (isNaN(state.CGPA)) {
    state.CGPA = "intact as before";
    state.cgpaClass = "your previous CGPA class";
    state.remark = "Electives only";
    state.advice = ", you haven't registered for any course with units!";
  } else if (state.CGPA >= 4.5) {
    state.cgpaClass = "First Class";
    state.remark = "Excellent";
    state.advice = ", outstanding performance, I'm impressed!";
  } else if (state.CGPA >= 3.5) {
    state.cgpaClass = "Second Class Upper";
    state.remark = "Very Good";
    state.advice = ", great job, keep it!";
  } else if (state.CGPA >= 2.4) {
    state.cgpaClass = "Second Class Lower";
    state.remark = "Good";
    state.advice = ", good result, there's always room for improvement!";
  } else if (state.CGPA >= 1.5) {
    state.cgpaClass = "Third Class";
    state.remark = "Fair";
    state.advice =
      ", sometimes our efforts just couldn't sum up to our expectation, be happy and improve!";
  } else if (state.CGPA < 1.5 && state.CGPA >= 1.0) {
    state.cgpaClass = "Pass";
    state.remark = "Poor";
    state.advice = ", not the best of results, go harder!";
  } else if (state.CGPA < 1.0) {
    state.cgpaClass = "Probation";
    state.remark = "Poor";
    state.advice = ", don't feel down, see a counsellor!";
    // make person no motivate enter trouble 😂😂😂
  }

  ResultView.update(state);
};
