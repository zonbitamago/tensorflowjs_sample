import React, { Component } from "react";

import * as mobilenet from "@tensorflow-models/mobilenet";

import CatImg from "../assets/cat1.jpeg";
import AirplainImg from "../assets/airplain.jpeg";

import "./imagenetpage.css";

export default class ImageNetPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // model loading flag読み込み中は画像をクリックできなくする
      modelLoading: true,
      preds: []
    };
  }

  async componentDidMount() {
    this.model = await mobilenet.load();

    this.setState({
      modelLoading: false
    });
  }

  // 画像をクリックしたら予測を行い、結果をstateにセット
  onClick(e) {
    let img = e.target;

    this.model.classify(img).then(preds => {
      this.setState({
        preds: preds
      });
    });
  }

  render() {
    // モデルを読み込んでいるときはdisableクラスを画像に追加
    let disable = this.state.modelLoading ? "disable" : "";

    return (
      <div>
        <h2>predict image class name</h2>
        <h3>click image</h3>
        <img
          src={CatImg}
          className={`Cat1 ${disable}`}
          alt="cat"
          onClick={this.onClick.bind(this)}
        />
        <img
          src={AirplainImg}
          className={`Airplain ${disable}`}
          alt="airplain"
          onClick={this.onClick.bind(this)}
        />
        {this.state.preds.map((pred, index) => {
          let name = pred.className;
          let prob = Number(pred.probability).toFixed(5);
          return (
            <div key={index}>
              <p>class: {name}</p>
              <p>probability: {prob}</p>
            </div>
          );
        })}
      </div>
    );
  }
}
