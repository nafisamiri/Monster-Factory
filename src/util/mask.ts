export default async function generateMask(imageFile: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Clear canvas with black background
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // Draw image onto canvas
        ctx.globalCompositeOperation = "destination-out"; // Set composite mode to clear existing content
        ctx.drawImage(img, 0, 0);
        // Convert canvas to blob
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Failed to generate mask"));
          }
        }, "image/png");
      } else {
        reject(new Error("Failed to get 2D context from canvas"));
      }
    };
    img.onerror = () => {
      reject(new Error("Failed to load image"));
    };
    img.src = URL.createObjectURL(imageFile);
  });
}
