import { getLeads, getLeadsPage, getUsers } from "..";
import StateBaseUI from "../../core/classes/state-based-ui-instanse";
import { LeadsAdapter } from "../../core/helpers/leads-adapter";
import state from "../../state/state";

/**
 *
 * @param {StateBaseUI} list
 */
export async function loadLeads() {
  const limit = state.get("limit");
  const current = state.get("current");
  const {
    _embedded: { leads },
  } = await getLeads();
  const {
    _embedded: { users },
  } = await getUsers();
  const adaptedList = LeadsAdapter(leads, users);

  state.set("total", [...adaptedList]);
  const pageList = adaptedList.slice((current - 1) * limit, limit * current);
  state.set("pageList", [...pageList]);
}
/**
 *
 * @param {object} param0
 * @param {number} param0.limit
 * @param {number} param0.page
 */
export async function loadPage({ limit, page }) {
  try {
    state.set("isLoading", true);
    const {
      _embedded: { leads },
    } = await getLeadsPage({ limit, page });
    if (!state.get("users").length) {
      const {
        _embedded: { users },
      } = await getUsers();
      state.set("users", [...users]);
    }
    const users = state.get("users");
    const adaptedList = LeadsAdapter(leads, users);
    state.set("total", [...adaptedList]);
    state.set("pageList", [...adaptedList]);
    state.set("isFinalPage", false);
    state.set("isLoading", false);
  } catch (error) {
    console.error("empty list or smthng else");
    state.set("isFinalPage", true);
    state.set("isLoading", false);
    return -1;
  }
}

const RATE_LIMIT = 500;

export async function loadAllPages(page, attempts = 0) {
  try {
    state.set("isLoading", true);
    const {
      _embedded: { leads },
    } = await getLeadsPage({ limit: 5, page });
    if (leads === -1) {
      state.set("isLoading", false);
      console.warn("Received 204 status, exiting recursion.");
      return;
    } else {
      const adaptedList = LeadsAdapter(leads, state.get("users"));
      const list = state.get("pageList");
      state.set("pageList", [...list, ...adaptedList]);
      await new Promise((resolve) => setTimeout(resolve, RATE_LIMIT));
      return loadAllPages(page + 1, attempts);
    }
  } catch (error) {
    console.error("An error occurred:", error.message);
    if (attempts < 3) {
      console.warn(`Retrying request (attempt ${attempts + 1})...`);
      await new Promise((resolve) => setTimeout(resolve, RATE_LIMIT));
      return loadAllPages(page, attempts + 1);
    } else {
      state.set("isLoading", false);
      console.error("Max retry attempts reached, aborting.");
    }
  }
}
