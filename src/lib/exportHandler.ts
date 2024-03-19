import { toJpeg, toPng, toSvg } from "html-to-image";
import React, { useState } from "react";

import { PDFDocument } from 'pdf-lib';



export function exportHandlerPNG(ref: any) {
  if (ref.current === null) {
    return
  }

  toPng(ref.current, { cacheBust: true, })
    .then((dataUrl) => {
      const link = document.createElement('a')
      link.download = 'png_image.png'
      link.href = dataUrl
      link.click()
    })
    .catch((err) => {
      console.log(err)
    })
}

export function exportHandlerPDF(ref: any) {
  if (ref.current === null) {
    return;
  }

  toPng(ref.current, { cacheBust: true })
    .then(async (dataUrl) => {
      const pdfDoc = await PDFDocument.create();
      const pdfImage = await pdfDoc.embedPng(dataUrl);

      const page = pdfDoc.addPage();
      const { width, height } = page.getSize();
      const props = pdfImage.scaleToFit(width * 0.9, height * 0.9)
      page.drawImage(pdfImage, {
        x: (width - props.width) / 2,
        y: height - props.height,
        width: props.width,
        height: props.height,
      });

      const pdfBytes = await pdfDoc.save();
      const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(pdfBlob);
      link.download = 'pdf_image.pdf';
      link.click();
    })
    .catch((err) => {
      console.log(err);
    });
}



export function exportHandlerSVG(ref: any) {
  if (ref.current === null) {
    return
  }

  toSvg(ref.current, { cacheBust: true, })
    .then((dataUrl) => {
      const link = document.createElement('a')
      link.download = 'svg_image.svg'
      link.href = dataUrl
      link.click()
    })
    .catch((err) => {
      console.log(err)
    })
}

export function exportHandlerJPEG(ref: any) {
  if (ref.current === null) {
    return
  }

  toJpeg(ref.current, { cacheBust: true, })
    .then((dataUrl) => {
      const link = document.createElement('a')
      link.download = 'jpeg_image.jpeg'
      link.href = dataUrl
      link.click()
    })
    .catch((err) => {
      console.log(err)
    })
}
