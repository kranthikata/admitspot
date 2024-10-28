import { prisma } from "../../config/db";
import { generateCSV } from "../../utils/fileUtils";

export default async function handler(req, res) {
  try {
    const contacts = await prisma.contact.findMany();
    const csvFile = await generateCSV(contacts); // Generate CSV file from contacts

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", 'attachment; filename="contacts.csv"');
    res.status(200).send(csvFile);
  } catch (error) {
    res.status(500).json({ error: "Failed to download contacts." });
  }
}
