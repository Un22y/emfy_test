import { loadPage } from "./api/actions/actions";
import { LeadList } from "./components/lead-list/LeadList";
import { Pagination } from "./components/pagination/Pagination";
import state from "./state/state";
import "./styles/style.scss";
import "./styles/normalize.scss";
import { addEventListeners } from "./core/init-listeners";

export default async function main() {
  await loadPage({ page: state.get("current"), limit: state.get("limit") });
  addEventListeners(LeadList, Pagination);
}

main();
