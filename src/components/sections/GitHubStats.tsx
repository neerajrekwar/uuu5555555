"use client";

import { useState, useEffect, FormEvent } from "react";
import { 
  GitFork, 
  Star, 
  GitCommit, 
  AlertCircle, 
  ExternalLink, 
  Search, 
  Terminal, 
  Clock, 
  Code,
  Eye,
  RefreshCw
} from "lucide-react";

interface RepoStats {
  name: string;
  fullName: string;
  description: string;
  stars: number;
  forks: number;
  openIssues: number;
  subscribers: number;
  language: string;
  languages: Record<string, number>;
  commits: number;
  url: string;
  updatedAt: string;
}

export function GitHubStats() {
  const defaultRepo = "neerajrekwar/dgfsfd";
  const [repoQuery, setRepoQuery] = useState(defaultRepo);
  const [searchVal, setSearchVal] = useState(defaultRepo);
  const [stats, setStats] = useState<RepoStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async (repo: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/github?repo=${encodeURIComponent(repo)}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch repository statistics.");
      }
      setStats(data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats(repoQuery);
  }, [repoQuery]);

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      // Basic formatting check (must contain a slash)
      if (!searchVal.includes("/")) {
        setError("Please enter the repository in 'owner/repo' format (e.g., vercel/next.js).");
        return;
      }
      setRepoQuery(searchVal.trim());
    }
  };

  const handleReset = () => {
    setSearchVal(defaultRepo);
    setRepoQuery(defaultRepo);
  };

  // Calculate total language bytes to compute percentages
  const totalLangBytes = stats?.languages
    ? Object.values(stats.languages).reduce((a, b) => a + b, 0)
    : 0;

  // Language colors mapping or fallback
  const getLanguageColor = (lang: string) => {
    const colors: Record<string, string> = {
      TypeScript: "bg-[#3178c6]",
      JavaScript: "bg-[#f1e05a]",
      HTML: "bg-[#e34c26]",
      CSS: "bg-[#563d7c]",
      Python: "bg-[#3572A5]",
      Rust: "bg-[#dea584]",
      Go: "bg-[#00ADD8]",
      Java: "bg-[#b07219]",
    };
    return colors[lang] || "bg-[#858585]";
  };

  return (
    <section id="github-telemetry" className="py-24 bg-[#FAFAFA] border-b-2 border-black">
      <div className="container mx-auto px-4">
        {/* Header Block */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between mb-16 border-l-8 border-black pl-8 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <h2 className="text-4xl md:text-5xl font-headline font-bold uppercase tracking-tighter">
                GitHub <span className="text-primary">Telemetry</span>
              </h2>
            </div>
            <p className="text-muted-foreground max-w-2xl font-body">
              Real-time synchronization with active GitHub codebases. Analyze star trajectories, 
              fork vectors, commit frequency, and language breakdowns.
            </p>
          </div>

          {/* Search Box / Input (Neo-brutalist Style) */}
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-grow min-w-[280px]">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-black/60">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder="owner/repository"
                className="w-full bg-white border-2 border-black px-4 py-2.5 pl-11 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-primary/40 rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-black text-white hover:bg-primary transition-all text-xs font-headline font-bold uppercase rounded-none border-2 border-black active:translate-y-0.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50"
            >
              Analyze
            </button>
            {repoQuery !== defaultRepo && (
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2.5 bg-white text-black hover:bg-neutral-100 transition-all text-xs font-headline font-bold uppercase rounded-none border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                title="Reset to default repository"
              >
                Reset
              </button>
            )}
          </form>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="border-2 border-black bg-white shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] p-12 flex flex-col items-center justify-center min-h-[350px]">
            <RefreshCw className="w-12 h-12 text-primary animate-spin mb-4" />
            <p className="font-mono text-sm uppercase tracking-widest text-muted-foreground animate-pulse">
              Initializing Secure Stream Connection...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="border-2 border-black bg-white shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] p-8 md:p-12">
            <div className="bg-destructive/10 border-2 border-destructive p-6 flex flex-col md:flex-row items-center gap-6">
              <AlertCircle className="w-12 h-12 text-destructive shrink-0" />
              <div className="space-y-2 text-center md:text-left">
                <h4 className="font-headline font-bold text-lg uppercase text-destructive">Connection Error</h4>
                <p className="font-mono text-xs text-black/80">{error}</p>
                <p className="text-xs text-muted-foreground font-body">
                  Make sure the repository exists, is public, and is in the format <code className="bg-neutral-100 px-1 border border-black/15 font-bold">owner/repo</code>.
                </p>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleReset}
                className="px-6 py-2 border-2 border-black hover:bg-neutral-50 font-headline text-xs font-bold uppercase"
              >
                Restore Default Target
              </button>
            </div>
          </div>
        )}

        {/* Stats Content Dashboard */}
        {!loading && !error && stats && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Main Telemetry Box - Left / 8 columns */}
            <div className="lg:col-span-8 border-2 border-black bg-white shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] flex flex-col">
              
              {/* Top Banner Status */}
              <div className="border-b-2 border-black bg-neutral-100 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Terminal className="w-5 h-5 text-primary" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-black/70">
                    Live Ledger // {stats.fullName}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-800 border border-emerald-500/20 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 bg-emerald-500 animate-ping rounded-full inline-block mr-1"></span>
                  Active Stream
                </div>
              </div>

              {/* Repository Title Card */}
              <div className="p-8 md:p-10 border-b-2 border-black bg-[#fafafa] flex flex-col md:flex-row justify-between items-start gap-6">
                <div className="space-y-3 max-w-xl">
                  <span className="text-[10px] font-mono bg-primary/10 text-primary px-2.5 py-1 uppercase tracking-widest border border-primary/20 font-bold">
                    Target Source Node
                  </span>
                  <h3 className="text-2xl md:text-3xl font-headline font-bold uppercase tracking-tight text-black leading-none">
                    {stats.name}
                  </h3>
                  <p className="text-sm font-body text-black/75 leading-relaxed">
                    {stats.description || "No description provided for this software repository on GitHub."}
                  </p>
                </div>
                
                <a
                  href={stats.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 border-2 border-black bg-white text-xs font-headline font-bold uppercase hover:bg-black hover:text-white hover:translate-x-0.5 hover:translate-y-0.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all shrink-0"
                >
                  <span>Open GitHub</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Grid 2x2 of Stats Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 border-b-2 border-black divide-x-2 divide-y-0 divide-black">
                
                {/* Stars Card */}
                <div className="p-6 md:p-8 flex flex-col justify-between min-h-[140px] bg-white group hover:bg-neutral-50 transition-colors">
                  <div className="flex items-center justify-between text-black/50">
                    <span className="text-xs font-headline font-bold uppercase tracking-wider">Stars</span>
                    <Star className="w-5 h-5 group-hover:text-amber-500 transition-colors" />
                  </div>
                  <div>
                    <span className="block text-3xl md:text-4xl font-mono font-bold tracking-tighter text-black leading-none">
                      {stats.stars.toLocaleString()}
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground uppercase mt-1 block">
                      Stargazers ledger
                    </span>
                  </div>
                </div>

                {/* Forks Card */}
                <div className="p-6 md:p-8 flex flex-col justify-between min-h-[140px] bg-white group hover:bg-neutral-50 transition-colors border-l-2 border-black md:border-l-0">
                  <div className="flex items-center justify-between text-black/50">
                    <span className="text-xs font-headline font-bold uppercase tracking-wider">Forks</span>
                    <GitFork className="w-5 h-5 group-hover:text-blue-500 transition-colors" />
                  </div>
                  <div>
                    <span className="block text-3xl md:text-4xl font-mono font-bold tracking-tighter text-black leading-none">
                      {stats.forks.toLocaleString()}
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground uppercase mt-1 block">
                      Repository clones
                    </span>
                  </div>
                </div>

                {/* Commits Card */}
                <div className="p-6 md:p-8 flex flex-col justify-between min-h-[140px] bg-white group hover:bg-neutral-50 transition-colors border-t-2 md:border-t-0 border-black">
                  <div className="flex items-center justify-between text-black/50">
                    <span className="text-xs font-headline font-bold uppercase tracking-wider">Commits</span>
                    <GitCommit className="w-5 h-5 group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <span className="block text-3xl md:text-4xl font-mono font-bold tracking-tighter text-black leading-none">
                      {stats.commits.toLocaleString()}+
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground uppercase mt-1 block">
                      Total system shifts
                    </span>
                  </div>
                </div>

                {/* Open Issues Card */}
                <div className="p-6 md:p-8 flex flex-col justify-between min-h-[140px] bg-white group hover:bg-neutral-50 transition-colors border-t-2 md:border-t-0 border-l-2 border-black">
                  <div className="flex items-center justify-between text-black/50">
                    <span className="text-xs font-headline font-bold uppercase tracking-wider">Issues</span>
                    <AlertCircle className="w-5 h-5 group-hover:text-red-500 transition-colors" />
                  </div>
                  <div>
                    <span className="block text-3xl md:text-4xl font-mono font-bold tracking-tighter text-black leading-none">
                      {stats.openIssues}
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground uppercase mt-1 block">
                      Pending workflows
                    </span>
                  </div>
                </div>

              </div>

              {/* Bottom Metadata Info bar */}
              <div className="p-6 bg-[#fafafa] flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs font-mono text-black/60">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>Last system audit: {new Date(stats.updatedAt).toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-primary" />
                  <span>Subscribers/Watchers: {stats.subscribers}</span>
                </div>
              </div>

            </div>

            {/* Language Breakdown - Right / 4 columns */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              
              {/* Language Card box */}
              <div className="border-2 border-black bg-white shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] p-8 flex-grow flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-dashed border-black/20">
                    <Code className="w-5 h-5 text-primary" />
                    <h4 className="font-headline font-bold text-lg uppercase">Stack Metrics</h4>
                  </div>

                  <p className="text-xs text-muted-foreground font-body leading-relaxed">
                    Proportional analysis of codebase density by volume of bytes.
                  </p>

                  {/* Visual Language Bar */}
                  {totalLangBytes > 0 && (
                    <div className="w-full h-8 border-2 border-black flex overflow-hidden">
                      {Object.entries(stats.languages).map(([lang, bytes]) => {
                        const pct = (bytes / totalLangBytes) * 100;
                        if (pct < 1) return null; // Skip tiny values for visual cleaner look
                        return (
                          <div
                            key={lang}
                            style={{ width: `${pct}%` }}
                            className={`${getLanguageColor(lang)} border-r last:border-r-0 border-black`}
                            title={`${lang}: ${pct.toFixed(1)}%`}
                          />
                        );
                      })}
                    </div>
                  )}

                  {/* List of Languages */}
                  <div className="space-y-3.5 pt-2">
                    {totalLangBytes > 0 ? (
                      Object.entries(stats.languages)
                        .slice(0, 6) // Top 6 languages
                        .map(([lang, bytes]) => {
                          const pct = (bytes / totalLangBytes) * 100;
                          return (
                            <div key={lang} className="flex items-center justify-between text-xs font-mono">
                              <div className="flex items-center gap-3">
                                <span className={`w-3 h-3 border border-black ${getLanguageColor(lang)} inline-block`}></span>
                                <span className="font-bold text-black">{lang}</span>
                              </div>
                              <span className="text-black/60">{pct.toFixed(1)}%</span>
                            </div>
                          );
                        })
                    ) : (
                      <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground italic">
                        <span>No language data retrieved</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-dashed border-black/20">
                  <span className="text-[10px] font-mono uppercase text-muted-foreground block text-right">
                    Primary compilation: {stats.language || "Unknown"}
                  </span>
                </div>
              </div>

              {/* Status Ledger Mini Panel */}
              <div className="border-2 border-black bg-black text-[#FAFAFA] p-6 shadow-[8px_8px_0px_0px_rgba(180,24,47,1)]">
                <div className="font-mono text-[10px] uppercase tracking-widest text-primary/80 font-bold mb-2">
                  System Diagnostic Ledgers
                </div>
                <div className="font-mono text-xs space-y-1 text-white/90">
                  <p>&gt; CONN_ESTABLISHED: OK</p>
                  <p>&gt; RATE_LIMIT_RESET: DYNAMIC</p>
                  <p>&gt; TELEMETRY_PING: {(stats.stars + stats.forks) % 11}ms</p>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
}
