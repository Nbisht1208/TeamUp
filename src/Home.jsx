import { Search } from "lucide-react";
import SearchInterface from "./components/SearchInterface";
import SkillSyncHero from "./components/Hero";

function Home() {   
    return (    
        <>
        <SkillSyncHero/>
        <SearchInterface/>
        </>
    );
}

export default Home