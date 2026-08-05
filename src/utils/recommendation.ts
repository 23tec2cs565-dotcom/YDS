import type { Project } from "../data/projects";

const getVector = (project: Project) => {
  return [
    project.category || "",
    project.location || "",
    ...(project.workScope || []),
  ].join(" ").toLowerCase();
};

const similarity = (a: string, b: string) => {
  const wordsA = new Set(a.split(" "));
  const wordsB = new Set(b.split(" "));

  const intersection = [...wordsA].filter((w) => wordsB.has(w)).length;
  const union = new Set([...wordsA, ...wordsB]).size;

  return union === 0 ? 0 : intersection / union;
};

export const getSimilarProjects = (
  current: Project,
  allProjects: Project[],
  limit = 3
) => {
  const currentVector = getVector(current);

  return allProjects
    .filter((p) => p.id !== current.id)
    .map((p) => ({
      project: p,
      score: similarity(currentVector, getVector(p)),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.project);
};