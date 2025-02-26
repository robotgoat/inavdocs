import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";

export default function Downloads() {
  return (
    <Layout title="Downloads" description="Download INAV">
      <div className="container">
        <div className="row margin-top--lg">
          <div className="col col--6 col--offset-3">
            <h1 className="text--center">Downloads</h1>
          </div>
        </div>
        <div className="row text--center">
          <div className="col col--4 col--offset-2">
            <div className="button button--primary button--lg">
              Configurator
            </div>
          </div>
          <div className="col col--4">
            <div className="button button--primary button--lg">INAV Lua</div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
