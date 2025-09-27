export const stripeProducts = [
  {
    priceId: 'price_1QdGJKJNcmPzuSeHtjN1UUUU', // Replace with your actual Stripe price ID
    name: 'AI Copywriting Prompt Pack',
    description: 'A comprehensive collection of AI copywriting prompts to enhance your content creation',
    price: 9700, // $97.00 in cents
    mode: 'payment' as const,
  },
] as const;

export type StripeProduct = typeof stripeProducts[number];