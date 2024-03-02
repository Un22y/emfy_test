import StateBaseUI from "../../core/classes/state-based-ui-instanse";
import "./lead-list.scss";

export const LeadList = new StateBaseUI({
data: {
  list: [],
  selected: null,
},
selector: "#list-root",
/**
 *
 * @param {{list: {created: number, id: number, name: string, price: number, responsibleName: string, customFields: Array<{name: string, value: string}>}, selected:{id: number, name: string, customFields: Array<{name: string, value: string}} | null}} props
 * @returns {string}
 */
template: function ({ list, selected }) {
  if (!list.length) {
    return `
        <h1>Список сделок</h1>
      `;
  }
  return `
      <div style='position: relative;'>
      <h1 class="lead-list__title">Список сделок</h1>
      <div class='lead-list__container'>
        <div class='lead-list__header'>
          <div class='lead-list__cell' ><span>Название</span></div>
          <div class='lead-list__cell' ><span>Бюджет</span></div>
          <div class='lead-list__cell' ><span>Дата создания</span></div>
          <div class='lead-list__cell' ><span>Ответственный</span></div>
          <div class='lead-list__cell' ><span>Дополнительно</span></div>
        </div>
        <ul class='lead-list__list'>
          ${list
            .map(
              ({
                id,
                name,
                price,
                created,
                customFields,
                responsibleName,
              }) => {
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
              </li>`
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
      </div>

    `;
},
});
