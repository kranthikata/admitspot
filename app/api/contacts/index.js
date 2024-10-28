import { prisma } from "../../config/db";
import { validateContact } from "../../config/validation";
import { convertToUserTimezone } from "../../utils/timeUtils";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Add new contact
    const { name, email, phone, address, timezone } = req.body;

    try {
      await validateContact(req.body); // Validate input
      const newContact = await prisma.contact.create({
        data: { name, email, phone, address, timezone },
      });
      res.status(201).json(newContact);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else if (req.method === "GET") {
    // Retrieve contacts with optional filtering
    const { name, email, timezone } = req.query;

    try {
      const contacts = await prisma.contact.findMany({
        where: { name, email, timezone },
      });
      res
        .status(200)
        .json(contacts.map((contact) => convertToUserTimezone(contact)));
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve contacts." });
    }
  }
}
