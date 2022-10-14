import img from "../images/gulf-of-poets/20221006-184456157.jpg"

export default function Index() {
  return (
    <main>
      <h1>Gulf of Poets</h1>
      <h2>Pitelli, San Terenzo, Lerici, Torello</h2>
      <iframe width="800" height="600" src="https://api.maptiler.com/maps/streets-v2/?key=5u8QuX2Eui9fXwX4mFiv#13.0/44.08411/9.88921"></iframe>
      <img src={img} />
    </main>
  );
}
