import { getLocalStorage } from "../../core/helpers/local-storage";
import StateBaseUI from "../../core/classes/state-based-ui-instanse";
import { DOTS, usePagination } from "./usePagination";
import "./pagination.scss";

export const Pagination = new StateBaseUI({
  data: {
    pagination: {
      current: getLocalStorage("page") || 1,
      limit: 5,
      total: 0,
    },
  },
  selector: "#pagination-root",
  template: function (props) {
    const {
      pagination: { total, limit, current },
    } = props;
    const paginationRange = usePagination({
      totalCount: total,
      pageSize: limit,
      current,
    });
    const template = `
        <div class='pagination__container'>
          <ul class='pagination__list'>
            ${paginationRange
              .map((pageNumber) => {
                if (pageNumber === DOTS) {
                  return `
                    <li class='pagination__list-item'>
                        <span>&#8230;</span>
                    </li>
                `;
                }
                return `
                <li class='pagination__list-item'>
                    <button
                        id='pageButton${pageNumber}'
                        data-page=${pageNumber}
                        ${current === pageNumber && "disabled"}
                    >
                        <span>${pageNumber}</span>
                    </button>
                </li>
                `;
              })
              .join("")}
            <li style='display: flex; flex-direction: column; justify-content: center;'>
              <span>Количество строк:</span>
              <select class='pagination__limit-select' value=${limit} id='pageLimit'>
                <option ${limit === 2 ? "selected" : ""} value='2'>2</option>
                <option ${limit === 5 ? "selected" : ""} value='5'>5</option>
                <option ${limit === 10 ? "selected" : ""} value='10'>10</option>
                <option ${
                  limit === "all" ? "selected" : ""
                } value='all'>Показать все</option>
              </select>
            </li>
          </ul>
         
        </div>
      `;
    return template;
  },
});
