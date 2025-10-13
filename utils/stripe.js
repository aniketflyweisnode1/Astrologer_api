const stripe = require('stripe');

/**
 * Create a payment intent for ticket booking
 * @param {Object} options - Payment options
 * @param {Number} options.amount - Amount in smallest currency unit (cents for USD)
 * @param {String} options.currency - Currency code (default: 'usd')
 * @param {String} options.customerEmail - Customer email
 * @param {Object} options.metadata - Additional metadata
 * @returns {Object} Payment intent object
 */
const createPaymentIntent = async (options) => {
  try {
    const {
      amount,
      currency = 'usd',
      customerEmail,
      metadata = {}
    } = options;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: currency.toLowerCase(),
      receipt_email: customerEmail,
      metadata: {
        integration: 'vibes_ticket_booking',
        ...metadata
      },
      automatic_payment_methods: {
        enabled: true
      }
    });

    return {
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: paymentIntent.amount / 100, // Convert back to dollars
      currency: paymentIntent.currency,
      status: paymentIntent.status
    };
  } catch (error) {
    throw new Error(`Stripe payment intent creation failed: ${error.message}`);
  }
};

/**
 * Retrieve payment intent details
 * @param {String} paymentIntentId - Payment intent ID
 * @returns {Object} Payment intent details
 */
const getPaymentIntent = async (paymentIntentId) => {
  if (!stripe) {
    throw new Error('Stripe is not configured. Please set STRIPE_SECRET_KEY in .env file');
  }

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    return {
      success: true,
      id: paymentIntent.id,
      amount: paymentIntent.amount / 100,
      currency: paymentIntent.currency,
      status: paymentIntent.status,
      customer_email: paymentIntent.receipt_email,
      metadata: paymentIntent.metadata,
      created: new Date(paymentIntent.created * 1000)
    };
  } catch (error) {
    throw new Error(`Failed to retrieve payment intent: ${error.message}`);
  }
};

/**
 * Confirm payment intent
 * @param {String} paymentIntentId - Payment intent ID
 * @param {String} paymentMethodId - Payment method ID (optional)
 * @returns {Object} Confirmed payment intent
 */
const confirmPaymentIntent = async (paymentIntentId, paymentMethodId = null) => {
  if (!stripe) {
    throw new Error('Stripe is not configured. Please set STRIPE_SECRET_KEY in .env file');
  }

  try {
    const confirmOptions = {};
    
    if (paymentMethodId) {
      confirmOptions.payment_method = paymentMethodId;
    }

    const paymentIntent = await stripe.paymentIntents.confirm(
      paymentIntentId,
      confirmOptions
    );

    return {
      success: true,
      id: paymentIntent.id,
      status: paymentIntent.status,
      amount: paymentIntent.amount / 100,
      currency: paymentIntent.currency
    };
  } catch (error) {
    throw new Error(`Payment confirmation failed: ${error.message}`);
  }
};

/**
 * Cancel payment intent
 * @param {String} paymentIntentId - Payment intent ID
 * @returns {Object} Cancelled payment intent
 */
const cancelPaymentIntent = async (paymentIntentId) => {
  if (!stripe) {
    throw new Error('Stripe is not configured. Please set STRIPE_SECRET_KEY in .env file');
  }

  try {
    const paymentIntent = await stripe.paymentIntents.cancel(paymentIntentId);

    return {
      success: true,
      id: paymentIntent.id,
      status: paymentIntent.status,
      cancellation_reason: paymentIntent.cancellation_reason
    };
  } catch (error) {
    throw new Error(`Payment cancellation failed: ${error.message}`);
  }
};

/**
 * Create a customer in Stripe
 * @param {Object} customerData - Customer information
 * @param {String} customerData.email - Customer email
 * @param {String} customerData.name - Customer name
 * @param {String} customerData.phone - Customer phone
 * @param {Object} customerData.metadata - Additional metadata
 * @returns {Object} Stripe customer object
 */
const createCustomer = async (customerData) => {
  if (!stripe) {
    throw new Error('Stripe is not configured. Please set STRIPE_SECRET_KEY in .env file');
  }

  try {
    const { email, name, phone, metadata = {} } = customerData;

    const customer = await stripe.customers.create({
      email,
      name,
      phone,
      metadata: {
        integration: 'vibes_ticket_booking',
        ...metadata
      }
    });

    return {
      success: true,
      customerId: customer.id,
      email: customer.email,
      name: customer.name,
      created: new Date(customer.created * 1000)
    };
  } catch (error) {
    throw new Error(`Customer creation failed: ${error.message}`);
  }
};

/**
 * Create a refund for a payment
 * @param {String} paymentIntentId - Payment intent ID
 * @param {Number} amount - Amount to refund (optional, full refund if not specified)
 * @param {String} reason - Refund reason
 * @returns {Object} Refund object
 */
const createRefund = async (paymentIntentId, amount = null, reason = 'requested_by_customer') => {
  if (!stripe) {
    throw new Error('Stripe is not configured. Please set STRIPE_SECRET_KEY in .env file');
  }

  try {
    const refundOptions = {
      payment_intent: paymentIntentId,
      reason: reason
    };

    if (amount) {
      refundOptions.amount = Math.round(amount * 100); // Convert to cents
    }

    const refund = await stripe.refunds.create(refundOptions);

    return {
      success: true,
      refundId: refund.id,
      amount: refund.amount / 100,
      currency: refund.currency,
      status: refund.status,
      reason: refund.reason
    };
  } catch (error) {
    throw new Error(`Refund creation failed: ${error.message}`);
  }
};

/**
 * Verify webhook signature
 * @param {String} payload - Request body
 * @param {String} signature - Stripe signature header
 * @param {String} webhookSecret - Webhook secret
 * @returns {Object} Verified event
 */
const verifyWebhookSignature = (payload, signature, webhookSecret) => {
  if (!stripe) {
    throw new Error('Stripe is not configured. Please set STRIPE_SECRET_KEY in .env file');
  }

  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      webhookSecret || process.env.STRIPE_WEBHOOK_SECRET
    );

    return {
      success: true,
      event: event
    };
  } catch (error) {
    throw new Error(`Webhook signature verification failed: ${error.message}`);
  }
};

module.exports = {
  stripe,
  createPaymentIntent,
  getPaymentIntent,
  confirmPaymentIntent,
  cancelPaymentIntent,
  createCustomer,
  createRefund,
  verifyWebhookSignature
};

