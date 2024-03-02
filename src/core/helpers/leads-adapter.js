/**
 * @typedef {{
 *   created: number;
 *  id: number;
 *  name: string;
 *  price: number;
 *  responsibleName: string;
 *  customFields: {
 *     name: string;
 *    value: string;
 * }[];
 *}[]} AdaptedList
 */

/**
 *
 * @param {{name: string, price: number, id: string, created_at:number, responsible_user_id: number, custom_fields_values: object[]}[]} leadsList
 * @param {{name: string, id: number}[]} usersList
 * @returns {AdaptedList}
 */
export function LeadsAdapter(leadsList, usersList) {
  const adapted = leadsList.map((lead) => {
    const {
      created_at,
      id,
      name,
      price,
      responsible_user_id,
      custom_fields_values,
    } = lead;
    const result = {
      id,
      name,
      price,
      created: created_at,
      customFields: null,
    };
    if (!!custom_fields_values) {
      result.customFields = customFieldsAdapter(custom_fields_values);
    }
    const responsibleName = usersList.find(
      (item) => item.id === responsible_user_id
    ).name;
    result.responsibleName = responsibleName || "Нет ответственного";
    return result;
  });
  return adapted;
}

function customFieldsAdapter(cfList) {
  return cfList.map(({ field_name, field_type, values }) => {
    const result = {
      name: field_name,
    };
    const { value: fieldValue } = values[0];
    if (field_type === "date") {
      result.value = new Date(fieldValue * 1000).toLocaleDateString();
      return result;
    }
    if (field_type === "date_time") {
      result.value =
        new Date(fieldValue * 1000).toLocaleDateString() +
        " " +
        new Date(fieldValue * 1000).toLocaleTimeString();
      return result;
    }
    result.value = fieldValue;
    return result;
  });
}
