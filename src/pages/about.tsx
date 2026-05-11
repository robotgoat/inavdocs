import React from "react";
import Layout from "@theme/Layout";
import Contributors from "../components/Contributors";

export default function Hello() {
  return (
    <Layout title="About" description="About INAV">
      <div className="hero shadow--lw">
        <div className="container">
          <h1 className="hero__title">Contributors</h1>
          <p className="hero__subtitle">
            Thank you to all those who make INAV possible
          </p>
          <div></div>
        </div>
      </div>
      <div className="container">
        <Contributors />
      </div>
    </Layout>
  );
}
