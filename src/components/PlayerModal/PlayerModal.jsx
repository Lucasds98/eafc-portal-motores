import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { getImage } from "../../utils/getImage";

export default function PlayerModal({ open, onClose, player }) {
  if (!player) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {player.nome} — {player.time}
      </DialogTitle>

      <DialogContent>
        <Box
          display="flex"
          gap={3}
          alignItems="flex-start"
          flexDirection={{ xs: "column", md: "row" }}
        >
          {/* ESQUERDA — textos */}
          <Box flex={1}>
            <Typography variant="subtitle2" gutterBottom>
              Nickname
            </Typography>
            <Typography variant="body1" mb={3}>
              {player.frase || "Jogador lendário do RDD ⚽🔥"}
            </Typography>

            <Typography variant="subtitle2" gutterBottom>
              Sobre:
            </Typography>
            <Typography variant="body2" mb={3}>
              {player.bio || "Ainda não há descrição adicionada."}
            </Typography>

            <Typography variant="subtitle2" gutterBottom>
              Frase manjada:
            </Typography>
            <Typography variant="body2">
              {player.zoeira || "Nenhuma zoeira cadastrada ainda 😂"}
            </Typography>
          </Box>

          {/* DIREITA — foto grande */}
          <Box
            sx={{
              width: { xs: "100%", md: 280 },
              height: { xs: 320, md: 360 },
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
            }}
          >
            <img
                src={getImage(player.iconeGrande || player.icone)}
                alt={player.nome}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                }}
            />
          </Box>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="contained">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
