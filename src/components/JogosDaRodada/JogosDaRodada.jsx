import { useMemo, useState } from "react";
import { players } from "../../data/players";
import { games } from "../../data/games";
import {
  Box,
  Typography,
  IconButton,
  Divider,
  Paper,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

import "./JogosDaRodada.css";
import PlayerModal from "../PlayerModal/PlayerModal";
import { getImage } from "../../utils/getImage";

export default function JogosDaRodada() {
  const [rodadaAtual, setRodadaAtual] = useState(4);
  const [openPlayer, setOpenPlayer] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const maxRodadas = useMemo(() => {
    const set = new Set(games.map((g) => g.rdd));
    return Math.max(...set);
  }, []);

  const jogos = useMemo(
    () => games.filter((g) => g.rdd === rodadaAtual),
    [rodadaAtual]
  );

  function getPlayer(id) {
    return players.find((p) => p.id === id);
  }

  function prevRodada() {
    if (rodadaAtual > 1) setRodadaAtual(rodadaAtual - 1);
  }

  function nextRodada() {
    if (rodadaAtual < maxRodadas) setRodadaAtual(rodadaAtual + 1);
  }

  function abrirModal(id) {
    const p = players.find((x) => x.id === id);
    setSelectedPlayer(p);
    setOpenPlayer(true);
  }

  function formatarDataBR(isoDate) {
    if (!isoDate) return "";
    const [ano, mes, dia] = isoDate.split("-");
    return `${dia}/${mes}/${ano}`;
  }

  return (
    <Box className="jogos-box">
      <Typography variant="h6" fontWeight={700} mb={1}>
        JOGOS
      </Typography>

      {/* Header da rodada */}
      <Box className="jogos-header">
        <IconButton size="small" onClick={prevRodada}>
          <ChevronLeft />
        </IconButton>

        <Typography variant="subtitle1" fontWeight={700}>
          {rodadaAtual}ª RODADA
        </Typography>

        <IconButton size="small" onClick={nextRodada}>
          <ChevronRight />
        </IconButton>
      </Box>

      {jogos.map((jogo, index) => {
        const A = getPlayer(jogo.timeA);
        const B = getPlayer(jogo.timeB);
        const isFinal = jogo.status === "finalizado";

        return (
          <Box key={`${jogo.rdd}-${jogo.id}`} className="jogo-card">
            <Typography className="jogo-local">
              {jogo.local} - {jogo.data && jogo.data !== 'INDEFINIDO' ? formatarDataBR(jogo.data) : jogo.data} {jogo.hora && `- ${jogo.hora}`}
            </Typography>

            <Box className="jogo-times">
              <Box className="jogo-time">
                <img
                  src={getImage(A.icone)}
                  className="escudo"
                  onClick={() => abrirModal(A.id)}
                  style={{ cursor: "pointer" }}
                />
                <Typography>{A.nome}</Typography>
              </Box>

              <Typography className="placar">
                {isFinal ? jogo.golsA : "0"}{" "}
                <span className="x">x</span>{" "}
                {isFinal ? jogo.golsB : "0"}
              </Typography>

              <Box className="jogo-time">
                <Typography>{B.nome}</Typography>
                <img
                  src={getImage(B.icone)}
                  className="escudo"
                  onClick={() => abrirModal(B.id)}
                  style={{ cursor: "pointer" }}
                />
              </Box>
            </Box>

             <Box className="text-como-foi">
              <Typography className="como-foi" component="a" href="#">
                SAIBA COMO FOI
              </Typography>
            </Box>

            {index < jogos.length - 1 && (
              <Divider sx={{ marginTop: 1.5 }} />
            )}
          </Box>
        );
      })}
      <PlayerModal
        open={openPlayer}
        onClose={() => setOpenPlayer(false)}
        player={selectedPlayer}
      />
    </Box>
  );
}
