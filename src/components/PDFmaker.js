import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import QRCode from "qrcode";

/* ----------------------------
   Load Custom Font (TTF -> Base64)
---------------------------- */
async function loadFontToBase64(url) {
  const res = await fetch(url);
  const buffer = await res.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  let binary = "";
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}

/* ----------------------------
   Main PDF Generator
---------------------------- */
export async function generatePDF({
  data = [],
  columns = [],
  title = "گزارش",
  showTotal = false,
  totalColumn = "total",
  company = {},
  customerWhatsapp = "+93766805049",
  rtl = true
}) {
  if (!data.length) return;

  const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });

  // ---------- Load Persian Font ----------
  const fontBase64 = await loadFontToBase64("/font/myfont.ttf");
  doc.addFileToVFS("MyFont.ttf", fontBase64);
  doc.addFont("MyFont.ttf", "MyFont", "normal");
  doc.setFont("MyFont");
  doc.setFontSize(12);

  const pageWidth = doc.internal.pageSize.getWidth();

  // ---------- Generate WhatsApp QR ----------
  let qrDataUrl = null;
  if (customerWhatsapp) {
    qrDataUrl = await QRCode.toDataURL(
      `https://wa.me/${customerWhatsapp.replace(/\D/g, "")}`
    );
  }

  // ---------- Header ----------
  const headerY = 30;
  const logoWidth = 60;

  if (company.logo) {
    const img = new Image();
    img.src = company.logo;
    await new Promise(resolve => { img.onload = resolve; });
    doc.addImage(img, "PNG", 40, headerY, logoWidth, logoWidth);
  }

  if (qrDataUrl) {
    const qrSize = 70;
    doc.addImage(qrDataUrl, "PNG", pageWidth - qrSize - 40, headerY, qrSize, qrSize);
  }

  const centerX = pageWidth / 2;
  let textY = headerY + 10;
  doc.setFontSize(16);
  doc.setTextColor("#1f2937");
  doc.text(company.name || "", centerX, textY, { align: "center" });

  doc.setFontSize(10);
  doc.setTextColor("#6b7280");
  textY += 15;
  doc.text(company.slogan || "", centerX, textY, { align: "center" });

  doc.setFontSize(9);
  doc.setTextColor("#374151");
  textY += 15;
  doc.text(company.address || "", centerX, textY, { align: "center" });
  textY += 12;
  doc.text(company.phone || "", centerX, textY, { align: "center" });
  textY += 12;
  doc.text(company.email || "", centerX, textY, { align: "center" });
  textY += 12;
  doc.text(`تاریخ: ${new Date().toLocaleDateString()}`, centerX, textY, { align: "center" });

  doc.setLineWidth(1);
  doc.setDrawColor("#e5e7eb");
  doc.line(20, headerY + 80, pageWidth - 40, headerY + 80);

  // ---------- Prepare Table ----------
  const body = data.map((row) =>
    columns.map(c => {
      let value = row[c.key];
      if (c.key === "isReturn") {
        value = value ? (rtl ? "مرجوع شده" : "Returned") : (rtl ? "تکمیل شده" : "Completed");
      }
      return value ?? "-";
    })
  );

// ---------- Add Total Row ----------
if (showTotal && totalColumn) {
  const sum = data.reduce((acc, row) => {
    let val = row[totalColumn];
    if (typeof val === "string") {
      // حذف $ و کاما
      val = val.replace(/[^\d.-]/g, "");
    }
    return acc + (parseFloat(val) || 0);
  }, 0);

  // فرمت عدد با جداکننده هزار و دو رقم اعشار
  const formattedSum = sum.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const totalRow = columns.map(c => {
    if (c.key === totalColumn) return `$${formattedSum}`;
    return rtl ? "جمع" : "Total";
  });

  body.push(totalRow);
}


  // ---------- Render Table ----------
  autoTable(doc, {
    startY: headerY + 90,
    head: [columns.map(c => c.label)],
    body: body,
    styles: {
      font: "MyFont",
      fontSize: 10,
      halign: "center",
      valign: "middle",
      cellPadding: 6,
      textColor: [33, 37, 41]
    },
    headStyles: {
      fillColor: [60, 141, 188],
      textColor: 255,
      fontStyle: "bold"
    },
    alternateRowStyles: {
      fillColor: [245, 247, 250]
    },
    margin: { left: 40, right: 40 },
    theme: "grid",
    didParseCell: function (dataCell) {
      // برجسته کردن ردیف جمع
      if (showTotal && dataCell.row.index === body.length - 1) {
        dataCell.cell.styles.fontStyle = "bold";
        dataCell.cell.styles.textColor = [255, 255, 255];
        dataCell.cell.styles.fillColor = [60, 141, 188];
      }
      if (rtl) {
        dataCell.cell.styles.halign = "right";
      }
    }
  });

  // ---------- Footer ----------
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    const footerY = doc.internal.pageSize.getHeight() - 30;
    doc.setLineWidth(0.5);
    doc.setDrawColor("#e5e7eb");
    doc.line(40, footerY - 10, pageWidth - 40, footerY - 10);

    doc.setFontSize(9);
    doc.setTextColor("#6b7280");
    doc.text(company.slogan || "", 40, footerY);
    doc.text(`صفحه ${i} / ${pageCount}`, pageWidth - 40, footerY, { align: "right" });
    doc.text(rtl ? "گزارش ERP – محرمانه" : "ERP Report – Confidential", pageWidth / 2, footerY, { align: "center" });
  }

// ---------- Open PDF in New Tab ----------
const pdfBlob = doc.output("blob");
const pdfUrl = URL.createObjectURL(pdfBlob);
const win = window.open("", "_blank"); // باز کردن تب خالی

if (!win) {
  alert("مرورگر شما پنجره پاپ‌آپ را مسدود کرده است.");
  return;
}

// اضافه کردن embed + دکمه چاپ و لینک دانلود
win.document.write(`
<html lang="fa">
  <head>
    <title>${title}</title>
    <meta charset="UTF-8" />
    <style>
      body {
        margin: 0;
        background: #111827; /* dark background behind pdf */
      }

      embed {
        width: 100%;
        height: 100vh;
        border: none;
      }

      /* From Uiverse.io by TCdesign-dev */ 
.button {
position:fixed;
right:40px;
bottom:20px;
 display: inline-block;
 border-radius: 7px;
 border: none;
 background: #1875FF;
 color: white;
 font-family: inherit;
 text-align: center;
 font-size: 13px;
 box-shadow: 0px 14px 56px -11px #1875FF;
 width: 10em;
 padding: 1em;
 transition: all 0.4s;
 cursor: pointer;
}

.button span {
 cursor: pointer;
 display: inline-block;
 position: relative;
 transition: 0.4s;
}

.button span:after {
 content: 'for free';
 position: absolute;
 opacity: 0;
 top: 0;
 right: -20px;
 transition: 0.7s;
}

.button:hover span {
 padding-right: 3.55em;
}

.button:hover span:after {
 opacity: 4;
 right: 0;
}
    </style>
  </head>

  <body>
    <embed src="${pdfUrl}" type="application/pdf" />

    <div class="download-bar">
      <a class="button" style="vertical-align:middle" href="${pdfUrl}" download="report.pdf">
      
        <span>Download</span>
      </a>
    </div>
  </body>
</html>
`);


}
