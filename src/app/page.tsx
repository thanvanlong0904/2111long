import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/header/Header";
import HomeClient from "./home/HomeClient";



export default function page() {
  return (
    <div >
      <Header></Header>
      <HomeClient></HomeClient>
      <Footer></Footer>
    </div>
  );
}
