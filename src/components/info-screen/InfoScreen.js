import StateBaseUI from "../../core/classes/state-based-ui-instanse";
import "./info-screen.scss";

export const InfoScreen = new StateBaseUI({
  data: {
    selected: null,
  },
  selector: "#info-screen",
  /**
   *
   * @param {{list: {created: number, id: number, nayme: string, price: number, responsibleName: string, customFields: Array<{name: string, value: string}>}, selected:{id: number, name: string, customFields: Array<{name: string, value: string}} | null}} props
   * @returns {string}
   */
  template: function ({ selected }) {
    if (!selected) {
      return ``;
    }
    return `
        <div class='info-screen__container'>
            <div class='info-screen__close'>
                <button class='info-screen__close-btn' id='close-info'>
                    <svg width='12' height='12' viewPort="0 0 12 12">
                        <line x1="1" y1="11" 
                              x2="11" y2="1" 
                              stroke="currentColor" 
                              stroke-width="2"/>
                        <line x1="1" y1="1" 
                              x2="11" y2="11" 
                              stroke="currentColor" 
                              stroke-width="2"/>
                    </svg>
                </button>
            </div>
          <div class='info-screen__full-info'>
            <h3>${selected.name}</h3>
            ${selected.customFields
              .map(
                ({ name, value }) => `
              <div class='info-screen__full-info-item'>
                <span>${name}:</span>
                <span>${value}</span>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      `;
  },
});
