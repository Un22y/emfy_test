import axios from "axios";

const AUTH_CODE =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjY3NDY1ODY2NTg0ZDQwM2JkNDJkNTNiYmViNDliOTc5NTY2N2UzYTkzZTZmMzM0ZGFlNWEzMzMxNjhlYWE0N2UzZGVhMTVkMTA3ZTYzNWM5In0.eyJhdWQiOiI4ZDczNzY5ZS1kNjgxLTQyN2QtYTVhMi1kNDFiODBiMjljZTciLCJqdGkiOiI2NzQ2NTg2NjU4NGQ0MDNiZDQyZDUzYmJlYjQ5Yjk3OTU2NjdlM2E5M2U2ZjMzNGRhZTVhMzMzMTY4ZWFhNDdlM2RlYTE1ZDEwN2U2MzVjOSIsImlhdCI6MTcwOTI0MDY0NSwibmJmIjoxNzA5MjQwNjQ1LCJleHAiOjE3MTE4NDMyMDAsInN1YiI6IjkzOTcwMzQiLCJncmFudF90eXBlIjoiIiwiYWNjb3VudF9pZCI6MzA5NTE5MjYsImJhc2VfZG9tYWluIjoiYW1vY3JtLnJ1IiwidmVyc2lvbiI6Miwic2NvcGVzIjpbImNybSIsImZpbGVzIiwiZmlsZXNfZGVsZXRlIiwibm90aWZpY2F0aW9ucyIsInB1c2hfbm90aWZpY2F0aW9ucyJdLCJoYXNoX3V1aWQiOiIxODYzZjZhZS0zYjIzLTRiNDMtYjBjYy0yZjc0MjA3MTFmNWUifQ.S0LH6sEAcPafYPRyuu2PgpFU4OGhMC2vTqhuT_chLmr5u6d2vLh6_B-vSvFDWw1XQsFIm9gGbLYQZ8pnphRzcUHrRulchOhR9znIFoL2rlgO24G08YsXKLws8uTybOUqfudUX9BYDXW4r8jscKPLFU-c0mKfyyjIeuAceb1QcyzMTGFRFVzw5CQrcEc_Dt5T4iYgjRmxEryuy3Fzibzlz-1tADmKrgNuwH5PxRaL2p_rokdA16AUupRXmtMqAO4yMyY1D5XJDi32CywRdgZCE_32hXjbydbN-3XilVuk_6cJkcZrY9dcnW6kkkI8V-FI95_gy5GmuElCyCwYhosXrw";
const ID = "8d73769e-d681-427d-a5a2-d41b80b29ce7";

const $server = axios.create({
  baseURL: "http://localhost:5000/proxy",
  headers: {
    Authorization: `Bearer ${AUTH_CODE}`,
  },
});

/**
 * @param {object} [query]
 * @param {number} [query.limit=250]
 * @param {number} [query.page=1]
 * @returns {Promise<{_embedded: {leads: {name: string, price: number, id: number, created_at:number, responsible_user_id}[]}}>}
 */
export const getLeads = async () => {
  const { data } = await $server.get("api/v4/leads");
  return data;
};

/**
 * @param {object} [query]
 * @param {number} [query.limit=250]
 * @param {number} [query.page=1]
 * @returns {Promise<{_embedded: {leads: {name: string, price: number, id: number, created_at:number, responsible_user_id}[] | number}} | void>}
 */
export const getLeadsPage = async ({ page, limit }) => {
  try {
    const { data, status } = await $server.get("api/v4/leads", {
      params: {
        limit,
        page,
      },
    });
    if (status === 204) {
      return { _embedded: { leads: -1 } };
    }
    return data;
  } catch (error) {
    console.error(error.message);
    return;
  }
};
/**
 *
 * @returns {Promise<{_embedded: {users: {name: string, id: number}[]}}>}
 */
export const getUsers = async () => {
  const { data } = await $server.get("api/v4/users");
  return data;
};
