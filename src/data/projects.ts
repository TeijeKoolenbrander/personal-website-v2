import { getCollection, type CollectionEntry } from 'astro:content';

type Project = CollectionEntry<'projects'>;

/** Newest first, then by `order` (ascending), then title. */
export function sortProjects(list: Project[]): Project[] {
  return [...list].sort(
    (a, b) =>
      b.data.year - a.data.year ||
      (a.data.order ?? 0) - (b.data.order ?? 0) ||
      a.data.title.localeCompare(b.data.title),
  );
}

export async function getAllProjects(): Promise<Project[]> {
  return sortProjects(await getCollection('projects'));
}

/** Home tiles: featured projects newest first, topped up with the newest others. */
export async function getHomeProjects(count = 4): Promise<Project[]> {
  const all = await getAllProjects();
  const featured = all.filter((p) => p.data.featured);
  const rest = all.filter((p) => !p.data.featured);
  return [...featured, ...rest].slice(0, count);
}

export async function getCompanies() {
  const list = await getCollection('companies');
  return list.sort((a, b) => b.data.founded - a.data.founded);
}
