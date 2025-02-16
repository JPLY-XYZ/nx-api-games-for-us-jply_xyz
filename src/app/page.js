import { redirect } from "next/navigation"

export default function Home() {
  // redirect('https://games-for-us-jply-xyz.vercel.app/') 
//  redirect('/api/') //DEVMODE

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
      API
      </div>
    </main>)
}
