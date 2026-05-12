import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import cors from "cors";
import { PDFDocument, rgb } from "pdf-lib";
import sharp from "sharp";
import mammoth from "mammoth";
import { Document, Packer, Paragraph, TextRun } from "docx";
// @ts-ignore
import pdfParse from "pdf-parse";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Configure multer for file uploads
const upload = multer({ dest: "uploads/" });

// Ensure uploads directory exists
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// Helper: Delete file safely
const deleteFile = (filePath: string) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (err) {
    console.error(`Error deleting file ${filePath}:`, err);
  }
};

// API: Word to PDF (Text Extraction based simple version)
app.post("/api/convert/word-to-pdf", upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  try {
    const result = await mammoth.extractRawText({ path: req.file.path });
    const text = result.value;

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    
    // Simple text wrapping (very basic for this demo)
    page.drawText(text.substring(0, 2000), {
      x: 50,
      y: height - 50,
      size: 10,
      color: rgb(0, 0, 0),
      maxWidth: width - 100,
    });

    const pdfBytes = await pdfDoc.save();
    const outputPath = `uploads/${req.file.filename}.pdf`;
    fs.writeFileSync(outputPath, pdfBytes);

    res.download(outputPath, `${req.file.originalname.replace(".docx", "")}.pdf`, () => {
      deleteFile(req.file!.path);
      deleteFile(outputPath);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Conversion failed" });
  }
});

// API: PDF to Word
app.post("/api/convert/pdf-to-word", upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  try {
    const dataBuffer = fs.readFileSync(req.file.path);
    const data = await (pdfParse as any)(dataBuffer);

    const doc = new Document({
      sections: [{
        properties: {},
        children: data.text.split("\n").map(line => new Paragraph({
          children: [new TextRun(line)],
        })),
      }],
    });

    const buffer = await Packer.toBuffer(doc);
    const outputPath = `uploads/${req.file.filename}.docx`;
    fs.writeFileSync(outputPath, buffer);

    res.download(outputPath, `${req.file.originalname.replace(".pdf", "")}.docx`, () => {
      deleteFile(req.file!.path);
      deleteFile(outputPath);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Conversion failed" });
  }
});

// API: Image to PDF
app.post("/api/convert/image-to-pdf", upload.array("files"), async (req, res) => {
  const files = req.files as Express.Multer.File[];
  if (!files || files.length === 0) return res.status(400).json({ error: "No files uploaded" });

  try {
    const pdfDoc = await PDFDocument.create();

    for (const file of files) {
      const imageBuffer = await sharp(file.path).toFormat("jpeg").toBuffer();
      const image = await pdfDoc.embedJpg(imageBuffer);
      const page = pdfDoc.addPage([image.width, image.height]);
      page.drawImage(image, {
        x: 0,
        y: 0,
        width: image.width,
        height: image.height,
      });
    }

    const pdfBytes = await pdfDoc.save();
    const outputPath = `uploads/images_${Date.now()}.pdf`;
    fs.writeFileSync(outputPath, pdfBytes);

    res.download(outputPath, "converted.pdf", () => {
      files.forEach(f => deleteFile(f.path));
      deleteFile(outputPath);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Conversion failed" });
  }
});

// API: PDF Merger
app.post("/api/pdf/merge", upload.array("files"), async (req, res) => {
  const files = req.files as Express.Multer.File[];
  if (!files || files.length < 2) return res.status(400).json({ error: "Need at least 2 files" });

  try {
    const mergedPdf = await PDFDocument.create();

    for (const file of files) {
      const pdfBytes = fs.readFileSync(file.path);
      const pdf = await PDFDocument.load(pdfBytes);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const mergedPdfBytes = await mergedPdf.save();
    const outputPath = `uploads/merged_${Date.now()}.pdf`;
    fs.writeFileSync(outputPath, mergedPdfBytes);

    res.download(outputPath, "merged.pdf", () => {
      files.forEach(f => deleteFile(f.path));
      deleteFile(outputPath);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Merge failed" });
  }
});

// API: PDF Splitter (First page only for simple demo, but logic supports more)
app.post("/api/pdf/split", upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  try {
    const pdfBytes = fs.readFileSync(req.file.path);
    const pdf = await PDFDocument.load(pdfBytes);
    
    // Create new doc with just the first page
    const splitPdf = await PDFDocument.create();
    const [firstPage] = await splitPdf.copyPages(pdf, [0]);
    splitPdf.addPage(firstPage);

    const splitPdfBytes = await splitPdf.save();
    const outputPath = `uploads/split_${Date.now()}.pdf`;
    fs.writeFileSync(outputPath, splitPdfBytes);

    res.download(outputPath, "split_page_1.pdf", () => {
      deleteFile(req.file!.path);
      deleteFile(outputPath);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Split failed" });
  }
});

// API: PDF Compressor (Simple re-save for demo, real compression is complex)
app.post("/api/pdf/compress", upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  try {
    const pdfBytes = fs.readFileSync(req.file.path);
    const pdf = await PDFDocument.load(pdfBytes);
    
    // Removing metadata can save some space
    pdf.setTitle("");
    pdf.setAuthor("");
    
    const compressedPdfBytes = await pdf.save({ useObjectStreams: true });
    const outputPath = `uploads/compressed_${Date.now()}.pdf`;
    fs.writeFileSync(outputPath, compressedPdfBytes);

    res.download(outputPath, "compressed.pdf", () => {
      deleteFile(req.file!.path);
      deleteFile(outputPath);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Compression failed" });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
