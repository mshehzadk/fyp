import formidable from 'formidable';
import fs from 'fs';
import { IncomingMessage } from 'http';
import path from 'path';

export const config = {
  api: {
    bodyParser: false, // Disable body parsing, we use formidable for file uploads
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: IncomingMessage, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error?: string; success?: boolean; }): void; new(): any; }; }; }) => {
  const form = new formidable.IncomingForm();
  form.uploadDir = path.join(process.cwd(), 'public/videos'); // Set the upload directory
  form.keepExtensions = true; // Keep file extensions

  form.on('file', (name, file) => {
    // Rename the uploaded file with a unique name or perform other actions
  });

  form.parse(req, (err, fields) => {
    if (err) {
      return res.status(500).json({ error: 'Error uploading file.' });
    }

    // If you need to process the uploaded file, you can do it here

    res.status(200).json({ success: true });
  });
};
