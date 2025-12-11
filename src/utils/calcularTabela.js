export function calcularTabela(players, matches) {
  // players: array de jogadores
  // matches: array de partidas já filtrado (pode ser global ou por rdd)

  const tabela = players.map((player) => {
    const jogos = matches
      .filter((m) => m.jogadorId === player.id)
      .sort((a, b) => a.rdd - b.rdd); // ordenado por rdd

    let v = 0,
      e = 0,
      d = 0;
    let gp = 0,
      gc = 0;
    let ultimos = [];

    jogos.forEach((j) => {
      if (j.result === 'V') v++;
      if (j.result === 'E') e++;
      if (j.result === 'D') d++;

      gp += Number(j.golsPro || 0);
      gc += Number(j.golsContra || 0);

      ultimos.push(j.result);
    });

    const j = jogos.length;
    const p = v * 3 + e * 1;
    const sg = gp - gc;
    const aproveitamento = j > 0 ? (p / (j * 3)) * 100 : 0;

    return {
      id: player.id,
      nome: player.nome,
      time: player.time,
      icone: player.icone,
      p,
      j,
      v,
      e,
      d,
      gp,
      gc,
      sg,
      aproveitamento,
      ultimos: ultimos.slice(-5), // últimas 5 partidas
    };
  });

  // Ordenação: pontos > saldo > gols pró > nome
  tabela.sort((a, b) => {
    if (b.p !== a.p) return b.p - a.p;
    if (b.sg !== a.sg) return b.sg - a.sg;
    if (b.gp !== a.gp) return b.gp - a.gp;
    return a.nome.localeCompare(b.nome);
  });

  return tabela;
}