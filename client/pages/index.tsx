import type { NextPage } from 'next'
import Head from 'next/head'
import LanidngLayout from "../components/LandingLayout";
import PaperBase from "../components/PaperBase";
import VoteSection from "../components/LandingPage/VoteSection";
import RestrictionSection from "../components/LandingPage/RestrictionSection";
import BannerSection from "../components/LandingPage/BannerSection";
import DescriptionSection from "../components/LandingPage/DescriptionSection";
import SponsorSection from "../components/LandingPage/SponsorSection";
const Home: NextPage = () => {
  return (
    <>
      <LanidngLayout>
        <BannerSection/>
        <PaperBase bg='#f9f9f9'>
            <VoteSection/>
        </PaperBase>
        <PaperBase bg='#f9f9f9'>
            <SponsorSection/>
        </PaperBase>
        <PaperBase bg='#f9f9f9'>
            <DescriptionSection/>
        </PaperBase>
        <PaperBase bg='#fff'>
            <RestrictionSection/>
        </PaperBase>
      </LanidngLayout>
    </>
  )
}

export default Home
