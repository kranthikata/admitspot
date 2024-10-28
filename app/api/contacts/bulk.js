import { prisma } from "../../config/db";
import { validateContacts } from "../../config/validation";
import { parseCSV } from "../../utils/fileUtils";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { file } = req.body;

    try {
      const contacts = await parseCSV(file); // Parse CSV file
      await validateContacts(contacts); // Validate contacts
      await prisma.contact.createMany({ data: contacts }); // Batch insert contacts
      res.status(200).json({ message: "Contacts successfully uploaded." });
    } catch (error) {
      res.status(400).json({ error: "Failed to process contacts." });
    }
  }
}
