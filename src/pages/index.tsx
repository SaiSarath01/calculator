import type { NextPage } from "next";
import Calculator from "../components/Calculator";

import styles from "../styles/Home.module.scss";

const IndexPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <Calculator />
    </div>
  );
};

export default IndexPage;
