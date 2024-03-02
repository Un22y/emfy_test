import { getLeads, getUsers } from "..";
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
