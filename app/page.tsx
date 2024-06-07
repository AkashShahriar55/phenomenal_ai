import { auth } from "@/lib/auth";

export default async function Landing() {
  const session = await auth()
  return (
    <>
      <div className="absolute w-full bg-logout bg-cover h-screen flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="z-10 flex flex-col items-center animate-fade-up">
          <h1 className="text-7xl font-bold text-center mb-3 text-white">Imagine Tomorrow</h1>
          <h1 className="text-3xl font-semi-bold mb-3 text-white">Play. Work. Create</h1>
          <p className="text-2xl max-w-xl text-center text-white mt-20 mx-auto">
            PhenomenAI is a future-proof GenAI video creation ecosystem to add intelligence to your creativity,
            connections, community, and workflow
          </p>
          {
            !session ? <button className="px-6 py-3 text-lg font-bold mt-7 text-white bg-red-600 rounded" ><a href="/trynow">TRY NOW</a></button> : <button className="px-6 py-3 text-lg font-bold mt-7 text-white bg-red-600 rounded" ><a href="/generate">Generate</a></button>
          }
          
        </div>
        
      </div>
    
    </>
  );

  
}