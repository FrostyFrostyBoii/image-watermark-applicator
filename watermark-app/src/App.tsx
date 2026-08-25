import {
  useState,
} from "react";

import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

import ImageUploader from "./components/ImageUploader";
import ImageCanvas from "./components/ImageCanvas";
import WatermarkControls from "./components/WatermarkControls";

import { type Watermark } from "./types/watermark";

const DEFAULT_WATERMARK: Watermark = {
  text: "© Your Brand",
  x: 300,
  y: 300,
  fontSize: 48,
  opacity: 0.7,
  rotation: 0,
  color: "#ffffff",
  fontFamily: "Arial",
  bold: true,
};

function App() {
  const [image, setImage] =
    useState<HTMLImageElement | null>(null);

  const [watermark, setWatermark] =
    useState<Watermark>(
      DEFAULT_WATERMARK
    );

  const handleImageSelected = (
    file: File
  ) => {
    const url =
      URL.createObjectURL(file);

    const img =
      new Image();

    img.onload = () => {
      setImage(img);

      setWatermark({
        ...DEFAULT_WATERMARK,
        x: img.naturalWidth / 2,
        y: img.naturalHeight / 2,
      });

      URL.revokeObjectURL(url);
    };

    img.src = url;
  };

  const handleDownload = () => {
    const canvas =
      document.querySelector(
        "canvas"
      ) as HTMLCanvasElement | null;

    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (!blob) return;

      const url =
        URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;
      link.download =
        "watermarked-image.png";

      link.click();

      URL.revokeObjectURL(url);
    }, "image/png");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f4f4f2",
        py: 5,
      }}
    >
      <Container maxWidth="xl">

        <Typography
          component="h1"
          variant="h3"
          sx={{ fontWeight: 700, mb: 1 }}
        >
          Watermark Studio
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Add a watermark to your images
          directly in your browser.
        </Typography>

        {!image ? (
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 3,
            }}
          >
            <ImageUploader
              onImageSelected={
                handleImageSelected
              }
            />
          </Paper>
        ) : (
          <Grid
            container
            spacing={3}
          >

            <Grid
              size={{
                xs: 12,
                md: 8,
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  minHeight: 500,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#222",
                }}
              >
                <ImageCanvas
                  image={image}
                  watermark={
                    watermark
                  }
                  onWatermarkChange={
                    setWatermark
                  }
                />
              </Paper>
            </Grid>

            <Grid
              size={{
                xs: 12,
                md: 4,
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                }}
              >
                <WatermarkControls
                  watermark={
                    watermark
                  }
                  onChange={
                    setWatermark
                  }
                  onDownload={
                    handleDownload
                  }
                />
              </Paper>
            </Grid>

          </Grid>
        )}

      </Container>
    </Box>
  );
}

export default App;