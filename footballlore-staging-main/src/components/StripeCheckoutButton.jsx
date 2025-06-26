import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements } from '@stripe/react-stripe-js';

// Test publishable key (replace with your own for real projects)
const stripePromise = loadStripe('pk_test_51N8Qw2JvQw2JvQw2JvQw2JvQw2JvQw2JvQw2JvQw2JvQw2JvQw2JvQw2JvQw2JvQw2JvQw2JvQw2JvQw2JvQw2JvQw2JvQw2Jv00testkey');

function StripeButtonInner() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleClick = async () => {
    setLoading(true);
    setError('');
    try {
      const { error } = await stripe.redirectToCheckout({
        lineItems: [{ price: 'price_1N8Qw2JvQw2JvQw2JvQw2JvQw', quantity: 1 }], // Replace with your test price ID
        mode: 'payment',
        successUrl: window.location.origin + '/?success=true',
        cancelUrl: window.location.origin + '/?canceled=true',
      });
      if (error) setError(error.message);
    } catch (err) {
      setError('Stripe Checkout failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', margin: '2rem 0' }}>
      <button
        className="btn btn-primary"
        onClick={handleClick}
        disabled={!stripe || loading}
        aria-label="Pay with Stripe"
      >
        {loading ? 'Redirecting...' : 'Pay with Stripe (Test)'}
      </button>
      {error && <div style={{ color: '#c62828', marginTop: 8 }}>{error}</div>}
    </div>
  );
}

export default function StripeCheckoutButton() {
  return (
    <Elements stripe={stripePromise}>
      <StripeButtonInner />
    </Elements>
  );
}