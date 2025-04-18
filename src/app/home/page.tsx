import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="home-container"></div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the main page of your application. Feel free to explore!</p>
      <Image src="/home-image.jpg" alt="Home Image" width={500} height={300} />
    </div>
  );
}
