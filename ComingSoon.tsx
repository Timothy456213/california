export default function ComingSoon({ title, phase, text }: { title: string; phase: string; text: string }) {
  return (
    <section className="wrap">
      <h1>{title}</h1>
      <div className="card"><h3>Coming in {phase}</h3><p>{text}</p></div>
    </section>
  );
}
