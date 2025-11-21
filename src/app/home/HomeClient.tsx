import React from "react";
import Slider from "./Slider";
import Brand from "./Brand";
import BestSeller from "./BestSeller";
import BannerBlog from "./BannerBlog";
import MixedPowder from "./MixedPowder";
import PreparedTea from "./PreparedTea";
import Experience from "./Experience";

export default function HomeClient() {
  return (
    <div>
      <Slider></Slider>
      <Brand></Brand>
      <BestSeller></BestSeller>
      <BannerBlog></BannerBlog>
      <MixedPowder></MixedPowder>
      <PreparedTea></PreparedTea>
      <Experience></Experience>
    </div>
  );
}
