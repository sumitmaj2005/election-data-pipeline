export interface ConstituencyResult {
  constituencyNumber: string;
  constituencyName: string;
  state: string;
  winningCandidate: string;
  winningParty: string;
  margin: number;
  turnoutPct: number;
}

export function parseConstituencyCSV(csvText: string): ConstituencyResult[] {
  const lines = csvText.trim().split(/\r?\n/);
  if (lines.length <= 1) return [];

  const results: ConstituencyResult[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Handle standard CSV commas
    const parts = line.split(',');
    if (parts.length >= 7) {
      results.push({
        constituencyNumber: parts[0].trim(),
        constituencyName: parts[1].trim(),
        state: parts[2].trim(),
        winningCandidate: parts[3].trim(),
        winningParty: parts[4].trim(),
        margin: parseInt(parts[5].trim(), 10) || 0,
        turnoutPct: parseFloat(parts[6].trim()) || 0,
      });
    }
  }

  return results;
}
