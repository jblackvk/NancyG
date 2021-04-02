export const API = "API";

export function buildActionType({ httpmethod, entity, status }) {
  return ` [${entity}] ${API} ${httpmethod} ${status}`;
}
