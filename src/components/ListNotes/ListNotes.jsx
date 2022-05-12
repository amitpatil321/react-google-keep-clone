import React from "react";
import { Row, Col } from "antd";
import { getFirestore, collection, getDocs } from "firebase/firestore";

import db from "../../config/firebase";

import styles from "./ListNotes.module.css";

const ListNotes = async () => {
  //   const ref = firebase.firestore().collection("notes");
  const querySnapshot = await getDocs(collection(db, "notes"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });

  return (
    <Row>
      <Col span={24} className={styles.notes}>
        Hello
      </Col>
    </Row>
  );
};

export default ListNotes;
