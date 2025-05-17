// src/utils/exportReport.js
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const exportReport = async (elementId) => {
  const input = document.getElementById(elementId);

  if (!input) {
    console.error(`Element with ID ${elementId} not found.`);
    return;
  }

  const canvas = await html2canvas(input, {
    scale: 2, // ↑ membuat hasil lebih tajam
    useCORS: true,
    backgroundColor: "#fff",
  });

  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4"); // p = portrait, mm = millimeter
  const imgWidth = 190;
  const pageHeight = 297;

  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let position = 10;
  let heightLeft = imgHeight;

  pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);

  while (heightLeft > 0) {
    pdf.addPage();
    position = 0;
    pdf.addImage(
      imgData,
      "PNG",
      10,
      position - heightLeft,
      imgWidth,
      imgHeight
    );
    heightLeft -= pageHeight;
  }

  pdf.save("report.pdf");
};
