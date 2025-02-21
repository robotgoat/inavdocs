import type { ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Heading from "@theme/Heading";
import useBaseUrl from "@docusaurus/useBaseUrl";
import ThemedImage from "@theme/ThemedImage";

import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header
      className={clsx("hero hero--primary", styles.heroBanner)}
      style={{
        backgroundImage: `url("img/g2.svg")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="container">
        {/* <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading> */}
        <ThemedImage
          alt="INAV"
          className=""
          sources={{
            light: useBaseUrl("img/inav_home_light.svg"),
            dark: useBaseUrl("img/inav_home_dark.svg"),
          }}
        />
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <p className="text--center col col--4 col--offset-4">
          INAV is a cutting edge flight controller software whose focus is to bring semi-autonomous flight capabilities to a variety of RC
          vehicles such as: fixed wings, rotary wings, VTOLs, boats, and rovers.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro"
          >
            Get Started!
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Welcome to ${siteConfig.title}`}
      description="The cutting edge UAV flight controller software suite"
    >
      <HomepageHeader />
      <main>
        <div className="text--center margin-top--lg margin-left--lg">
        <Heading as="h1">At a Glance</Heading>
        </div>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
