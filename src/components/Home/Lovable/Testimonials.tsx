import { Star, Quote } from "lucide-react";

export const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CFO",
      company: "GreenTech Solutions",
      image: "SC",
      rating: 5,
      content:
        "DocuFlow eliminated our invoice processing backlog overnight. We went from 3-day processing cycles to same-day approvals. The accuracy is incredible—we haven't found a single error in 6 months.",
    },
    {
      name: "Marcus Weber",
      role: "Finance Director",
      company: "AutoParts GmbH",
      image: "MW",
      rating: 5,
      content:
        "As a German company, GDPR compliance was crucial. DocuFlow not only meets all requirements but their EU servers give us complete peace of mind. The ROI was obvious within the first month.",
    },
    {
      name: "Emma Thompson",
      role: "Accounting Manager",
      company: "RetailChain Ltd",
      image: "ET",
      rating: 5,
      content:
        "Processing 1,000+ receipts monthly was killing our productivity. Now my team focuses on analysis instead of data entry. The QuickBooks integration is seamless—it just works.",
    },
  ];

  const companies = ["TechCorp", "GreenEnergy", "FinanceFirst", "AutoGroup", "RetailPro", "ManufactureX"];

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Trusted by <span className="text-blue-600">500+ Companies</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Finance teams across Europe and North America rely on DocuFlow to streamline their document processing.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <Quote className="w-8 h-8 text-blue-600 mb-4" />
              <p className="text-gray-700 mb-6 leading-relaxed">{`"${testimonial.content}"`}</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                  {testimonial.image}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-gray-500 mb-8">Trusted by leading companies worldwide:</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {companies.map((company, index) => (
              <div key={index} className="text-gray-400 font-semibold text-lg">
                {company}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-blue-600 rounded-2xl p-8 lg:p-12 text-white text-center">
          <h3 className="text-2xl lg:text-3xl font-bold mb-4">Join the 95% Who See ROI in Week 1</h3>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Average customer saves €15,000 annually in labor costs while eliminating processing errors completely.
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-blue-100">Time Savings</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99.8%</div>
              <div className="text-blue-100">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">€15K</div>
              <div className="text-blue-100">Annual Savings</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
