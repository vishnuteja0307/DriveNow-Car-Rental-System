import React from 'react';
import { Link } from 'react-router-dom';
import { Footer, Navbar } from '../components/Layout';

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="hero">

          <div className="hero-content">
            <p className="eyebrow">
              SIMPLE. FAST. RELIABLE.
            </p>

            <h1>
              Drive your journey with <span>DriveNow</span>.
            </h1>

            <p>
              Rent the right car for your journey.
              Browse available vehicles, choose your dates,
              and get on the road with ease.
            </p>

            <div className="hero-actions">
              <Link className="btn btn-red" to="/login">
                Rent a Car
              </Link>

              <Link className="btn btn-outline" to="/register">
                Create Account
              </Link>
            </div>
          </div>

          <div className="hero-card">
            <div className="hero-car-icon">🚗</div>
            <h3>Your journey starts here.</h3>
            <p>
              Comfortable cars. Flexible rentals.
              Easy booking.
            </p>
          </div>

        </section>

        {/* Features Section */}
        <section className="features">

          <div className="section-heading">
            <p className="eyebrow">WHY DRIVENOW</p>
            <h2>Everything you need to rent a car</h2>
          </div>

          <div className="feature-grid">

            <article className="feature-card">
              <div className="feature-icon">🚘</div>
              <h3>Wide Selection</h3>
              <p>
                Choose from sedans, SUVs, hatchbacks and more.
              </p>
            </article>

            <article className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Easy Booking</h3>
              <p>
                Find a car and rent it in just a few clicks.
              </p>
            </article>

            <article className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Simple & Secure</h3>
              <p>
                Your account and rental information stay in your browser.
              </p>
            </article>

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}