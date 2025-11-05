import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4">
      <div className="mx-auto max-w-3xl">
        <section className="rounded-lg bg-white p-8 shadow">
          <h1 className="text-3xl font-semibold text-slate-900">
            About This Project
          </h1>
          <p className="mt-4 text-slate-600">
            This MERN DevOps practice application showcases a simple full-stack
            workflow. The frontend is built with React and TypeScript, while the
            backend runs on Express. Use this page as a starting point for
            experimenting with layouts, components, and data fetched from the
            API.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <article className="rounded-md border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-lg font-medium text-slate-800">What&apos;s Included</h2>
              <ul className="mt-4 list-disc space-y-2 pl-6 text-sm text-slate-600">
                <li>Type-safe React components</li>
                <li>Tailwind CSS utility classes</li>
                <li>Backend connectivity examples</li>
                <li>Health check endpoint integration</li>
              </ul>
            </article>

            <article className="rounded-md border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-lg font-medium text-slate-800">Try It Out</h2>
              <p className="mt-4 text-sm text-slate-600">
                Extend this page with new sections, connect charts to backend
                data, or add links to deployment resources. Keeping changes here
                isolated makes it easy to iterate quickly.
              </p>
            </article>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
