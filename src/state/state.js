import { InfoScreen } from "../components/info-screen/InfoScreen";
import { LeadList } from "../components/lead-list/LeadList";
import { Pagination } from "../components/pagination/Pagination";
import { StateModule } from "../core/classes/state-module/StateModule";

export const initialState = {
  current: 1,
  limit: 5,
  total: [],
  pageList: [],
  selectedLead: null,
};

const state = new StateModule(initialState);

state.addObserver("current", () => {
  Pagination.data.pagination.current = state.get("current");
});
state.addObserver("limit", () => {
  console.log(state.get("limit"));
  Pagination.data.pagination.limit = state.get("limit");
});
state.addObserver("total", () => {
  Pagination.data.pagination.total = state.get("total").length;
});
state.addObserver("pageList", () => {
  LeadList.data.list = [...state.get("pageList")];
});
state.addObserver("selectedLead", () => {
  InfoScreen.data.selected = state.get("selectedLead");
});

export default state;
