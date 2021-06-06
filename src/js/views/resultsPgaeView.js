import "core-js";

class ResultView {
  constructor() {
    this.parentEl = document.querySelector(".result-page");
    this.formContainer = document.querySelector(".main-slide__main");
    this.btnGoBackEl = document.querySelector(".result-cgpa__go-back-btn");
    this.btnReset = document.querySelector(".reset-btn");
    this.infoTotalCoursesEL = document.querySelector(".result__total-courses");
    this.infoTotalUnitsEl = document.querySelector(".result__total-units");
    this.infoTotalPointsEL = document.querySelector(".result__total-points");
    this.infoCgpaClass = document.querySelector(".cgpa-class");
    this.infoResultRemark = document.querySelector(".result__remark");
    this.cgpaValueEl = document.querySelector(".cgpa-value");
    this.cgpaStandardEl = document.querySelector(".cgpa-standard");
    this.cgpaAdvice = document.querySelector(".cgpa-advice");
    this.hiddenCgpaForm = document.querySelector(".main-slide__form");
    this.hiddenCgpaFooter = document.querySelector(".main-slide__footer");
  }

  goBackBtnHandler() {
    this.parentEl.classList.add("hidden");
    [
      this.formContainer,
      this.hiddenCgpaForm,
      this.hiddenCgpaFooter,
      this.btnReset,
    ].forEach((e) => e.classList.remove("hidden"));
  }

  controlGoBack() {
    this.btnGoBackEl.addEventListener(
      "click",
      this.goBackBtnHandler.bind(this)
    );
  }

  updateTotalCourses(value) {
    this.infoTotalCoursesEL.textContent = value;
  }

  updateTotalUnits(value) {
    this.infoTotalUnitsEl.textContent = value;
  }

  updateTotalPoints(state) {
    this.infoTotalPointsEL.textContent = `${state.totalGradesValue} / ${state.totalPoints}`;
  }

  updateRemark(value) {
    this.infoResultRemark.textContent = value;
  }

  updateCgpaValue(value) {
    this.cgpaValueEl.textContent = value;
  }

  updateCgpaStandard(value) {
    this.cgpaStandardEl.textContent = value;
  }

  updateCgpaClass(value) {
    this.infoCgpaClass.textContent = value;
  }

  updateCgpaAdvice(value) {
    this.cgpaAdvice.textContent = value;
  }

  update(state) {
    this.updateTotalCourses(state.totalCourses);
    this.updateTotalUnits(state.totalUnits);
    this.updateTotalPoints(state);
    this.updateRemark(state.remark);
    this.updateCgpaClass(state.cgpaClass);
    this.updateCgpaValue(state.CGPA);
    this.updateCgpaStandard(state.cgpaStandard);
    this.updateCgpaAdvice(state.advice);
  }
}

const resultView = new ResultView();
export default resultView;
