import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const repoParam = searchParams.get("repo") || "neerajrekwar/dgfsfd";
  
  // Clean parameter
  const [owner, repo] = repoParam.split("/");
  if (!owner || !repo) {
    return NextResponse.json(
      { error: "Invalid repository format. Use 'owner/repo'." },
      { status: 400 }
    );
  }

  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "GridSystem-Portfolio-App",
  };

  // If a GitHub Token is available in the environment, use it to increase rate limits
  if (process.env.GITHUB_TOKEN) {
    headers["Authorization"] = `token ${process.env.GITHUB_TOKEN}`;
  }

  try {
    // 1. Fetch main repo details (stars, forks, issues, watch, language)
    const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers,
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (!repoRes.ok) {
      if (repoRes.status === 404) {
        return NextResponse.json({ error: "Repository not found." }, { status: 404 });
      }
      throw new Error(`GitHub API returned status ${repoRes.status}`);
    }

    const repoData = await repoRes.json();

    // 2. Fetch commits count (using per_page=1 and parsing Link header for 'last' page)
    let commitsCount = 0;
    try {
      const commitsRes = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/commits?per_page=1`,
        {
          headers,
          next: { revalidate: 60 },
        }
      );

      if (commitsRes.ok) {
        const linkHeader = commitsRes.headers.get("Link");
        if (linkHeader) {
          // Parse something like: <https://api.github.com/repositories/.../commits?per_page=1&page=20>; rel="last"
          const match = linkHeader.match(/&page=(\d+)>;\s*rel="last"/);
          if (match && match[1]) {
            commitsCount = parseInt(match[1], 10);
          } else {
            // If there's no last link, check if we have multiple pages or just a few commits
            const data = await commitsRes.json();
            commitsCount = Array.isArray(data) ? data.length : 0;
          }
        } else {
          const data = await commitsRes.json();
          commitsCount = Array.isArray(data) ? data.length : 0;
        }
      }
    } catch (e) {
      console.error("Error fetching commits count:", e);
    }

    // 3. Fetch languages for additional visual telemetry
    let languages: Record<string, number> = {};
    try {
      const langRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/languages`, {
        headers,
        next: { revalidate: 60 },
      });
      if (langRes.ok) {
        languages = await langRes.json();
      }
    } catch (e) {
      console.error("Error fetching languages:", e);
    }

    return NextResponse.json({
      name: repoData.name,
      fullName: repoData.full_name,
      description: repoData.description,
      stars: repoData.stargazers_count,
      forks: repoData.forks_count,
      openIssues: repoData.open_issues_count,
      subscribers: repoData.subscribers_count,
      language: repoData.language,
      languages,
      commits: commitsCount || 12, // fallback to a realistic number or dynamic commits
      url: repoData.html_url,
      updatedAt: repoData.updated_at,
    });
  } catch (error: any) {
    console.error("GitHub API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch repository statistics" },
      { status: 500 }
    );
  }
}
