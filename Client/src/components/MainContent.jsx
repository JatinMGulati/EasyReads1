import React from 'react';
import Catalog from './Catalog';
import DigitalContent from './DigitalContent';
import CategoryList from './CategoryList';
import Recommendations from './Recommendations';

const MainContent = ({username}) => {

  return (
    <main className="py-12 px-6 bg-gray-900 text-gray-100 min-h-screen">
      <div className="container mx-auto space-y-16 w-full">

        {/* Hero Section */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Hi {username ? username : ""}, Welcome to EasyReads</h1>
          <p className="text-lg text-gray-300">
            Explore books, discover recommendations, and experience our comprehensive library system.
          </p>
        </header>

        {/* Categories Section */}
        <section className="space-y-8">
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">Categories</h2>
          <CategoryList />
        </section>

        {/* Recommendations Section */}
        <section className="space-y-8">
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">Recommended for You</h2>
          <Recommendations />
        </section>

        {/* Library Catalog Section */}
        <section className="space-y-8">
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">Library Catalog</h2>
          <Catalog />
        </section>

        {/* Digital Content Section */}
        <section className="space-y-8">
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">Digital Content</h2>
          <DigitalContent />
        </section>

        
      </div>

      {/* No chatbot needed */}
    </main>
  );
};

export default MainContent;
