import type { Metadata } from "next";
import { site } from "@/lib/config";
export const metadata: Metadata = { title: "About" };

export default function About() {
  return (
    <section className="wrap">
      <h1>About {site.short}</h1>
      <div className="card">
        <p>{site.name} is a roleplay community built around Emergency Response: Liberty County, set in Los Angeles. We focus on realistic scenes, fair moderation and a welcoming environment for new and experienced players.</p>
      </div>
      <div className="grid">
        <div className="card"><h3>Professionalism</h3><p>Realistic roleplay and respectful conduct in every scene.</p></div>
        <div className="card"><h3>Integrity</h3><p>Fair, consistent moderation applied to everyone.</p></div>
        <div className="card"><h3>Service</h3><p>A community where members can grow into departments and leadership.</p></div>
      </div>
    </section>
  );
}
