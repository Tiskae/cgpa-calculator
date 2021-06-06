import "core-js";

class MainView {
  constructor() {
    this.body = document.querySelector("body");
    this.iconLightTheme = document.querySelector(".icon--light-theme");
    this.iconDarkTheme = document.querySelector(".icon--dark-theme");
    this.container = document.querySelector(".main-slide__main");
    this.form = document.querySelector(".main-slide__form");
    this.formFooter = document.querySelector(".main-slide__footer");
    this.btnAddField = document.querySelector(".add-field");
    this.btnCalculateCGPA = document.querySelector(".calculate-cgpa");
    this.bgVideo = document.querySelector(".bg-video");
    this.blankFormMessage = document.querySelector(".blank-form");
    this.hiddenResultPage = document.querySelector(".result-page");
    this.errorMessageBox = document.querySelector(".error-box");
    this.errorMessageEl = document.querySelector(".error-message");
    this.btnCancelErrorMsg = document.querySelector(".remove-error-message");
    this.btnReset = document.querySelector(".reset-btn");
  }

  _generateFieldMarkup() {
    const markup = `
          <div class="main-slide__form--field">
            <button class="remove-field">x</button>
            <input
              type="text"
              class="main-slide__form--input main-slide__form--input-code"
            />
            <select
              class="main-slide__form--input main-slide__form--input-unit"
              name="unit"
              id="unit"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
            </select>

            <select
              class="main-slide__form--input main-slide__form--input-grade"
              name="grade"
              id="grade"
            >
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
              <option value="F">F</option>
            </select>
        </div>`;

    return markup;
  }

  _generateDefaultFormMarkup() {
    const defaultFormMarkup = `
          <div class="main-slide__form--headings">
            <h3>Couse code</h3>
            <h3>Unit</h3>
            <h3>Grade</h3>
          </div>

          <div class="blank-form">
            <p>Nothing to calculate here, add new fields to get started :)</p>
          </div>

          <div class="main-slide__form--field">
            <button class="remove-field">x</button>
            <input
              type="text"
              class="main-slide__form--input main-slide__form--input-code"
            />
            <select
              class="main-slide__form--input main-slide__form--input-unit"
              name="unit"
              id="unit"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
            </select>

            <select
              class="main-slide__form--input main-slide__form--input-grade"
              name="grade"
              id="grade"
            >
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
              <option value="F">F</option>
            </select>
        </div>
    `;

    return defaultFormMarkup;
  }

  toggleLightMode() {
    this.body.classList.toggle("light-theme");
    this.iconLightTheme.classList.toggle("hidden");
    this.iconDarkTheme.classList.toggle("hidden");
  }

  controlTheme() {
    [this.iconLightTheme, this.iconDarkTheme].forEach((icon) =>
      icon.addEventListener("click", this.toggleLightMode.bind(this))
    );
  }

  btnAddFieldHandler() {
    const markup = this._generateFieldMarkup();
    this.form.insertAdjacentHTML("beforeend", markup);
    this.updateBlankFormMessage();
  }

  controlAddField() {
    this.btnAddField.addEventListener(
      "click",
      this.btnAddFieldHandler.bind(this)
    );
  }

  resetForm() {
    this.form.innerHTML = this._generateDefaultFormMarkup();

    // updating the new HTML el with the previous one
    this.blankFormMessage = document.querySelector(".blank-form");
  }

  showBgVideo() {
    this.bgVideo.classList.add("play");
  }

  hideBgVideo() {
    this.bgVideo.classList.remove("play");
  }

  btnCalculateCGPAHandler() {
    if (!this.btnCalculateCGPA.classList.contains("disabled"))
      this.showBgVideo();
  }

  btnCalculateCGPAHandlerRm() {
    this.hideBgVideo();
  }

  controlResetForm() {
    this.btnReset.addEventListener("click", this.resetForm.bind(this));
  }

  hideFormShowResult() {
    this.container.classList.add("hidden");
    this.form.classList.add("hidden");
    this.formFooter.classList.add("hidden");
    this.hiddenResultPage.classList.remove("hidden");
    this.btnReset.classList.add("hidden");
  }

  updateBlankFormMessage() {
    const formLastChild = this.form.lastElementChild;

    if (formLastChild.classList.contains("blank-form")) {
      this.blankFormMessage.classList.add("visible");
      this.btnCalculateCGPA.classList.add("disabled");
    } else {
      this.blankFormMessage.classList.remove("visible");
      this.btnCalculateCGPA.classList.remove("disabled");
    }
  }

  removeFieldHandler(event) {
    const { target } = event;
    const targetField = target.closest(".main-slide__form--field");
    targetField.remove();
    this.updateBlankFormMessage();
  }

  controlRemoveField() {
    this.form.addEventListener("click", (event) => {
      const target = event.target;
      if (!target.classList.contains("remove-field")) return;

      this.removeFieldHandler(event);
    });
  }

  hideErrorMessage() {
    this.errorMessageBox.classList.add("hidden");
  }

  addInvalidForm() {
    this.form.classList.add("invalid");
  }

  removeInvalidForm() {
    this.form.classList.remove("invalid");
  }

  updateErrorMessage(state) {
    if (state.errorExists) {
      this.errorMessageEl.textContent = state.errorMsg;
      this.errorMessageBox.classList.remove("hidden");
      this.addInvalidForm();
      this.hideBgVideo();

      setTimeout(() => {
        this.hideErrorMessage();
        this.removeInvalidForm();
      }, 2000);
    }
  }

  controlCancelErrorMsg() {
    this.btnCancelErrorMsg.addEventListener("click", () => {
      this.hideErrorMessage();
      this.removeInvalidForm();
    });
  }

  gradeFieldColorHandler(ev) {
    if (!ev.target.classList.contains("main-slide__form--input-grade")) return;
    const gradeField = ev.target;
    const val = gradeField.value.toLowerCase();
    gradeField.className = "";
    [
      val,
      "main-slide__form--input",
      "main-slide__form--input-grade",
    ].forEach((el) => gradeField.classList.add(el));
  }

  controlGradeColor() {
    this.form.addEventListener(
      "change",
      this.gradeFieldColorHandler.bind(this)
    );
  }

  calculateCgpaHandler(model) {
    model.calculateCGPA();
    this.updateErrorMessage(model.state);

    if (
      this.btnCalculateCGPA.classList.contains("disabled") ||
      model.state.errorExists
    ) {
      return;
    }
    this.hideFormShowResult(model.state);
  }

  controlCgpa(model) {
    this.btnCalculateCGPA.addEventListener(
      "mouseenter",
      this.btnCalculateCGPAHandler.bind(this)
    );
    this.btnCalculateCGPA.addEventListener(
      "mouseout",
      this.btnCalculateCGPAHandlerRm.bind(this)
    );

    this.btnCalculateCGPA.addEventListener("click", () => {
      this.calculateCgpaHandler(model);
    });
  }
}

const mainView = new MainView();
export default mainView;
