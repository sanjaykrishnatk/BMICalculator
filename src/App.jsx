import { useState } from "react";
import "./App.css";
import maleImg from "./assets/male.png";
import femaleImg from "./assets/female.png";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import GaugeComponent from "react-gauge-component";

function App() {
  // const [selectedGender, setSelectedGender] = useState(null);
  const [weight, setWeight] = useState(25);
  const [height, setHeight] = useState(95);
  const [BMI, setBMI] = useState(0);
  const [category, setCategory] = useState(null);
  const [resetFlag, setFlag] = useState(false);

  function valuetext(value) {
    return `${value}°C`;
  }
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    // console.log(name, value);
    if (name == "weightValue") {
      setWeight(value);
    } else {
      setHeight(value);
    }
  };
  const getBMI = () => {
    let BMIValue = (weight / (height / 100) ** 2).toFixed(1);
    setBMI(BMIValue);
    if (BMIValue < 18.5) {
      setCategory("Underweight");
    } else if (BMIValue >= 18.5 && BMIValue <= 24.9) {
      setCategory("Normal Weight");
    } else if (BMIValue > 24.9 && BMIValue <= 29.9) {
      setCategory("Overweight");
    } else {
      setCategory("Obese");
    }
  };
  // const handleImageClick = (gender) => {
  //   setSelectedGender(gender);
  //   alert(`${weight},${height}`);
  // };
  const handleReset = () => {
    setHeight(25);
    setWeight(95);
    setBMI(0);
    setCategory(null);
    setFlag(true);
  };
  return (
    <>
      <div className="row m-0 p-0" style={{ height: "100vh" }}>
        <div className="col-md-4 col-sm-12"></div>
        <div className="col-md-4 col-sm-12 d-flex align-items-center justify-content-center">
          <div className="row m-0 p-0 rounded-4" id="mainWrapper">
            <h3
              className="text-light fw-bold pt-4 ps-4"
              data-aos="fade-left"
              data-aos-duration="1000"
            >
              <span style={{ color: "#bc1925" }}>BMI</span> Calculator
            </h3>
            <p
              className="text-light ps-4 bmi-text"
              data-aos="fade-left"
              data-aos-duration="1000"
            >
              Body mass index (BMI) is a measure of body fat based on height and
              weight that applies to adult men and women.
            </p>
            <form>
              {/* <div className="row align-items-center justify-content-center w-100 m-0 ">
                <figure
                  className={`text-center ${
                    selectedGender === "female" ? "dull" : ""
                  }`}
                >
                  <img
                    src={maleImg}
                    alt="Male"
                    className="genderImg"
                    onClick={() => handleImageClick("male")}
                    style={{ cursor: "pointer" }}
                  />
                  <figcaption className="text-light fw-bold">Male</figcaption>
                </figure>
                <figure
                  className={`text-center ${
                    selectedGender === "male" ? "dull" : ""
                  }`}
                >
                  <img
                    src={femaleImg}
                    alt="Female"
                    className="genderImg"
                    onClick={() => handleImageClick("female")}
                    style={{ cursor: "pointer" }}
                  />
                  <figcaption className="text-light fw-bold">Female</figcaption>
                </figure>
              </div> */}
              <div
                className="row align-items-center justify-content-center w-100 m-0"
                data-aos="fade-right"
                data-aos-duration="1000"
              >
                <GaugeComponent
                  arc={{
                    subArcs: [
                      { limit: 20, color: "#EA4228", showTick: true },
                      { limit: 40, color: "#F58B19", showTick: true },
                      { limit: 60, color: "#F5CD19", showTick: true },
                      { limit: 80, color: "#5BE12C", showTick: true },
                    ],
                  }}
                  value={BMI}
                  labels={{
                    valueLabel: {
                      formatTextValue: (value) => `${value.toFixed(1)}`,
                    },
                    tickLabels: {
                      type: "outer",
                      valueConfig: {
                        formatTextValue: (value) => `${value.toFixed(1)}`,
                        fontSize: 10,
                      },
                      ticks: [
                        { value: 20 },
                        { value: 40 },
                        { value: 60 },
                        { value: 80 },
                      ],
                    },
                  }}
                />
                {category != null && (
                  <h5
                    className="text-light text-center txt-shadow"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                  >
                    {category}
                  </h5>
                )}
              </div>
              <div
                className="row align-items-center justify-content-center w-100 m-0"
                data-aos="fade-left"
                data-aos-duration="1000"
              >
                <label className="text-light fw-bold txt-shadow mt-2">
                  Weight (kg)
                </label>
                <Slider
                  aria-label="Small steps"
                  defaultValue={25}
                  key={resetFlag ? "weightReset" : "weightSlider"}
                  getAriaValueText={valuetext}
                  step={0.1}
                  marks
                  min={0}
                  max={150}
                  valueLabelDisplay="auto"
                  color="error"
                  name="weightValue"
                  onChange={(e) => handleInput(e)}
                />
                <label className="text-light fw-bold txt-shadow mt-3">
                  Height (cm)
                </label>
                <Slider
                  aria-label="Small steps"
                  defaultValue={95}
                  key={resetFlag ? "heightReset" : "heightSlider"}
                  getAriaValueText={valuetext}
                  step={1}
                  marks
                  min={50}
                  max={300}
                  valueLabelDisplay="auto"
                  color="error"
                  name="heightValue"
                  onChange={(e) => handleInput(e)}
                />
              </div>
              <div
                className="row mt-3 ps-4 pe-4 pt-2 d-flex justify-content-between align-items-center btnWrapper"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <Button
                  className="shadow"
                  variant="contained"
                  color="error"
                  style={{ width: "47%", height: "45px" }}
                  // disabled={isPrinciple && isRate && isYear ? false : true}
                  onClick={getBMI}
                >
                  Calculate
                </Button>
                <Button
                  className="shadow"
                  variant="outlined"
                  color="error"
                  style={{ width: "47%", height: "45px" }}
                  onClick={handleReset}
                >
                  Reset
                </Button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-md-4 col-sm-12"></div>
      </div>
    </>
  );
}

export default App;
