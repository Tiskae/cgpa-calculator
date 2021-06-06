import "core-js";
import MainView from "./views/menuView";
import ResultView from "./views/resultsPgaeView";
import * as Model from "./model";

const init = function () {
  MainView.controlTheme();
  MainView.controlAddField();
  MainView.controlCgpa(Model);
  MainView.controlRemoveField();
  MainView.controlCancelErrorMsg();
  MainView.controlGradeColor();
  MainView.controlResetForm();
  ResultView.controlGoBack();
  //   ResultView.update(Model.state);
};

init();
