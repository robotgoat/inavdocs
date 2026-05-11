import React, { useState, useEffect } from 'react';

interface Contributor {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  contributions: number;
  lastContributionDate?: string | null;
}

const CONTRIBUTORS_CACHE_FILE = '/contributors-cache.json';

const sortContributors = (contributors: Contributor[]) =>
  [...contributors].sort((a, b) => {
    if (a.lastContributionDate && b.lastContributionDate) {
      return b.lastContributionDate.localeCompare(a.lastContributionDate);
    }
    if (a.lastContributionDate) {
      return -1;
    }
    if (b.lastContributionDate) {
      return 1;
    }
    return b.contributions - a.contributions;
  });

const fetchBuildCache = async (): Promise<Contributor[]> => {
  const response = await fetch(CONTRIBUTORS_CACHE_FILE);
  if (!response.ok) {
    throw new Error('Unable to load contributors cache');
  }

  const data = await response.json();

  if (!data.contributors || !Array.isArray(data.contributors)) {
    throw new Error('Contributor cache format is invalid');
  }

  return sortContributors(data.contributors as Contributor[]);
};

const Contributors: React.FC = () => {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadContributors = async () => {
      try {
        const sorted = await fetchBuildCache();
        if (isMounted) {
          setContributors(sorted);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Unable to load contributors');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadContributors();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <div>Loading contributors...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ margin: '12px 0' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {contributors.map((contributor) => (
          <div key={contributor.login} style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>
            <img src={contributor.avatar_url} alt={contributor.login} width="50" height="50" style={{ borderRadius: '50%' }} />
            <br />
            <a href={contributor.html_url} target="_blank" rel="noopener noreferrer">
              {contributor.login}
            </a>
            <br />
            {contributor.contributions} contributions
            <br />
            {contributor.lastContributionDate ? (
              <small>Last: {new Date(contributor.lastContributionDate).toLocaleDateString()}</small>
            ) : (
              <small>No recent date</small>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contributors;
