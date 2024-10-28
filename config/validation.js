import Joi from "joi";

export const validateContact = (contact) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    timezone: Joi.string().required(),
  });

  return schema.validateAsync(contact);
};

export const validateContacts = (contacts) => {
  return Promise.all(contacts.map((contact) => validateContact(contact)));
};
