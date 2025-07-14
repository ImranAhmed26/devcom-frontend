import ActionButton from "@/components/Interface/Button/ActionButton";
import { AppButton } from "@/components/Interface/Button/AppButton";
import { Check, Star } from "lucide-react";

export const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "€29",
      period: "/month",
      description: "Perfect for small teams just getting started",
      features: ["500 documents/month", "Basic OCR processing", "JSON/CSV export", "Email support", "GDPR compliant"],
      cta: "Start Free Trial",
      popular: false,
    },
    {
      name: "Professional",
      price: "€99",
      period: "/month",
      description: "Most popular for growing businesses",
      features: [
        "2,500 documents/month",
        "Advanced AI processing",
        "API access",
        "QuickBooks integration",
        "Priority support",
        "Custom fields",
        "Batch processing",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large organizations with high volume",
      features: [
        "Unlimited documents",
        "Custom AI training",
        "White-label solution",
        "Dedicated account manager",
        "SLA guarantee",
        "Custom integrations",
        "On-premise deployment",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Simple, <span className="text-blue-600">Transparent Pricing</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            No hidden fees, no setup costs, no long-term contracts. Cancel anytime.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl border-2 p-8 relative ${
                plan.popular ? "border-blue-600 shadow-xl scale-105" : "border-gray-200 hover:border-gray-300"
              } transition-all`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-xl text-gray-500 ml-1">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <AppButton className={`w-full ${plan.popular ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-900 hover:bg-gray-800"}`}>
                {plan.cta}
              </AppButton>
            </div>
          ))}
        </div>

        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">All Plans Include:</h3>
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Check className="w-6 h-6 text-green-600" />
              </div>
              <div className="font-semibold text-gray-900">14-Day Free Trial</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Check className="w-6 h-6 text-green-600" />
              </div>
              <div className="font-semibold text-gray-900">No Setup Fees</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Check className="w-6 h-6 text-green-600" />
              </div>
              <div className="font-semibold text-gray-900">Cancel Anytime</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Check className="w-6 h-6 text-green-600" />
              </div>
              <div className="font-semibold text-gray-900">GDPR Compliant</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Not Sure Which Plan is Right for You?</h3>
          <p className="text-gray-600 mb-6">
            Start with our 14-day free trial on any plan. Upgrade, downgrade, or cancel anytime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <AppButton className="bg-blue-600 hover:bg-blue-700">Start Free Trial</AppButton>
            <ActionButton title="Schedule a Demo Call" func={() => {}}>
              Schedule a Demo Call
            </ActionButton>
          </div>
        </div>
      </div>
    </section>
  );
};
