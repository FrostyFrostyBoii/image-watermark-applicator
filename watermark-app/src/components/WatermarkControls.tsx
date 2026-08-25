import {
  Box,
  Button,
  Divider,
  Slider,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

import { type Watermark } from "../types/watermark";

interface WatermarkControlsProps {
  watermark: Watermark;
  onChange: (watermark: Watermark) => void;
  onDownload: () => void;
}

export default function WatermarkControls({
  watermark,
  onChange,
  onDownload,
}: WatermarkControlsProps) {
  const update = (changes: Partial<Watermark>) => {
    onChange({
      ...watermark,
      ...changes,
    });
  };

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Watermark text
        </Typography>

        <TextField
          fullWidth
          value={watermark.text}
          onChange={(event) =>
            update({
              text: event.target.value,
            })
          }
          placeholder="© Your Brand"
        />
      </Box>

      <Divider />

      <Box>
        <Typography variant="subtitle2">
          Font size
        </Typography>

        <Slider
          value={watermark.fontSize}
          min={10}
          max={200}
          valueLabelDisplay="auto"
          onChange={(_, value) =>
            update({
              fontSize: value as number,
            })
          }
        />
      </Box>

      <Box>
        <Typography variant="subtitle2">
          Opacity
        </Typography>

        <Slider
          value={watermark.opacity}
          min={0.05}
          max={1}
          step={0.05}
          valueLabelDisplay="auto"
          onChange={(_, value) =>
            update({
              opacity: value as number,
            })
          }
        />
      </Box>

      <Box>
        <Typography variant="subtitle2">
          Rotation
        </Typography>

        <Slider
          value={watermark.rotation}
          min={-180}
          max={180}
          valueLabelDisplay="auto"
          onChange={(_, value) =>
            update({
              rotation: value as number,
            })
          }
        />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Typography>Bold</Typography>

        <Switch
          checked={watermark.bold}
          onChange={(event) =>
            update({
              bold: event.target.checked,
            })
          }
        />
      </Box>

      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Color
        </Typography>

        <input
          type="color"
          value={watermark.color}
          onChange={(event) =>
            update({
              color: event.target.value,
            })
          }
          style={{
            width: "100%",
            height: 45,
            border: "none",
            cursor: "pointer",
          }}
        />
      </Box>

      <Button
        variant="contained"
        size="large"
        onClick={onDownload}
      >
        Download Image
      </Button>
    </Stack>
  );
}