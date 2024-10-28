import moment from "moment-timezone";

export const convertToUserTimezone = (contact) => {
  const userTimezone = contact.timezone || "UTC";
  return {
    ...contact,
    createdAt: moment(contact.createdAt).tz(userTimezone).format(),
    updatedAt: moment(contact.updatedAt).tz(userTimezone).format(),
  };
};
