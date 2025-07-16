import { AppButton } from "@/components/Interface/Button/AppButton";
import { Upload, Brain, Download, CheckCircle } from "lucide-react";

export const Solution = () => {
  const steps = [
    {
      icon: Upload,
      title: "Upload Documents",
      description: "Drag & drop invoices, receipts, or any document. We support PDF, JPG, PNG formats.",
    },
    {
      icon: Brain,
      title: "AI Processing",
      description: "Our advanced OCR AI reads and understands your documents in under 30 seconds.",
    },
    {
      icon: Download,
      title: "Get Structured Data",
      description: "Download clean JSON/CSV data ready for your accounting software or ERP system.",
    },
    {
      icon: CheckCircle,
      title: "Integrate & Automate",
      description: "Connect via API or use our integrations with QuickBooks, SAP, and other platforms.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {`Here's How We`} <span className="text-blue-600">Solve It</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform hours of manual work into seconds of automated processing with our AI-powered platform.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="text-center relative">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <step.icon className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>

              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-full w-full">
                  <div className="w-8 h-0.5 bg-blue-200 mx-auto"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">The Result? Your Team Gets Their Time Back</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-900">95% Time Reduction:</strong>
                    <span className="text-gray-600"> Process 100 invoices in 15 minutes instead of 15 hours</span>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-900">99.8% Accuracy:</strong>
                    <span className="text-gray-600"> Eliminate human errors and costly mistakes</span>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-900">Instant Integration:</strong>
                    <span className="text-gray-600"> Works with your existing accounting software</span>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-gray-900">GDPR Compliant:</strong>
                    <span className="text-gray-600"> Enterprise-grade security and data protection</span>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <AppButton href="/" className="bg-blue-600 hover:bg-blue-700">
                  Try It Free for 14 Days
                </AppButton>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Customer Success Story</h4>
              <blockquote className="text-gray-700 mb-4">
                {`"DocuFlow cut our invoice processing time from 3 days to 3 hours. Our AP team now focuses on vendor relationships
                instead of data entry. We've processed over 10,000 documents with zero errors."`}
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                  MK
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Maria Kowalski</div>
                  <div className="text-sm text-gray-500">{`Finance Director, TechCorp EU`}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
