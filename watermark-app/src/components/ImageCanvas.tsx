import {
  useEffect,
  useRef,
  useState,
} from "react";

import { Box } from "@mui/material";

import { type Watermark } from "../types/watermark";

interface ImageCanvasProps {
  image: HTMLImageElement | null;
  watermark: Watermark;
  onWatermarkChange: (watermark: Watermark) => void;
}

export default function ImageCanvas({
  image,
  watermark,
  onWatermarkChange,
}: ImageCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [dragging, setDragging] = useState(false);

  const draw = () => {
    const canvas = canvasRef.current;

    if (!canvas || !image) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;

    ctx.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    ctx.drawImage(
      image,
      0,
      0,
      canvas.width,
      canvas.height
    );

    if (!watermark.text) return;

    ctx.save();

    ctx.globalAlpha = watermark.opacity;

    ctx.fillStyle = watermark.color;

    ctx.font = `${
      watermark.bold ? "bold " : ""
    }${watermark.fontSize}px ${watermark.fontFamily}`;

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.translate(
      watermark.x,
      watermark.y
    );

    ctx.rotate(
      (watermark.rotation * Math.PI) / 180
    );

    ctx.fillText(
      watermark.text,
      0,
      0
    );

    ctx.restore();
  };

  useEffect(() => {
    draw();
  }, [
    image,
    watermark,
  ]);

  const getCanvasPosition = (
    event: React.MouseEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;

    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();

    const scaleX =
      canvas.width / rect.width;

    const scaleY =
      canvas.height / rect.height;

    return {
      x:
        (event.clientX - rect.left) *
        scaleX,

      y:
        (event.clientY - rect.top) *
        scaleY,
    };
  };

  const handleMouseDown = (
  ) => {
    if (!watermark.text) return;

    setDragging(true);
  };

  const handleMouseMove = (
    event: React.MouseEvent<HTMLCanvasElement>
  ) => {
    if (!dragging) return;

    const position =
      getCanvasPosition(event);

    if (!position) return;

    onWatermarkChange({
      ...watermark,
      x: position.x,
      y: position.y,
    });
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        overflow: "auto",
      }}
    >
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{
          maxWidth: "100%",
          height: "auto",
          cursor: dragging
            ? "grabbing"
            : "grab",
          display: "block",
        }}
      />
    </Box>
  );
}