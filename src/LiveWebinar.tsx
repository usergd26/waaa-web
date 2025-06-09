export default function LiveWebinar() {
  return (
    <div className="bg-black text-white font-sans">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-black via-zinc-900 to-black p-6 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-green-500">
          Multiply Your Profits by 10x-20x in the Next Crypto Bull Run
        </h1>
        <p className="mt-4 text-base sm:text-lg md:text-xl text-white/80">
          Join Jeet Shah’s Crypto Masterclass Workshop – Learn Strategies for Explosive Crypto Growth
        </p>
        <div className="mt-6">
          <button className="bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-6 rounded-full w-full sm:w-auto">
            Join The Workshop At Just Rs. 9/-
          </button>
        </div>
      </section>

      {/* Where You Will Learn Section */}
      <section className="p-6 max-w-5xl mx-auto">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center mb-6">
          Where You Will Learn
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            "✅ Why Bitcoin is Rising & Its Future Potential",
            "✅ How to Pick Altcoins That Could 10x Your Investment",
            "✅ Secret Strategies For Maximum ROI",
            "✅ How to Use Exchanges & Avoid Common Mistakes",
          ].map((item, index) => (
            <li key={index} className="bg-zinc-800 p-4 rounded-md border border-zinc-700 text-sm sm:text-base">
              {item}
            </li>
          ))}
        </ul>
        <div className="text-center mt-6">
          <button className="bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-6 rounded-full w-full sm:w-auto">
            Join The Workshop At Just Rs. 9/-
          </button>
        </div>
      </section>

      {/* Target Audience */}
      <section className="bg-zinc-900 p-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6">This Workshop Is For You If...</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-center">
          {["Crypto Enthusiast", "Risk Taker / Investor", "Tech Savvy Person"].map((role, index) => (
            <div key={index} className="bg-zinc-800 p-4 rounded-md text-sm sm:text-base">
              {role}
            </div>
          ))}
        </div>
      </section>

      {/* Success Stories */}
      <section className="p-6 max-w-5xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6">
          Success Stories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            '"I made 3x returns in 2 months!"',
            '"The insights are gold!"',
            '"Perfect for beginners like me."',
            '"Highly recommended!"',
          ].map((story, index) => (
            <div key={index} className="bg-zinc-800 p-4 rounded-md text-sm sm:text-base">
              {story}
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-zinc-900 p-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6">Benefits You’ll Get</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            "✅ Maximize Your Profits",
            "✅ Track Market Trends",
            "✅ Smart Altcoin Picks",
            "✅ Effective Risk Management",
          ].map((benefit, index) => (
            <li key={index} className="bg-zinc-800 p-4 rounded-md text-sm sm:text-base">
              {benefit}
            </li>
          ))}
        </ul>
      </section>

      {/* Meet Your Host */}
      <section className="p-6 max-w-3xl mx-auto text-center">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">Meet Your Host – Jeet Shah</h2>
        <p className="text-white/80 text-sm sm:text-base">
          Crypto Expert & Educator, Jeet has helped 50,000+ learners master the crypto market. With years of experience, he breaks down complex concepts for easy learning.
        </p>
      </section>

      {/* Bonuses */}
      <section className="bg-zinc-800 p-6 text-center">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-green-500">FREE BONUSES AWAITING FOR YOU!!!</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            "Bonus #1: How To Find Coins That 10x",
            "Bonus #2: Secret Strategy Guide",
            "Bonus #3: How To Track Winners Fast",
          ].map((bonus, index) => (
            <div key={index} className="bg-zinc-900 p-4 rounded-md text-sm sm:text-base">
              {bonus}
            </div>
          ))}
        </div>
        <p className="mt-4 text-base sm:text-lg font-bold text-green-400">
          Total Value Of Bonuses: ₹6,497 | Get All For Just ₹9!
        </p>
        <button className="mt-4 bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-6 rounded-full w-full sm:w-auto">
          Buy Today At Just ₹9
        </button>
      </section>

      {/* FAQ */}
      <section className="p-6 max-w-4xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-semibold text-center mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            "How long is the workshop?",
            "What is the workshop about?",
            "Who is this workshop for?",
            "How can I benefit from this workshop?",
            "Is there any prerequisite knowledge required?",
            "Can I ask questions during the workshop?",
            "Will there be a recording of the workshop?",
          ].map((question, index) => (
            <details key={index} className="bg-zinc-800 p-4 rounded-md text-sm sm:text-base">
              <summary className="cursor-pointer font-medium text-white">
                {question}
              </summary>
              <p className="mt-2 text-white/70">Answer coming soon...</p>
            </details>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 text-center p-4 text-xs text-white/40">
        © 2025 Jeet Shah Academy | Terms & Conditions | Privacy Policy
      </footer>
    </div>
  );
}
