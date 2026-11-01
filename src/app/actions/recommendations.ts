"use server";

import { recommendFromProblem } from "@/lib/recommendations";
import type { RecommendationResult } from "@/types";

export async function getRecommendations(input: string): Promise<RecommendationResult> {
  const trimmed = input.trim();
  if (trimmed.length > 2000) {
    return recommendFromProblem(trimmed.slice(0, 2000));
  }
  return recommendFromProblem(trimmed);
}
