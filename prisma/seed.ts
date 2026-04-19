import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Minimal valid 1-page PDF binary
const minimalPdf = Buffer.from(
  `%PDF-1.4
1 0 obj<</Type /Catalog /Pages 2 0 R>>endobj
2 0 obj<</Type /Pages /Kids [3 0 R] /Count 1>>endobj
3 0 obj<</Type /Page /Parent 2 0 R /MediaBox [0 0 595 842]>>endobj
xref
0 4
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
trailer<</Size 4 /Root 1 0 R>>
startxref
190
%%EOF`
);

async function main() {
  const existing = await prisma.document.findFirst();
  if (!existing) {
    await prisma.document.create({
      data: {
        title: "Dachau Panorama",
        fileData: minimalPdf,
        fileName: "dachau-panorama.pdf",
        mimeType: "application/pdf",
      },
    });
    console.log("Seeded database with placeholder PDF document.");
  } else {
    console.log("Database already seeded.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
