import { loadAllPages, loadPage } from "../api/actions/actions";
import state from "../state/state";
import StateBaseUI from "./classes/state-based-ui-instanse";

/**
 * @param {StateBaseUI} list
 * @param {StateBaseUI} pagination
 */
export function addEventListeners(list, pagination) {
  document.getElementById("pageLimit").onchange = async function (event) {
    state.set("selectedLead", null);
    const {
      target: { value: limit },
    } = event;
    if (limit === "all") {
      state.set("pageList", []);
      await loadAllPages(1);
      state.set("limit", limit);
      addEventListeners(list, pagination);
      return;
    }
    const check = await loadPage({ limit: Number(limit), page: 1 });
    if (!!check) {
      addEventListeners(list, pagination);
      return;
    }
    state.set("limit", Number(limit));
    addEventListeners(list, pagination);
  };

  const navPages = document.querySelectorAll('[data-role="navigation"]');
  if (navPages.length) {
    navPages.forEach(
      (navButton) =>
        (navButton.onclick = async function (e) {
          state.set("selectedLead", null);
          const {
            currentTarget: {
              dataset: { page },
            },
          } = e;

          const limit = state.get("limit");
          const check = await loadPage({ limit, page: Number(page) });

          if (!!check) {
            addEventListeners(list, pagination);
            return;
          }
          state.set("current", Number(page));
          addEventListeners(list, pagination);
        })
    );
  }

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
      addEventListeners(list, pagination);
    };
  });

  const closeInfo = document.getElementById("close-info");
  if (!!closeInfo) {
    closeInfo.onclick = function () {
      state.set("selectedLead", null);
    };
  }

  const sortingSelects = document.querySelectorAll("[data-role='sortable']");
  sortingSelects.forEach((select) => {
    select.onchange = function (event) {
      const {
        target: {
          value: direction,
          dataset: { key, type },
        },
      } = event;
      const newSorting = { direction, type, key };
      state.set("sorting", newSorting);
      addEventListeners(list, pagination);
    };
  });
}
