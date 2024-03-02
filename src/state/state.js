import { InfoScreen } from "../components/info-screen/InfoScreen";
import { LeadList } from "../components/lead-list/LeadList";
import { Pagination } from "../components/pagination/Pagination";
import { StateModule } from "../core/classes/state-module/StateModule";
import { sortingList } from "../core/helpers/sorting-list";

export const initialState = {
  current: 1,
  limit: 5,
  pageList: [],
  users: [],
  selectedLead: null,
  isFinalPage: false,
  isLoading: false,
  sorting: {
    key: null,
    type: null,
    direction: null,
  },
};

const state = new StateModule(initialState);

state.addObserver("pageList", () => {
  const pageList = state.get("pageList");
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
    LeadList.data.isLoading = state.get("isLoading");
  }
  if (Pagination.data.pagination.isLoading !== state.get("isLoading")) {
    Pagination.data.pagination.isLoading = state.get("isLoading");
  }
});

state.addObserver("limit", async () => {
  Pagination.data.pagination.limit = state.get("limit");
});
state.addObserver("current", async () => {
  Pagination.data.pagination.current = state.get("current");
});

state.addObserver("sorting", () => {
  const result = sortingList(state.get("pageList"), state.get("sorting"));
  LeadList.data.sorting = state.get("sorting");
  state.set("pageList", [...result]);
});

export default state;
