import type { Bracket, Match, MatchParticipant } from "./data";

/**
 * Calculates the next highest power of two (or the number itself if already a power of two)
 */
export function nextPowerOfTwo(n: number): number {
  if (n <= 1) return 2;
  return Math.pow(2, Math.ceil(Math.log2(n)));
}

/**
 * Computes standard single-elimination round titles based on total rounds
 */
export function getRoundName(round: number, totalRounds: number): string {
  const roundsFromFinal = totalRounds - round;
  switch (roundsFromFinal) {
    case 0:
      return "Championship";
    case 1:
      return "Semifinals";
    case 2:
      return "Quarterfinals";
    case 3:
      return "Round of 16";
    case 4:
      return "Round of 32";
    default:
      return `Round ${round}`;
  }
}

/**
 * Computes standard tournament seeding match pairings for power of 2
 * e.g. for 8: [ [1, 8], [4, 5], [2, 7], [3, 6] ]
 */
export function generateSeedPairings(numParticipants: number): [number, number][] {
  const rounds = Math.log2(numParticipants);
  let matches: number[][] = [[1, 2]];

  for (let r = 1; r < rounds; r++) {
    const nextMatches: number[][] = [];
    const sum = Math.pow(2, r + 1) + 1;
    for (const match of matches) {
      nextMatches.push([match[0], sum - match[0]]);
      nextMatches.push([match[1], sum - match[1]]);
    }
    matches = nextMatches;
  }

  return matches as [number, number][];
}

/**
 * Generates an automated single elimination bracket with automatic bye calculation
 */
export function generateSingleEliminationBracket(
  divisionId: string,
  divisionName: string,
  sportName: string,
  participants: Array<{ id: string; name: string; seed?: number }>
): Bracket {
  const count = participants.length;
  const bracketSize = nextPowerOfTwo(Math.max(count, 4));
  const totalRounds = Math.log2(bracketSize);
  const _byesCount = bracketSize - count;
  void _byesCount;

  // Sort participants by seed (or 1..N index)
  const sorted = [...participants].sort((a, b) => (a.seed ?? 99) - (b.seed ?? 99));

  // Fill in seeded participants map
  const participantMap = new Map<number, MatchParticipant>();
  for (let i = 1; i <= bracketSize; i++) {
    const p = sorted[i - 1];
    if (p) {
      participantMap.set(i, {
        id: p.id,
        name: p.name,
        seed: p.seed ?? i,
      });
    } else {
      participantMap.set(i, {
        id: `bye-${i}`,
        name: "BYE",
        seed: i,
        isBye: true,
      });
    }
  }

  const pairings = generateSeedPairings(bracketSize);
  const matches: Match[] = [];
  let matchNumber = 1;

  // Round 1 matches
  pairings.forEach((pair) => {
    const p1 = participantMap.get(pair[0])!;
    const p2 = participantMap.get(pair[1]);

    const isByeMatch = p1.isBye || p2?.isBye;

    matches.push({
      id: `match-${divisionId}-r1-${matchNumber}`,
      bracketId: `bracket-${divisionId}`,
      round: 1,
      roundName: getRoundName(1, totalRounds),
      matchNumber,
      participant1: p1,
      participant2: p2,
      courtName: isByeMatch ? undefined : `Court ${(matchNumber % 3) + 1}`,
      scheduledTime: isByeMatch ? undefined : "10:00 AM",
      status: isByeMatch ? "bye" : "scheduled",
      winnerId: p1.isBye ? p2?.id : p2?.isBye ? p1.id : undefined,
    });
    matchNumber++;
  });

  // Subsequent rounds (placeholders until previous rounds conclude)
  let prevRoundMatchesCount = pairings.length;
  for (let r = 2; r <= totalRounds; r++) {
    const currentRoundMatches = prevRoundMatchesCount / 2;
    for (let m = 1; m <= currentRoundMatches; m++) {
      matches.push({
        id: `match-${divisionId}-r${r}-${m}`,
        bracketId: `bracket-${divisionId}`,
        round: r,
        roundName: getRoundName(r, totalRounds),
        matchNumber,
        courtName: r === totalRounds ? "Championship Court" : "Main Court",
        scheduledTime: r === totalRounds ? "04:30 PM" : `${11 + r}:00 AM`,
        status: "scheduled",
        participant1: {
          id: `tbd-r${r}-m${m}-1`,
          name: `Winner R${r - 1} M${m * 2 - 1}`,
          seed: 0,
        },
        participant2: {
          id: `tbd-r${r}-m${m}-2`,
          name: `Winner R${r - 1} M${m * 2}`,
          seed: 0,
        },
      });
      matchNumber++;
    }
    prevRoundMatchesCount = currentRoundMatches;
  }

  return {
    id: `bracket-${divisionId}`,
    divisionId,
    divisionName,
    sportName,
    type: "single_elimination",
    status: "published",
    roundsCount: totalRounds,
    matches,
  };
}
