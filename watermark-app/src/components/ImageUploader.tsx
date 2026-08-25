import type { ChangeEvent, DragEvent } from "react";
import { Box, Button, Typography } from "@mui/material";

interface ImageUploaderProps {
  onImageSelected: (file: File) => void;
}

export default function ImageUploader({
  onImageSelected,
}: ImageUploaderProps) {
  const handleFile = (file?: File) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    onImageSelected(file);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFile(event.target.files?.[0]);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    handleFile(event.dataTransfer.files?.[0]);
  };

  return (
    <Box
      onDragOver={(event) => event.preventDefault()}
      onDrop={handleDrop}
      sx={{
        border: "2px dashed #ccc",
        borderRadius: 3,
        p: 5,
        textAlign: "center",
        cursor: "pointer",
        backgroundColor: "#fafafa",
        transition: "0.2s",
        "&:hover": {
          borderColor: "#536DEC",
          backgroundColor: "#f5f7ff",
        },
      }}
    >
      <Typography variant="h6" sx={{ mb: 1 }}>
        Upload an image
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Drag and drop an image here
      </Typography>

      <Button
        component="label"
        variant="contained"
      >
        Choose Image

        <input
          type="file"
          hidden
          accept="image/png,image/jpeg,image/webp"
          onChange={handleChange}
        />
      </Button>
    </Box>
  );
}