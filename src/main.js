import { loadLeads } from "./api/actions/actions";
import { LeadList } from "./components/lead-list/LeadList";
import { Pagination } from "./components/pagination/Pagination";
import StateBaseUI from "./core/classes/state-based-ui-instanse";
import { setLocalStorage } from "./core/helpers/local-storage";
import state from "./state/state";
import "./styles/style.scss";
import "./styles/normalize.scss";

export default async function main() {
  setLocalStorage("lilmit", state.get("limit"));
  await loadLeads();
  renderPage(LeadList, Pagination);
}

main();

/**
 * @param {StateBaseUI} list
 * @param {StateBaseUI} pagination
 */
export function renderPage(list, pagination) {
  document.getElementById("pageLimit").onchange = function (e) {
    state.set("selectedLead", null);
    const {
      target: { value: limit },
    } = e;
    console.log(limit);
    const total = state.get("total");
    if (limit === "all") {
      state.set("limit", "all");
      state.set("current", 1);
      state.set("pageList", [...total]);
      renderPage(list, pagination);
      return;
    }
    state.set("limit", Number(limit));
    state.set("current", 1);
    const current = state.get("current");
    const pageList = total.slice(
      (current - 1) * state.get("limit"),
      state.get("limit") * current
    );
    state.set("pageList", pageList);
    renderPage(list, pagination);
  };

  const paginationButtons = document.querySelectorAll("button[data-page]");
  paginationButtons.forEach((button) => {
    button.onclick = function (event) {
      state.set("selectedLead", null);
      const newPage = event.currentTarget.dataset.page;
      const total = state.get("total");
      state.set("current", Number(newPage));
      const pageList = total.slice(
        (Number(newPage) - 1) * state.get("limit"),
        state.get("limit") * Number(newPage)
      );
      state.set("pageList", pageList);
      renderPage(list, pagination);
    };
  });

  const fullInfoButtons = document.querySelectorAll("[data-role='full-info']");

  fullInfoButtons.forEach((button) => {
    button.onclick = function (event) {
      const {
        target: { value },
      } = event;
      const pageList = state.get("pageList");

      const { customFields, name, id } = pageList.find(
        (item) => item.id === Number(value)
      );
      const selectedLead = state.get("selectedLead");
      // if (Number(value) === selectedLead?.id) {
      //   state.set("selectedLead", null);
      //   renderPage(list, pagination);
      //   return;
      // }
      state.set("selectedLead", { customFields, name, id });
      renderPage(list, pagination);
    };
  });

  const closeInfo = document.getElementById("close-info");
  if (!!closeInfo) {
    closeInfo.onclick = function () {
      state.set("selectedLead", null);
    };
  }
}
