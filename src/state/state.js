import { InfoScreen } from "../components/info-screen/InfoScreen";
import { LeadList } from "../components/lead-list/LeadList";
import { Pagination } from "../components/pagination/Pagination";
import { StateModule } from "../core/classes/state-module/StateModule";

export const initialState = {
  current: 1,
  limit: 5,
  total: [],
  pageList: [],
  users: [],
  selectedLead: null,
  isFinalPage: false,
  isLoading: false,
};

const state = new StateModule(initialState);

state.addObserver("pageList", () => {
  const pageList = state.get("pageList");
  console.log(pageList);
  LeadList.data.list = [...pageList];
});
state.addObserver("selectedLead", () => {
  InfoScreen.data.selected = state.get("selectedLead");
});

state.addObserver("isFinalPage", () => {
  Pagination.data.pagination.isFinalPage = state.get("isFinalPage");
});

state.addObserver("isLoading", () => {
  if (LeadList.data.isLoading !== state.get("isLoading")) {
    console.log("change!");
    LeadList.data.isLoading = state.get("isLoading");
  }
});

state.addObserver("limit", async () => {
  console.log("limit changes");
  Pagination.data.pagination.limit = state.get("limit");
});
state.addObserver("current", async () => {
  Pagination.data.pagination.current = state.get("current");
});

export default state;
