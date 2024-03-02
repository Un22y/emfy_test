import StateBaseUI from "../../core/classes/state-based-ui-instanse";
import "./pagination.scss";

export const Pagination = new StateBaseUI({
  data: {
    pagination: {
      current: 1,
      limit: 5,
      total: 0,
      isFinalPage: false,
      isLoading: false,
    },
  },
  selector: "#pagination-root",
  template: function (props) {
    const {
      pagination: { limit, current, isFinalPage, isLoading },
    } = props;

    const template = `
        <div class='pagination__container'>
          <ul class='pagination__list'>
            ${
              limit === "all"
                ? ""
                : `<li class='pagination__list-item'>
              <button
                data-role='navigation'
                id='page-prev'
                ${current === 1 || isLoading ? "disabled" : ""}
                data-page=${current - 1}
              >
                <span>Назад</span>
                  </button>
                </li>
            <li class='pagination__list-item'>
              <button
                data-role='navigation'
                id='page-next'
                data-page=${current + 1}
                ${!!isFinalPage || isLoading ? "disabled" : ""}
              >
                <span>Вперед</span>
              </button>
            </li>`
            }
            <li style='display: flex; flex-direction: column; justify-content: center;'>
              <span>Количество строк:</span>
              <select  ${
                isLoading ? "disabled" : ""
              } class='pagination__limit-select' value=${limit} id='pageLimit'>
                <option ${limit === 2 ? "selected" : ""} value='2'>2</option>
                <option ${limit === 5 ? "selected" : ""} value='5'>5</option>
                <option ${limit === 10 ? "selected" : ""} value='10'>10</option>
                <option ${
                  limit === "all" ? "selected" : ""
                } value='all'>Показать все</option>
              </select>
            </li>
            <li class='pagination__list-item'>
              <span>Элементов на странице - ${limit}</span>
              <span>Страница#${current} ${
      !isFinalPage ? "" : ` - последняя в списке`
    }</span>
              
            </li>
          </ul>
         
        </div>
      `;
    return template;
  },
});
