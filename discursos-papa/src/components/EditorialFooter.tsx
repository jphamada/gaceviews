import React from 'react';

export const EditorialFooter: React.FC = () => {
  return (
    <footer className="w-full bg-surface-container border-t border-hairline mt-16 pt-8 pb-12 px-4 md:px-8 text-on-surface-variant font-sans no-print">
      <div className="max-w-7xl mx-auto">
        {/* Double rule separator */}
        <div className="masthead-double-rule mb-6 max-w-5xl mx-auto"></div>



        <div className="mt-8 pt-6 border-t border-hairline/60 text-center text-[11px] text-outline">
          <p>© {new Date().getFullYear()} LA GACETA S.A.</p>
        </div>
      </div>
    </footer>
  );
};
