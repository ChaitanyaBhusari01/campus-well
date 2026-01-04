import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-indigo-50 to-teal-50 flex flex-col">

      {/* APP NAME HEADER */}
      <header className="w-full py-5 border-b bg-white/60 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex justify-center">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-teal-500">
            CampusWell
          </h1>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="max-w-4xl mx-auto text-center mt-14 px-4">
        <h2 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-teal-500">
          A Digital Support System for Student Well-Being
        </h2>

        <p className="mt-4 text-slate-600 leading-relaxed">
          CampusWell brings counselling, screenings, resources, peer support,
          and emergency help together — secure, stigma-free, and built for students.
        </p>
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-14 px-4 pb-16">

        {[
          ["Confidential Counselling", "Book private sessions without stigma."],
          ["Well-Being Resources", "Guides, coping strategies, and relaxation tools."],
          ["Peer Support Forum", "Safe moderated space to share and connect."],
          ["Screening Tools", "Validated self-assessments like PHQ-9 & GAD-7."],
          ["Emergency Helplines", "Instant access when support is urgent."],
          ["Admin Insights", "Anonymous trends for student welfare planning."]
        ].map(([title, desc]) => (
          <div
            key={title}
            className="p-5 rounded-xl border shadow-sm hover:shadow-md transition
                      bg-gradient-to-br from-white via-indigo-50/40 to-teal-50/50"
          >
            <h3 className="font-semibold mb-1">{title}</h3>
            <p className="text-sm text-slate-600">{desc}</p>
          </div>
        ))}

      </section>

      {/* CTA */}
      <section className="mt-4 text-center px-4">
        <h3 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-teal-500">
          Your mental well-being matters.
        </h3>

        <p className="text-slate-600 mt-2">
          Whenever you feel overwhelmed or anxious — CampusWell is here.
        </p>

        <div className="flex gap-3 justify-center mt-5">
          <Link to="/login">
            <Button className="bg-indigo-600 text-white">Login</Button>
          </Link>

          <Link to="/Signup">
            <Button variant="outline">Create Account</Button>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-14 border-t py-8 bg-white/60 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-600">
          <div>
            <h4 className="font-semibold text-slate-800 mb-2">About CampusWell</h4>
            <p>
              A digital mental-health support system built for students — combining counselling,
              resources, screening tools, and peer support in one safe place.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-slate-800 mb-2">Support</h4>
            <p>Privacy & Confidentiality</p>
            <p>Emergency Helplines</p>
            <p>Contact Your Counsellor</p>
          </div>

          <div>
            <h4 className="font-semibold text-slate-800 mb-2">Legal</h4>
            <p>Terms & Conditions</p>
            <p>Privacy Policy</p>
          </div>
        </div>

        <p className="text-center text-xs text-slate-500 mt-6">
          © {new Date().getFullYear()} CampusWell — Built to support students.
        </p>
      </footer>
    </div>
  );
}
