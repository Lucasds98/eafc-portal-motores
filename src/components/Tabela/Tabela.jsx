import React, { useMemo, useState } from "react";
import { players } from "../../data/players";
import { matches } from "../../data/matches";
import { calcularTabela } from "../../utils/calcularTabela";
import JogosDaRodada from "../JogosDaRodada/JogosDaRodada";
import PlayerModal from "../PlayerModal/PlayerModal";

import {
  Box,
  Paper,
  Grid,
  Typography,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Divider,
} from "@mui/material";

import "./tabela.css";
import { getImage } from "../../utils/getImage";

export default function Tabela() {
  const [selectedRdd, setSelectedRdd] = useState("all");
  const [openPlayer, setOpenPlayer] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const rdds = useMemo(() => {
    const set = new Set(matches.map((m) => m.rdd));
    return ["all", ...Array.from(set).sort((a, b) => a - b)];
  }, []);

  function abrirModal(id) {
    const p = players.find((x) => x.id === id);
    setSelectedPlayer(p);
    setOpenPlayer(true);
  }

  const filteredMatches = selectedRdd === "all"
    ? matches
    : matches.filter((m) => m.rdd === Number(selectedRdd));

  const tabela = calcularTabela(players, filteredMatches);
  
  function getPosicaoClasse(pos) {
    if (pos <= 4) return "pos-azul";
    if (pos <= 6) return "pos-normal";
    return "pos-vermelho";
  }

  return (
    <Paper elevation={6} className="tabela-wrapper">
      <Box padding={3}>
        <Grid container spacing={4}>
          
          {/* ESQUERDA - TABELA */}
          <Grid item xs={12} lg={8} md={7}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h5" fontWeight={600}>
                TABELA - PORTA MOTORES FC
              </Typography>

              <FormControl size="small">
                <InputLabel>Rodada</InputLabel>
                <Select
                  label="Rodada"
                  value={selectedRdd}
                  onChange={(e) => setSelectedRdd(e.target.value)}
                >
                  {rdds.map((r) => (
                    <MenuItem key={r} value={r}>
                      {r === "all" ? "Todas" : `RDD ${r}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <div className="tabela-scroll">
              <table className="tabela-table">
                <thead>
                  <tr>
                    <th>Classificação</th>
                    <th>P</th>
                    <th>J</th>
                    <th>V</th>
                    <th>E</th>
                    <th>D</th>
                    <th>GP</th>
                    <th>GC</th>
                    <th>SG</th>
                    <th>%</th>
                    <th>ÚLT. JOGOS</th>
                  </tr>
                </thead>
                <tbody>
                  {tabela.map((row, index) => (
                    <tr key={row.id} className={index % 2 === 0 ? "even" : "odd"}>
                      <td className="col-class">
                        <span className={`pos ${getPosicaoClasse(index + 1)}`}>
                          {index + 1}º
                        </span>
                        <img
                          src={getImage(players.find((p) => p.id === row.id)?.icone)}                        alt={row.nome}
                          className="escudo-tabela"
                          onClick={() => abrirModal(row.id)}
                          style={{ cursor: "pointer" }}
                        />
                        <strong
                          className="player-link"
                          onClick={() => abrirModal(row.id)}
                        >
                          {row.nome}
                        </strong>
                        <span className="time">({row.time})</span>
                      </td>
                      <td>{row.p}</td>
                      <td>{row.j}</td>
                      <td>{row.v}</td>
                      <td>{row.e}</td>
                      <td>{row.d}</td>
                      <td>{row.gp}</td>
                      <td>{row.gc}</td>
                      <td>{row.sg}</td>
                      <td>{row.aproveitamento.toFixed(1)}%</td>
                      <td>
                        <div className="ultimos">
                          {row.ultimos.length === 0 && <span className="empty">-</span>}
                          {row.ultimos.map((r, i) => (
                            <span
                              key={i}
                              className={`bola ${
                                r === "V"
                                  ? "vitoria"
                                  : r === "E"
                                  ? "empate"
                                  : "derrota"
                              }`}
                            />
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Grid>

          {/* DIVISÓRIA */}
          <Grid item lg={1} md={1} sx={{ display: { xs: "none", md: "block" } }}>
            <Divider orientation="vertical" flexItem />
          </Grid>

          {/* DIREITA - JOGOS */}
          <Grid item xs={12} lg={3} md={4}>
            <JogosDaRodada />
          </Grid>

        </Grid>
      </Box>

      <PlayerModal
        open={openPlayer}
        onClose={() => setOpenPlayer(false)}
        player={selectedPlayer}
      />
    </Paper>
  );
}
