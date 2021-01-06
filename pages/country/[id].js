import React from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout/Layout";

function Country() {
  const router = useRouter();
  return (
    <Layout>
      <div>Country {router.query.id}</div>
    </Layout>
  );
}

export default Country;
