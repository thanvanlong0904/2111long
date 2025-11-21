import Container from "@/components/ui/Container";
import ItemPost from "@/components/ui/ItemPost";
import React from "react";

export default function Experience() {
  return (
    <div className=" mt-16 md:mt-32">
      <Container>
        <h1 className=" uppercase text-2xl font-bold mb-8">kinh nghiệm hữu ích</h1>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-6 md:col-span-4 lg:col-span-3">
            <ItemPost></ItemPost>
          </div>
          <div className=" col-span-6 md:col-span-4 lg:col-span-3">
            <ItemPost></ItemPost>
          </div>
          <div className=" col-span-6 md:col-span-4 lg:col-span-3">
            <ItemPost></ItemPost>
          </div>
          <div className=" col-span-6 md:col-span-4 lg:col-span-3">
            <ItemPost></ItemPost>
          </div>
          <div className=" col-span-6 md:col-span-4 lg:col-span-3">
            <ItemPost></ItemPost>
          </div>
          <div className=" col-span-6 md:col-span-4 lg:col-span-3">
            <ItemPost></ItemPost>
          </div>
          <div className=" col-span-6 md:col-span-4 lg:col-span-3">
            <ItemPost></ItemPost>
          </div>
          <div className=" col-span-6 md:col-span-4 lg:col-span-3">
            <ItemPost></ItemPost>
          </div>
        </div>
      </Container>
    </div>
  );
}
