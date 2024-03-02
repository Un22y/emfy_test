import { loadAllPages, loadPage } from "./api/actions/actions";
import { LeadList } from "./components/lead-list/LeadList";
import { Pagination } from "./components/pagination/Pagination";
import StateBaseUI from "./core/classes/state-based-ui-instanse";
import state from "./state/state";
import "./styles/style.scss";
import "./styles/normalize.scss";

export default async function main() {
  await loadPage({ page: state.get("current"), limit: state.get("limit") });
  Pagination.render();
  renderPage(LeadList, Pagination);
}

main();

/**
 * @param {StateBaseUI} list
 * @param {StateBaseUI} pagination
 */
export function renderPage(list, pagination) {
  document.getElementById("pageLimit").onchange = async function (e) {
    state.set("selectedLead", null);
    const {
      target: { value: limit },
    } = e;
    if (limit === "all") {
      state.set("pageList", []);
      await loadAllPages(1);
      renderPage(list, pagination);
      return;
    }
    const check = await loadPage({ limit: Number(limit), page: 1 });
    if (!!check) {
      renderPage(list, pagination);
      return;
    }
    state.set("limit", Number(limit));
    renderPage(list, pagination);
  };

  document.getElementById("page-next").onclick = async function (e) {
    state.set("selectedLead", null);
    const {
      currentTarget: {
        dataset: { page },
      },
    } = e;
    console.log(page);
    const limit = state.get("limit");
    const check = await loadPage({ limit, page: Number(page) });
    console.log(check);
    if (!!check) {
      renderPage(list, pagination);
      return;
    }
    state.set("current", Number(page));
    renderPage(list, pagination);
  };

  document.getElementById("page-prev").onclick = async function (e) {
    state.set("selectedLead", null);
    const {
      currentTarget: {
        dataset: { page },
      },
    } = e;
    console.log(page);
    const limit = state.get("limit");
    const check = await loadPage({ limit, page: Number(page) });
    console.log(check);
    if (!!check) {
      renderPage(list, pagination);
      return;
    }
    state.set("current", Number(page));
    renderPage(list, pagination);
  };

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
