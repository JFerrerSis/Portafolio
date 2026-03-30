// Definimos la interfaz para que TypeScript esté feliz
export interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  topics: string[];
  language: string | null;
  fork: boolean;
  stargazers_count: number;
}

// Obtenemos el usuario del .env
const GITHUB_USER = import.meta.env.GITHUB_USER;

export async function getGitHubProjects(): Promise<GitHubRepo[]> {
  // Verificación de seguridad
  if (!GITHUB_USER) {
    console.error("GITHUB_USER no está definido en el archivo .env");
    return [];
  }

  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=30`, 
      {
        method: 'GET',
        headers: {
          'Accept': 'application/vnd.github+json',
          'User-Agent': 'Astro-Portfolio-JoseFerrer'
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`GitHub API Error: ${response.status}`);
    }
    
    const data: GitHubRepo[] = await response.json();
    
    // 1. Filtramos: Solo repositorios propios (no forks)
    // 2. Ordenamos: Por estrellas
    // 3. Limitamos: Los 6 principales
    return data
      .filter((repo: GitHubRepo) => !repo.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6);

  } catch (error) {
    console.error("Error al obtener proyectos de GitHub:", error);
    return []; 
  }
}