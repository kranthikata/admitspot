import formidable from "formidable";
import { parseCSV, validateContacts } from "../../utils/fileUtils";
import { prisma } from "../../config/db";

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req, res) {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(400).json({ error: "File upload failed" });

    try {
      const contacts = await parseCSV(files.file.path); // Parse CSV/Excel file
      await validateContacts(contacts); // Validate data against schema
      const addedContacts = await prisma.contact.createMany({ data: contacts });

      res
        .status(200)
        .json({ message: `${addedContacts.count} contacts added.` });
    } catch (error) {
      res.status(400).json({ error: "Invalid file format or data." });
    }
  });
}
