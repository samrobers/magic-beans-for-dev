import React, { useEffect, useRef } from 'react';

/**
 * AngularAppWrapper - Embeds the Angular Ditch Rider Academy app
 * Uses iframe approach for simplicity and isolation
 */
const AngularAppWrapper = () => {
  const iframeRef = useRef(null);

  useEffect(() => {
    // Handle iframe communication if needed
    const handleMessage = (event) => {
      // Handle messages from Angular app
      if (event.data && event.data.type === 'ANGULAR_READY') {
        console.log('Angular app loaded successfully');
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Determine Angular app URL based on environment
  const angularUrl = import.meta.env.PROD
    ? '/magic-beans-for-dev/ditch-rider-academy/'
    : 'http://localhost:4200';

  return (
    <div className="angular-app-container w-full h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto p-4">
        <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <span className="text-4xl">🌊</span>
              Ditch Rider Academy
            </h1>
            <p className="text-blue-100 mt-2">
              Master Angular data flow patterns with interactive visualizations
            </p>
          </div>

          {/* Angular App IFrame */}
          <div className="relative" style={{ height: 'calc(100vh - 200px)' }}>
            <iframe
              ref={iframeRef}
              src={angularUrl}
              title="Ditch Rider Academy - Angular App"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              sandbox="allow-same-origin allow-scripts allow-forms allow-modals"
            />
            
            {/* Loading overlay - shown while iframe loads */}
            <div className="absolute inset-0 bg-gray-900 flex items-center justify-center pointer-events-none opacity-0 transition-opacity duration-300" id="loading-overlay">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-300 text-lg">Loading Angular Academy...</p>
              </div>
            </div>
          </div>

          {/* Development hint */}
          {!import.meta.env.PROD && (
            <div className="bg-yellow-900 bg-opacity-50 border-t border-yellow-700 p-4">
              <p className="text-yellow-200 text-sm">
                <strong>Dev Mode:</strong> Make sure Angular dev server is running on port 4200
                <br />
                <code className="bg-yellow-800 px-2 py-1 rounded mt-2 inline-block">
                  npm run dev:angular
                </code>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AngularAppWrapper;
