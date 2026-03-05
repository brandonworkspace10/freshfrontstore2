import { Leaf, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function InviteOnlyPage() {
  return (
    <div className="text-center space-y-8">
      <div className="flex flex-col items-center gap-3">
        <div className="w-14 h-14 rounded-2xl bg-[#3A9AFF] flex items-center justify-center shadow-lg shadow-green-200">
          <Leaf className="w-7 h-7 text-white" strokeWidth={2.5} />
        </div>
        <div>
          <h1 className="font-display text-2xl font-700 text-gray-900 tracking-tight">
            FreshFront
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">Customer HQ</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-5">
        <div className="space-y-2">
          <h2 className="font-display text-xl font-600 text-gray-900">
            Invite only
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            FreshFront is invite only.
          </p>
        </div>

        <div className="space-y-3 text-sm text-gray-600">
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
            <span className="text-lg mt-0.5">📧</span>
            <div>
              <p className="font-medium text-gray-800">Already a customer?</p>
              <p className="text-gray-500 mt-0.5">Check your email for your invite link.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
            <span className="text-lg mt-0.5">🌿</span>
            <div>
              <p className="font-medium text-gray-800">Not a customer yet?</p>
              <p className="text-gray-500 mt-0.5">
                Visit{" "}
                <a
                  href="https://freshfrontnyc.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#3A9AFF] font-medium hover:underline"
                >
                  freshfrontnyc.com
                </a>{" "}
                to get started.
              </p>
            </div>
          </div>
        </div>

        <Link
          href="/login"
          className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
        >
          Already have an account? Sign in
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      <p className="text-xs text-gray-400">
        First impressions, every month.
      </p>
    </div>
  );
}
