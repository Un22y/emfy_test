import StateBaseUI from "../../core/classes/state-based-ui-instanse";
import "./lead-list.scss";

export const LeadList = new StateBaseUI({
  data: {
    list: [],
    selected: null,
    isLoading: false,
    sorting: {
      key: null,
      direction: null,
    },
  },
  selector: "#list-root",
  /**
   *
   * @param {{list: {created: number, id: number, name: string, price: number, responsibleName: string, customFields: Array<{name: string, value: string}>}, selected:{id: number, name: string, customFields: Array<{name: string, value: string}} | null, isLoading: boolean}} props
   * @returns {string}
   */
  template: function ({ list, selected, isLoading, sorting }) {
    const { key, direction } = sorting;
    if (isLoading) {
      return `
      <h1 class='lead-list__title'>Список сделок</h1>
      <div class='lead-list__container lead-list__container_preloader'>
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"            style="margin: auto; background: none; display: block; shape-rendering: auto;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
          <circle cx="50" cy="50" r="32" stroke-width="8" stroke="#292664" stroke-dasharray="50.26548245743669 50.26548245743669" fill="none" stroke-linecap="round">
            <animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform>
          </circle>
          <circle cx="50" cy="50" r="23" stroke-width="8" stroke="#667395" stroke-dasharray="36.12831551628262 36.12831551628262" stroke-dashoffset="36.12831551628262" fill="none" stroke-linecap="round">
            <animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1" values="0 50 50;-360 50 50"></animateTransform>
          </circle>
        </svg>
      </div>
    `;
    }
    if (!list.length) {
      return `
        <h1>Список сделок</h1>
      `;
    }
    return `
      <h1 class="lead-list__title">Список сделок</h1>
      <div class='lead-list__container'>
        <div class='lead-list__header'>
          <div class='lead-list__cell lead-list__cell_cell-header lead-list__cell_sortable' >
            <span>Название</span>
            <select class='lead-list__sort-select' ${
              isLoading ? "disabled" : ""
            } data-key='name' data-type='string' class=''  data-role='sortable'>
                <option ${
                  key === null ? "selected" : ""
                } value='none'>Без сортировки</option>
                <option ${
                  key === "name" && direction === "asc" ? "selected" : ""
                } value='asc'>По возрастанию</option>
                <option ${
                  key === "name" && direction === "desc" ? "selected" : ""
                } value='desc'>По убыванию</option>
              </select>
          </div>
          <div class='lead-list__cell lead-list__cell_cell-header lead-list__cell_sortable'  >
            <span>Бюджет</span>
            <select class='lead-list__sort-select' ${
              isLoading ? "disabled" : ""
            } value='asc'  data-key='price' data-type='number' class='' data-role='sortable'>
                  <option ${
                    key === null ? "selected" : ""
                  } value='none'>Без сортировки</option>
                <option ${
                  key === "price" && direction === "asc" ? "selected" : ""
                } value='asc'>По возрастанию</option>
                <option ${
                  key === "price" && direction === "desc" ? "selected" : ""
                } value='desc'>По убыванию</option>
              </select>
          </div>
          <div class='lead-list__cell lead-list__cell_cell-header' ><span>Дата создания</span></div>
          <div class='lead-list__cell lead-list__cell_cell-header' ><span>Ответственный</span></div>
          <div class='lead-list__cell lead-list__cell_cell-header' ><span>Дополнительно</span></div>
        </div>
        <ul class='lead-list__list'>
          ${list
            .map(
              ({ id, name, price, created, customFields, responsibleName }) => {
                return `
              <li id=${id} class='lead-list__item'>
                <div class='lead-list__cell'>
                  <span>
                    ${name}
                  </span>
                </div>
                <div class='lead-list__cell'>
                  <span>
                    ${price}
                  </span>
                </div>
                <div class='lead-list__cell'>
                  <span>
                    ${new Date(created * 1000).toLocaleDateString()}
                  </span>
                </div>
                <div class='lead-list__cell'>
                  <span>
                    ${responsibleName}
                  </span>
                </div>
                ${
                  !!customFields
                    ? `
                  <div class="lead-list__cell">
                    <button data-role='full-info' id='info-${id}' value=${id}>${
                        selected?.id === id ? "Закрыть" : "Открыть"
                      }</button>
                  </div>
                `
                    : `
                  <div class="lead-list__cell">
                    <span>Нет данных<span>
                  </div>
                  
                  `
                }
              </li>`;
              }
            )
            .join("")}
        </ul>
        ${
          !!selected
            ? `
        <div class='lead-list__full-info'>
          <h3>${selected.name}</h3>
          ${selected.customFields
            .map(
              ({ name, value }) => `
            <div class='lead-list__full-info-item'>
              <span>${name}:</span>
              <span>${value}</span>
            </div>
          `
            )
            .join("")}
        </div>`
            : ""
        }
      </div>
    `;
  },
});
