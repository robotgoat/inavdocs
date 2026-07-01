import React, { useEffect, useState } from 'react';
import { marked } from 'marked';

interface RemoteMarkdownProps {
  tag?: string;
  className?: string;
  style?: React.CSSProperties;
  loadingText?: string;
  errorText?: string;
  render?: (data: { markdown: string; html: string }) => React.ReactNode;
}

const DEFAULT_TAG = 'master';
const CACHE_PREFIX = 'remote-markdown-';

interface CacheData {
  tag: string;
  markdown: string;
  html: string;
  fetchedAt: number;
}

const getCacheKey = (tag: string) => `${CACHE_PREFIX}${tag}`;

const getCachedData = (tag: string): CacheData | null => {
  try {
    const key = getCacheKey(tag);
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

const setCachedData = (tag: string, markdown: string, html: string) => {
  try {
    const key = getCacheKey(tag);
    const data: CacheData = {
      tag,
      markdown,
      html,
      fetchedAt: Date.now(),
    };
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // Ignore cache errors
  }
};

const constructUrl = (tag: string): string => {
  const ref = tag === 'master' ? 'refs/heads/master' : `refs/tags/${tag}`;
  return `https://raw.githubusercontent.com/iNavFlight/inav/${ref}/docs/Settings.md`;
};

const RemoteMarkdown: React.FC<RemoteMarkdownProps> = ({
  tag = DEFAULT_TAG,
  className,
  style,
  loadingText = 'Loading remote markdown...',
  errorText = 'Failed to load remote markdown.',
  render,
}) => {
  const [markdown, setMarkdown] = useState<string>('');
  const [html, setHtml] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadMarkdown = async () => {
      setLoading(true);
      setError(null);

      // Check cache for non-master tags
      if (tag !== 'master') {
        const cached = getCachedData(tag);
        if (cached && cached.tag === tag) {
          if (isMounted) {
            setMarkdown(cached.markdown);
            setHtml(cached.html);
            setLoading(false);
          }
          return;
        }
      }

      // Fetch from remote
      try {
        const url = constructUrl(tag);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status} ${response.statusText}`);
        }

        const source = await response.text();
        if (!isMounted) {
          return;
        }

        const rendered = await marked(source);

        setMarkdown(source);
        setHtml(rendered);
        setCachedData(tag, source, rendered);
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        if (isMounted) {
          setError(message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadMarkdown();

    return () => {
      isMounted = false;
    };
  }, [tag]);

  if (loading) {
    return (
      <div className={className} style={style}>
        {loadingText}
      </div>
    );
  }

  if (error) {
    return (
      <div className={className} style={style}>
        {errorText}
        {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
      </div>
    );
  }

  if (render) {
    return <>{render({ markdown, html })}</>;
  }

  return (
    <div
      className={className}
      style={style}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default RemoteMarkdown;
