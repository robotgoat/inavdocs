import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import useBaseUrl from '@docusaurus/useBaseUrl';
import ThemedImage from '@theme/ThemedImage'

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        {/* <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading> */}
        <ThemedImage
          alt="INAV"
          className='h-fit w-fit xl:mr-12'
          sources={{
            light: useBaseUrl('img/inav_home_light.svg'),
            dark: useBaseUrl('img/inav_home_dark.svg')
          }}
        />
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <p className="xs:text-sm sm:text-lg xl:text-xl">INAV is a cutting edge flight controller software whose <br></br> focus is on bringing semi-autonomous flight capabilities <br></br> for fixed wing, rotary wing, and VTOL remote controlled FPV aircraft.</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Docusaurus Tutorial - 5min ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Welcome to ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
