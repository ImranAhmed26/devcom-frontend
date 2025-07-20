"use client";

import React from "react";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Clock,
  FileText,
  Zap,
  Shield,
  ArrowRight,
  Star,
  Database,
  Workflow,
  Globe,
  Lock,
  Users,
  DollarSign,
  BarChart3,
  Award,
  Briefcase,
  Building2,
  Calculator,
  PlayCircle,
  Mail,
  Phone,
  MapPin,
  Calendar,
  BookOpen,
  FileCheck,
  Layers,
  Settings,
  Smartphone,
  Cloud,
  Cpu,
  Eye,
  AlertTriangle,
  Lightbulb,
  Rocket,
  HeartHandshake,
  MessageSquare,
  TrendingDown,
  ChevronDown,
  X,
  Menu,
} from "lucide-react";
import Link from "next/link";

// Custom Button Component
const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  disabled = false,
  ...props
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  [key: string]: any;
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl",
    secondary: "bg-white text-blue-600 hover:bg-gray-50 shadow-lg hover:shadow-xl border border-gray-200",
    outline: "border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400",
    ghost: "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

// Custom Card Component
const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 ${className}`}>{children}</div>
);

// Custom Badge Component
const Badge = ({
  children,
  variant = "default",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "default" | "secondary" | "success" | "warning";
  className?: string;
}) => {
  const variants = {
    default: "bg-blue-100 text-blue-800",
    secondary: "bg-gray-100 text-gray-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

// Custom Accordion Component
const Accordion = ({ children }: { children: React.ReactNode }) => <div className="space-y-4">{children}</div>;

const AccordionItem = ({
  children,
  isOpen,
  onToggle,
}: {
  children: React.ReactNode;
  value?: string;
  isOpen: boolean;
  onToggle: () => void;
}) => (
  <div className="border border-gray-200 rounded-2xl px-8 py-2 shadow-sm hover:shadow-md transition-shadow">
    {React.Children.map(children, (child) =>
      React.isValidElement(child) ? React.cloneElement(child as React.ReactElement<any>, { isOpen, onToggle }) : child
    )}
  </div>
);

const AccordionTrigger = ({
  children,
  isOpen,
  onToggle,
}: {
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
}) => (
  <button
    className="w-full text-left font-semibold text-gray-900 hover:text-blue-600 text-lg py-6 flex items-center justify-between"
    onClick={onToggle}
  >
    <span>{children}</span>
    <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
  </button>
);

const AccordionContent = ({ children, isOpen }: { children: React.ReactNode; isOpen?: boolean }) => (
  <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 pb-6" : "max-h-0"}`}>
    <div className="text-gray-600 pt-2 text-base leading-relaxed">{children}</div>
  </div>
);

// Custom Tabs Component
const Tabs = ({
  children,
  value,
  onValueChange,
}: {
  children: React.ReactNode;
  value: string;
  onValueChange: (value: string) => void;
}) => (
  <div>
    {React.Children.map(children, (child) =>
      React.isValidElement(child)
        ? React.cloneElement(child as React.ReactElement<any>, { activeTab: value, onTabChange: onValueChange })
        : child
    )}
  </div>
);

const TabsList = ({
  children,
  activeTab,
  onTabChange,
}: {
  children: React.ReactNode;
  activeTab?: string;
  onTabChange?: (value: string) => void;
}) => (
  <div className="grid w-full grid-cols-2 md:grid-cols-4 mb-12 h-auto p-2 bg-gray-100 rounded-2xl">
    {React.Children.map(children, (child) =>
      React.isValidElement(child) ? React.cloneElement(child as React.ReactElement<any>, { activeTab, onTabChange }) : child
    )}
  </div>
);

const TabsTrigger = ({
  children,
  value,
  activeTab,
  onTabChange,
}: {
  children: React.ReactNode;
  value: string;
  activeTab?: string;
  onTabChange?: (value: string) => void;
}) => (
  <button
    className={`text-lg py-4 rounded-xl transition-all ${
      activeTab === value ? "bg-white shadow-sm text-gray-900" : "text-gray-600 hover:text-gray-900"
    }`}
    onClick={() => onTabChange?.(value)}
  >
    {children}
  </button>
);

const TabsContent = ({ children, value, activeTab }: { children: React.ReactNode; value: string; activeTab?: string }) => (
  <div className={`${activeTab === value ? "block" : "hidden"}`}>{children}</div>
);

// Custom Progress Component
const Progress = ({ value, className = "" }: { value: number; className?: string }) => (
  <div className={`w-full bg-gray-200 rounded-full ${className}`}>
    <div
      className="bg-green-500 h-full rounded-full transition-all duration-300"
      style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
    />
  </div>
);

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("invoices");
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-white" />;
  }

  const toggleAccordion = (value: string) => {
    setOpenAccordion(openAccordion === value ? null : value);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-100 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold text-gray-900">DocuFlow AI</span>
                <div className="text-xs text-blue-600 font-medium">Enterprise OCR Platform</div>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link href="#solutions" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Solutions
              </Link>
              <Link href="#features" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Features
              </Link>
              <Link href="#pricing" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Pricing
              </Link>
              <Link href="#resources" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Resources
              </Link>
              <Link href="#company" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Company
              </Link>
              <Button variant="outline" size="sm">
                Sign In
              </Button>
              <Button size="sm">Start Free Trial</Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-100 py-4">
              <div className="flex flex-col space-y-4">
                <Link href="#solutions" className="text-gray-700 hover:text-blue-600 font-medium">
                  Solutions
                </Link>
                <Link href="#features" className="text-gray-700 hover:text-blue-600 font-medium">
                  Features
                </Link>
                <Link href="#pricing" className="text-gray-700 hover:text-blue-600 font-medium">
                  Pricing
                </Link>
                <Link href="#resources" className="text-gray-700 hover:text-blue-600 font-medium">
                  Resources
                </Link>
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-100">
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                  <Button size="sm">Start Free Trial</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section - Much Larger */}
      <section className="pt-24 pb-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, staggerChildren: 0.15 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-8"
            >
              <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm">
                <Zap className="w-4 h-4 mr-2" />
                #1 AI-Powered Document Processing Platform in Europe
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-8xl font-bold text-gray-900 mb-8 leading-tight"
            >
              Transform Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 block">
                Document Chaos
              </span>
              Into Structured Gold
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              Stop losing €50,000+ annually to manual data entry. Our enterprise-grade AI extracts structured data from any
              document in seconds—with 99.8% accuracy guaranteed. Trusted by 2,500+ finance teams across Europe.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            >
              <Button size="lg" className="text-xl px-12 py-8 shadow-lg hover:shadow-xl">
                Start Free 14-Day Trial
                <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
              <Button variant="outline" size="lg" className="text-xl px-12 py-8 bg-white/80 backdrop-blur-sm hover:bg-white">
                <PlayCircle className="mr-3 w-6 h-6" />
                Watch 3-Min Demo
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-16"
            >
              <div>
                <div className="text-3xl font-bold text-blue-600">99.8%</div>
                <div className="text-gray-600">Accuracy Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">2,500+</div>
                <div className="text-gray-600">Companies Trust Us</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">50M+</div>
                <div className="text-gray-600">Documents Processed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">85%</div>
                <div className="text-gray-600">Time Savings</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="text-sm text-gray-500 mb-12"
            >
              ✓ No credit card required ✓ GDPR & SOC 2 compliant ✓ 99.9% uptime SLA ✓ EU data centers
            </motion.div>
          </motion.div>

          {/* Enhanced Hero Visual */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-20 relative"
          >
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 shadow-2xl">
              <div className="grid lg:grid-cols-3 gap-12 items-center">
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center space-x-3 mb-4">
                      <FileText className="w-6 h-6 text-gray-400" />
                      <span className="text-gray-700 font-medium">invoice_Q4_2024.pdf</span>
                      <Badge variant="secondary" className="text-xs">
                        Processing...
                      </Badge>
                    </div>
                    <div className="h-40 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center">
                      <div className="text-center">
                        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <span className="text-gray-500">Document Preview</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <ArrowRight className="w-8 h-8 text-white" />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center space-x-3 mb-4">
                      <Database className="w-6 h-6 text-green-500" />
                      <span className="text-gray-700 font-medium">Extracted Data</span>
                      <Badge variant="success" className="text-xs">
                        Complete
                      </Badge>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between p-2 bg-gray-50 rounded">
                        <span className="text-gray-600">Invoice Number:</span>
                        <span className="font-semibold">INV-2024-Q4-001</span>
                      </div>
                      <div className="flex justify-between p-2 bg-gray-50 rounded">
                        <span className="text-gray-600">Total Amount:</span>
                        <span className="font-semibold text-green-600">€12,450.00</span>
                      </div>
                      <div className="flex justify-between p-2 bg-gray-50 rounded">
                        <span className="text-gray-600">Due Date:</span>
                        <span className="font-semibold">2024-12-15</span>
                      </div>
                      <div className="flex justify-between p-2 bg-gray-50 rounded">
                        <span className="text-gray-600">Vendor:</span>
                        <span className="font-semibold">TechSupplier GmbH</span>
                      </div>
                      <div className="flex justify-between p-2 bg-gray-50 rounded">
                        <span className="text-gray-600">VAT Rate:</span>
                        <span className="font-semibold">19%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Signals Section */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gray-600 text-lg mb-8">Trusted by leading companies across Europe</p>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center opacity-60">
              <div className="text-2xl font-bold text-gray-400">Siemens</div>
              <div className="text-2xl font-bold text-gray-400">BMW Group</div>
              <div className="text-2xl font-bold text-gray-400">ING Bank</div>
              <div className="text-2xl font-bold text-gray-400">Philips</div>
              <div className="text-2xl font-bold text-gray-400">SAP</div>
              <div className="text-2xl font-bold text-gray-400">Unilever</div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: <Award className="w-8 h-8" />, title: "SOC 2 Type II", subtitle: "Security Certified" },
              { icon: <Shield className="w-8 h-8" />, title: "GDPR Compliant", subtitle: "EU Data Protection" },
              { icon: <Globe className="w-8 h-8" />, title: "ISO 27001", subtitle: "Information Security" },
              { icon: <Lock className="w-8 h-8" />, title: "99.9% Uptime", subtitle: "Enterprise SLA" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <div className="text-blue-600">{item.icon}</div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.subtitle}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pain Points Section - Enhanced */}
      <section className="py-32 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-8">The Hidden Cost of Manual Document Processing</h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {`Every minute your team spends on manual data entry is costing your business more than you realize. Here's the
              painful reality most finance teams face daily.`}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-white rounded-3xl p-8 shadow-xl">
                <h3 className="text-3xl font-bold text-gray-900 mb-6">The Real Numbers</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <Clock className="w-6 h-6 text-red-600" />
                      <span className="font-medium">Time Lost Weekly</span>
                    </div>
                    <span className="text-2xl font-bold text-red-600">20+ hours</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <DollarSign className="w-6 h-6 text-orange-600" />
                      <span className="font-medium">Annual Cost per Employee</span>
                    </div>
                    <span className="text-2xl font-bold text-orange-600">€25,000</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="w-6 h-6 text-yellow-600" />
                      <span className="font-medium">Error Rate</span>
                    </div>
                    <span className="text-2xl font-bold text-yellow-600">15-25%</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <TrendingDown className="w-6 h-6 text-red-600" />
                      <span className="font-medium">Employee Satisfaction</span>
                    </div>
                    <span className="text-2xl font-bold text-red-600">-40%</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {[
                {
                  icon: <Clock className="w-8 h-8 text-red-600" />,
                  title: "Endless Manual Data Entry",
                  description:
                    "Your skilled finance professionals spend 60% of their time typing numbers instead of analyzing them. That's €50,000+ in wasted salary per employee annually.",
                },
                {
                  icon: <AlertTriangle className="w-8 h-8 text-orange-600" />,
                  title: "Costly Human Errors",
                  description:
                    "A single mistyped invoice amount can cost thousands in reconciliation time, vendor disputes, and audit complications. Errors compound exponentially as volume grows.",
                },
                {
                  icon: <TrendingDown className="w-8 h-8 text-yellow-600" />,
                  title: "Impossible to Scale",
                  description:
                    "Your business is growing, but your document processing isn't. Adding more people isn't the answer—it's just more expensive and more error-prone.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl p-12 text-white text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold mb-4">Stop the Bleeding. Start Automating.</h3>
            <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
              Every day you delay automation is another day of lost productivity, frustrated employees, and missed opportunities.
              The solution is here.
            </p>
            <Button size="lg" variant="secondary" className="text-red-600">
              {`See How Much You're Losing`}
              <Calculator className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Solutions by Industry */}
      <section id="solutions" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-8">Tailored Solutions for Every Industry</h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
              DocuFlow AI adapts to your specific industry needs with pre-trained models and custom workflows.
            </p>
          </motion.div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="invoices">
                <Briefcase className="w-5 h-5 mr-2" />
                Finance Teams
              </TabsTrigger>
              <TabsTrigger value="healthcare">
                <HeartHandshake className="w-5 h-5 mr-2" />
                Healthcare
              </TabsTrigger>
              <TabsTrigger value="legal">
                <FileCheck className="w-5 h-5 mr-2" />
                Legal Firms
              </TabsTrigger>
              <TabsTrigger value="logistics">
                <Building2 className="w-5 h-5 mr-2" />
                Logistics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="invoices">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">Finance & Accounting Teams</h3>
                  <p className="text-xl text-gray-600 mb-8">
                    Transform your AP/AR processes with intelligent invoice processing that understands complex financial
                    documents.
                  </p>
                  <div className="space-y-4 mb-8">
                    {[
                      "Multi-currency invoice processing",
                      "VAT/Tax calculation and validation",
                      "PO matching and 3-way reconciliation",
                      "ERP integration (SAP, Oracle, NetSuite)",
                      "Approval workflow automation",
                      "Audit trail and compliance reporting",
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button size="lg">
                    See Finance Demo
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8">
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h4 className="font-semibold text-gray-900 mb-4">Sample Invoice Processing</h4>
                    <div className="space-y-3 text-sm">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-3 rounded">
                          <div className="text-gray-600">Vendor</div>
                          <div className="font-semibold">Microsoft Deutschland</div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded">
                          <div className="text-gray-600">Invoice #</div>
                          <div className="font-semibold">MS-2024-Q4-1001</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-gray-50 p-3 rounded">
                          <div className="text-gray-600">Net Amount</div>
                          <div className="font-semibold">€8,400.00</div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded">
                          <div className="text-gray-600">VAT (19%)</div>
                          <div className="font-semibold">€1,596.00</div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded">
                          <div className="text-gray-600">Total</div>
                          <div className="font-semibold text-green-600">€9,996.00</div>
                        </div>
                      </div>
                      <div className="bg-green-50 p-3 rounded border border-green-200">
                        <div className="text-green-700 font-medium">✓ PO Match Confirmed</div>
                        <div className="text-green-600 text-xs">Matched to PO-2024-0892</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="healthcare">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">Healthcare & Medical</h3>
                  <p className="text-xl text-gray-600 mb-8">
                    Streamline patient records, insurance claims, and medical billing with HIPAA-compliant document processing.
                  </p>
                  <div className="space-y-4 mb-8">
                    {[
                      "Patient intake form processing",
                      "Insurance claim automation",
                      "Medical record digitization",
                      "Prescription data extraction",
                      "HIPAA compliance built-in",
                      "EMR system integration",
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button size="lg">
                    Healthcare Demo
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8">
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h4 className="font-semibold text-gray-900 mb-4">Patient Record Processing</h4>
                    <div className="space-y-3 text-sm">
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="text-gray-600">Patient ID</div>
                        <div className="font-semibold">PAT-2024-001892</div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-3 rounded">
                          <div className="text-gray-600">Insurance Provider</div>
                          <div className="font-semibold">AOK Bayern</div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded">
                          <div className="text-gray-600">Policy Number</div>
                          <div className="font-semibold">AOK-789456123</div>
                        </div>
                      </div>
                      <div className="bg-blue-50 p-3 rounded border border-blue-200">
                        <div className="text-blue-700 font-medium">✓ HIPAA Compliant Processing</div>
                        <div className="text-blue-600 text-xs">All data encrypted and anonymized</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="legal">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">Legal & Law Firms</h3>
                  <p className="text-xl text-gray-600 mb-8">
                    Extract key information from contracts, legal documents, and case files with precision and confidentiality.
                  </p>
                  <div className="space-y-4 mb-8">
                    {[
                      "Contract clause extraction",
                      "Legal document classification",
                      "Case file organization",
                      "Client billing automation",
                      "Confidentiality guaranteed",
                      "Legal database integration",
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button size="lg">
                    Legal Demo
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl p-8">
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h4 className="font-semibold text-gray-900 mb-4">Contract Analysis</h4>
                    <div className="space-y-3 text-sm">
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="text-gray-600">Contract Type</div>
                        <div className="font-semibold">Software License Agreement</div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-3 rounded">
                          <div className="text-gray-600">Term Length</div>
                          <div className="font-semibold">3 Years</div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded">
                          <div className="text-gray-600">Auto-Renewal</div>
                          <div className="font-semibold text-orange-600">Yes</div>
                        </div>
                      </div>
                      <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
                        <div className="text-yellow-700 font-medium">⚠ Key Clause Detected</div>
                        <div className="text-yellow-600 text-xs">Termination notice required 90 days prior</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="logistics">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">Logistics & Supply Chain</h3>
                  <p className="text-xl text-gray-600 mb-8">
                    Automate shipping documents, customs forms, and delivery receipts for seamless supply chain operations.
                  </p>
                  <div className="space-y-4 mb-8">
                    {[
                      "Bill of lading processing",
                      "Customs documentation",
                      "Delivery receipt automation",
                      "Inventory tracking integration",
                      "Multi-language support",
                      "Real-time shipment updates",
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button size="lg">
                    Logistics Demo
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-8">
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h4 className="font-semibold text-gray-900 mb-4">Shipping Document</h4>
                    <div className="space-y-3 text-sm">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-3 rounded">
                          <div className="text-gray-600">Tracking #</div>
                          <div className="font-semibold">DHL-789456123</div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded">
                          <div className="text-gray-600">Weight</div>
                          <div className="font-semibold">24.5 kg</div>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="text-gray-600">Destination</div>
                        <div className="font-semibold">Amsterdam, Netherlands</div>
                      </div>
                      <div className="bg-green-50 p-3 rounded border border-green-200">
                        <div className="text-green-700 font-medium">✓ Customs Cleared</div>
                        <div className="text-green-600 text-xs">All documentation verified</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="py-32 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-8">Calculate Your ROI in 60 Seconds</h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
              See exactly how much time and money DocuFlow AI will save your organization.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              className="bg-white rounded-3xl p-8 shadow-xl"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Current Situation</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Documents processed monthly</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="e.g., 1000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Average processing time per document (minutes)
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="e.g., 5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Average hourly rate (€)</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="e.g., 35"
                  />
                </div>
                <Button className="w-full py-4">
                  <Calculator className="mr-2 w-5 h-5" />
                  Calculate My Savings
                </Button>
              </div>
            </motion.div>

            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Projected Annual Savings</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Time Saved</span>
                    <span className="text-2xl font-bold text-green-600">1,400 hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Cost Savings</span>
                    <span className="text-2xl font-bold text-green-600">€49,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Error Reduction</span>
                    <span className="text-2xl font-bold text-green-600">95%</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">ROI</span>
                      <span className="text-3xl font-bold text-green-600">890%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 text-white">
                <h4 className="text-xl font-bold mb-2">Payback Period</h4>
                <div className="text-3xl font-bold mb-2">2.1 months</div>
                <p className="opacity-90">
                  DocuFlow AI pays for itself in just over 2 months, then continues saving you money every month after.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Additional Benefits</h4>
                <div className="space-y-3">
                  {[
                    "Improved employee satisfaction",
                    "Faster month-end closing",
                    "Better vendor relationships",
                    "Enhanced audit readiness",
                    "Scalable growth capacity",
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section id="features" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-8">Enterprise-Grade Features</h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
              Built for scale, security, and seamless integration with your existing systems.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12 mb-20">
            {[
              {
                icon: <Cpu className="w-8 h-8" />,
                title: "Advanced AI Engine",
                description:
                  "Our proprietary AI models are trained on 50M+ documents and continuously learn from your specific document types.",
                features: ["99.8% accuracy rate", "50+ document types", "25+ languages", "Custom model training"],
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Enterprise Security",
                description: "Bank-grade security with end-to-end encryption, SOC 2 compliance, and GDPR adherence built-in.",
                features: ["SOC 2 Type II certified", "GDPR compliant", "End-to-end encryption", "EU data centers"],
              },
              {
                icon: <Workflow className="w-8 h-8" />,
                title: "Seamless Integration",
                description: "Connect with 100+ business applications through our REST API and pre-built integrations.",
                features: ["REST API", "Webhook support", "100+ integrations", "Custom connectors"],
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6">
                  <div className="text-white">{feature.icon}</div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.features.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Zap className="w-6 h-6" />,
                title: "Lightning Processing",
                description: "Process 1000+ documents in under 5 minutes with our optimized AI pipeline.",
              },
              {
                icon: <Eye className="w-6 h-6" />,
                title: "Smart Validation",
                description: "Human-in-the-loop validation for critical documents ensures 100% accuracy.",
              },
              {
                icon: <Cloud className="w-6 h-6" />,
                title: "Cloud & On-Premise",
                description: "Deploy in the cloud or on your own infrastructure for maximum control.",
              },
              {
                icon: <Smartphone className="w-6 h-6" />,
                title: "Mobile Ready",
                description: "Process documents on-the-go with our mobile app and responsive interface.",
              },
              {
                icon: <Settings className="w-6 h-6" />,
                title: "Custom Workflows",
                description: "Build approval workflows and business rules tailored to your processes.",
              },
              {
                icon: <BarChart3 className="w-6 h-6" />,
                title: "Advanced Analytics",
                description: "Gain insights into processing times, accuracy rates, and cost savings.",
              },
              {
                icon: <Globe className="w-6 h-6" />,
                title: "Multi-Region Support",
                description: "Process documents from multiple countries with region-specific compliance.",
              },
              {
                icon: <Layers className="w-6 h-6" />,
                title: "Batch Processing",
                description: "Upload thousands of documents at once with intelligent batch processing.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <div className="text-blue-600">{feature.icon}</div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials */}
      <section className="py-32 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-8">Success Stories from Industry Leaders</h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
              See how companies across Europe are transforming their document processing with DocuFlow AI.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                quote:
                  "DocuFlow AI transformed our entire AP process. We went from 40 hours of manual work per week to just 4 hours. The ROI was immediate and the accuracy is phenomenal. Our team can now focus on strategic analysis instead of data entry.",
                author: "Sarah Chen",
                role: "CFO",
                company: "TechStart GmbH",
                location: "Berlin, Germany",
                metrics: { timeSaved: "90%", costReduction: "€75,000", accuracy: "99.9%" },
                logo: "TS",
              },
              {
                quote:
                  "The GDPR compliance was crucial for our healthcare organization. DocuFlow AI handles our sensitive patient data with complete security and transparency. We've processed over 100,000 documents without a single compliance issue.",
                author: "Dr. Michael Rodriguez",
                role: "IT Director",
                company: "MedCenter Amsterdam",
                location: "Amsterdam, Netherlands",
                metrics: { documents: "100K+", compliance: "100%", errors: "0" },
                logo: "MC",
              },
              {
                quote:
                  "As a growing fintech, we needed a solution that could scale with us. DocuFlow AI processes our invoices, contracts, and compliance documents seamlessly. It's like having a team of 10 data entry specialists working 24/7.",
                author: "Emma Thompson",
                role: "Head of Operations",
                company: "FinanceFlow Ltd",
                location: "London, UK",
                metrics: { scalability: "500%", uptime: "99.9%", satisfaction: "95%" },
                logo: "FF",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 text-lg leading-relaxed mb-8 italic">{`"${testimonial.quote}"`}</blockquote>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">{testimonial.logo}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.author}</div>
                    <div className="text-gray-600">{testimonial.role}</div>
                    <div className="text-gray-500 text-sm">
                      {testimonial.company} • {testimonial.location}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
                  {Object.entries(testimonial.metrics).map(([key, value], metricIndex) => (
                    <div key={metricIndex} className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{value}</div>
                      <div className="text-xs text-gray-500 capitalize">{key.replace(/([A-Z])/g, " $1")}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-white text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold mb-4">Join 2,500+ Companies Already Saving Time & Money</h3>
            <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
              From startups to Fortune 500 companies, businesses across Europe trust DocuFlow AI for their document processing
              needs.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="text-3xl font-bold">2,500+</div>
                <div className="opacity-80">Active Companies</div>
              </div>
              <div>
                <div className="text-3xl font-bold">50M+</div>
                <div className="opacity-80">Documents Processed</div>
              </div>
              <div>
                <div className="text-3xl font-bold">€2.5B+</div>
                <div className="opacity-80">In Cost Savings</div>
              </div>
              <div>
                <div className="text-3xl font-bold">99.8%</div>
                <div className="opacity-80">Customer Satisfaction</div>
              </div>
            </div>
            <Button size="lg" variant="secondary" className="text-blue-600">
              Read More Case Studies
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Pricing Section */}
      <section id="pricing" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-8">Transparent Pricing That Scales With You</h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto mb-8">
              Start free, upgrade when you need more. No hidden fees, no long-term contracts, no surprises.
            </p>
            <div className="inline-flex items-center bg-gray-100 rounded-2xl p-2">
              <button className="px-6 py-3 rounded-xl bg-white shadow-sm font-medium">Monthly</button>
              <button className="px-6 py-3 rounded-xl font-medium text-gray-600">
                Annual <Badge className="ml-2 bg-green-100 text-green-700">Save 20%</Badge>
              </button>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-8 mb-16">
            {[
              {
                name: "Starter",
                price: "Free",
                period: "forever",
                description: "Perfect for small teams getting started",
                features: [
                  "100 documents/month",
                  "Basic OCR accuracy (95%)",
                  "JSON/CSV export",
                  "Email support",
                  "GDPR compliant",
                  "Standard processing speed",
                ],
                cta: "Start Free",
                popular: false,
                color: "gray",
              },
              {
                name: "Professional",
                price: "€49",
                period: "per month",
                description: "For growing businesses with higher volume",
                features: [
                  "2,500 documents/month",
                  "Advanced OCR (99.5% accuracy)",
                  "API integrations",
                  "Priority support",
                  "Custom fields",
                  "Bulk processing",
                  "Advanced security",
                  "Workflow automation",
                ],
                cta: "Start 14-Day Trial",
                popular: true,
                color: "blue",
              },
              {
                name: "Business",
                price: "€149",
                period: "per month",
                description: "For established companies with complex needs",
                features: [
                  "10,000 documents/month",
                  "Premium OCR (99.8% accuracy)",
                  "Advanced integrations",
                  "Phone & chat support",
                  "Custom workflows",
                  "Multi-user management",
                  "Advanced analytics",
                  "SLA guarantees",
                  "Custom training",
                ],
                cta: "Start Trial",
                popular: false,
                color: "indigo",
              },
              {
                name: "Enterprise",
                price: "Custom",
                period: "pricing",
                description: "For large organizations with custom requirements",
                features: [
                  "Unlimited documents",
                  "Custom AI training",
                  "Dedicated support team",
                  "99.9% uptime SLA",
                  "On-premise deployment",
                  "Custom integrations",
                  "White-label options",
                  "Advanced security",
                  "Compliance reporting",
                ],
                cta: "Contact Sales",
                popular: false,
                color: "purple",
              },
            ].map((plan, index) => (
              <motion.div
                key={index}
                className={`relative ${plan.popular ? "lg:-mt-8" : ""}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card
                  className={`h-full relative ${
                    plan.popular
                      ? "border-blue-500 border-2 shadow-2xl scale-105"
                      : "border-gray-200 shadow-lg hover:shadow-xl transition-shadow"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-blue-600 text-white px-6 py-2 text-sm font-medium">Most Popular</Badge>
                    </div>
                  )}
                  <div className="text-center pb-4 p-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center bg-blue-100">
                      <div className="text-blue-600">
                        {plan.name === "Starter" && <Rocket className="w-8 h-8" />}
                        {plan.name === "Professional" && <Briefcase className="w-8 h-8" />}
                        {plan.name === "Business" && <Building2 className="w-8 h-8" />}
                        {plan.name === "Enterprise" && <Award className="w-8 h-8" />}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                    <div className="mt-4">
                      <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-600 ml-2 text-lg">{plan.period}</span>
                    </div>
                    <p className="mt-3 text-base text-gray-600">{plan.description}</p>
                  </div>
                  <div className="space-y-6 p-8 pt-0">
                    <ul className="space-y-4">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`w-full py-4 ${
                        plan.popular ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                      }`}
                      size="lg"
                    >
                      {plan.cta}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gray-600 mb-6 text-lg">
              All plans include GDPR compliance, 99.9% uptime SLA, and enterprise-grade security
            </p>
            <div className="flex justify-center items-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Lock className="w-4 h-4" />
                <span>SOC 2 Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>GDPR Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4" />
                <span>EU Data Centers</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4" />
                <span>ISO 27001</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-white text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold mb-4">Need a Custom Solution?</h3>
            <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
              {` Large enterprise with unique requirements? We'll create a custom package that fits your exact needs and budget.`}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-blue-600">
                <Calendar className="mr-2 w-5 h-5" />
                Schedule Consultation
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              >
                <Mail className="mr-2 w-5 h-5" />
                Contact Enterprise Sales
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources" className="py-32 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-8">Resources & Support</h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
              Everything you need to succeed with DocuFlow AI, from implementation to optimization.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: <BookOpen className="w-8 h-8" />,
                title: "Documentation & Guides",
                description: "Comprehensive guides, API documentation, and best practices.",
                items: ["Getting Started Guide", "API Reference", "Integration Tutorials", "Best Practices"],
                cta: "Browse Docs",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Expert Support",
                description: "Get help from our team of document processing experts.",
                items: ["24/7 Chat Support", "Phone Support", "Dedicated Success Manager", "Training Sessions"],
                cta: "Contact Support",
              },
              {
                icon: <Lightbulb className="w-8 h-8" />,
                title: "Learning Center",
                description: "Webinars, case studies, and industry insights to maximize your ROI.",
                items: ["Weekly Webinars", "Case Studies", "Industry Reports", "Video Tutorials"],
                cta: "Start Learning",
              },
            ].map((resource, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                  <div className="text-blue-600">{resource.icon}</div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{resource.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{resource.description}</p>
                <ul className="space-y-3 mb-8">
                  {resource.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full py-3">
                  {resource.cta}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </motion.div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              className="bg-white rounded-3xl p-8 shadow-lg"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Implementation Support</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Onboarding Call</h4>
                    <p className="text-gray-600 text-sm">Personalized setup session with our experts</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Custom Configuration</h4>
                    <p className="text-gray-600 text-sm">Tailored setup for your document types</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Team Training</h4>
                    <p className="text-gray-600 text-sm">Comprehensive training for your team</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold text-sm">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Go-Live Support</h4>
                    <p className="text-gray-600 text-sm">Dedicated support during your first month</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Success Metrics</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">Customer Satisfaction</span>
                    <span className="font-bold text-green-600">98.5%</span>
                  </div>
                  <Progress value={98.5} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">Implementation Success</span>
                    <span className="font-bold text-green-600">99.2%</span>
                  </div>
                  <Progress value={99.2} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">Support Response Time</span>
                    <span className="font-bold text-green-600">&lt; 2 hours</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">Average ROI</span>
                    <span className="font-bold text-green-600">650%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced FAQ Section */}
      <section id="faq" className="py-32 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
            <p className="text-2xl text-gray-600">Everything you need to know about DocuFlow AI</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <Accordion>
              {[
                {
                  question: "How accurate is the OCR and data extraction?",
                  answer:
                    "Our AI achieves 99.8% accuracy on standard business documents, which is industry-leading. For critical documents, we offer human-in-the-loop validation to ensure 100% accuracy. Our system continuously learns and improves from each document processed, and we provide accuracy guarantees with our Business and Enterprise plans.",
                },
                {
                  question: "Is my data secure and GDPR compliant?",
                  answer:
                    "Absolutely. We're SOC 2 Type II certified and fully GDPR compliant. All data is encrypted in transit and at rest using AES-256 encryption, stored in EU data centers, and automatically deleted according to your retention preferences. We never use your data to train our models, and you maintain full control over your data at all times. We also provide detailed audit logs and compliance reporting.",
                },
                {
                  question: "What document formats and languages do you support?",
                  answer:
                    "We support 50+ formats including PDF, JPEG, PNG, TIFF, DOCX, and even poor-quality scanned documents. Our AI can handle handwritten text, multiple languages (25+ including English, German, Dutch, French, Spanish, Italian), and various document layouts including invoices, receipts, contracts, forms, and custom documents. We can also train custom models for your specific document types.",
                },
                {
                  question: "How does the API integration work?",
                  answer:
                    "Our REST API is developer-friendly with comprehensive documentation and SDKs for popular programming languages. You can push extracted data directly to your ERP, accounting software, or database. We support webhooks for real-time notifications and have pre-built integrations with 100+ platforms including QuickBooks, Xero, SAP, Oracle, NetSuite, and more. Our technical team provides integration support.",
                },
                {
                  question: "Can I try it before committing to a paid plan?",
                  answer:
                    "Yes! Our Starter plan is free forever with 100 documents per month. For higher volumes, we offer a 14-day free trial of our Professional plan with no credit card required. You can also request a personalized demo to see how it works with your specific documents. Our sales team can provide a proof-of-concept with your actual documents.",
                },
                {
                  question: "What happens if I exceed my document limit?",
                  answer:
                    "We'll notify you when you're approaching your limit (at 80% and 95%). You can upgrade your plan anytime or purchase additional document packs. We never stop processing your documents unexpectedly—we'll always give you options to continue seamlessly. Overage rates are clearly defined and reasonable.",
                },
                {
                  question: "How long does implementation take?",
                  answer:
                    "Most customers are up and running within 1-2 weeks. Our implementation process includes: initial consultation (day 1), system configuration (days 2-5), team training (days 6-8), testing phase (days 9-12), and go-live support (days 13-14). Enterprise customers with complex requirements may take 4-6 weeks. We provide dedicated implementation support throughout the process.",
                },
                {
                  question: "Do you offer on-premise deployment?",
                  answer:
                    "Yes, we offer on-premise deployment for Enterprise customers who require it for compliance or security reasons. This includes the full DocuFlow AI platform deployed in your own infrastructure, with the same features and performance as our cloud solution. We provide installation, configuration, and ongoing support for on-premise deployments.",
                },
                {
                  question: "What kind of support do you provide?",
                  answer:
                    "We provide comprehensive support including: 24/7 chat support, phone support during business hours, dedicated success managers for Business and Enterprise customers, comprehensive documentation, video tutorials, weekly webinars, and training sessions. Enterprise customers get priority support with guaranteed response times and dedicated technical account managers.",
                },
                {
                  question: "Can you handle high-volume processing?",
                  answer:
                    "Absolutely. Our platform is built for scale and can process thousands of documents simultaneously. We've processed over 50 million documents for our customers. Our infrastructure auto-scales based on demand, ensuring consistent performance even during peak processing times. Enterprise customers can process unlimited documents with guaranteed processing speeds.",
                },
              ].map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  isOpen={openAccordion === `item-${index}`}
                  onToggle={() => toggleAccordion(`item-${index}`)}
                >
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Still have questions?</h3>
            <p className="text-gray-600 mb-8">Our team is here to help you find the perfect solution for your needs.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                <MessageSquare className="mr-2 w-5 h-5" />
                Chat with Sales
              </Button>
              <Button variant="outline" size="lg">
                <Calendar className="mr-2 w-5 h-5" />
                Schedule Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-6xl font-bold text-white mb-8">Ready to Transform Your Document Processing?</h2>
            <p className="text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
              {`Join 2,500+ finance teams who've already eliminated manual data entry and saved millions in processing costs. Start
              your free trial today—no credit card required, no setup fees, no risk.`}
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">14 Days</div>
                <div className="text-blue-100">Free Trial</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">5 Minutes</div>
                <div className="text-blue-100">Setup Time</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">99.8%</div>
                <div className="text-blue-100">Accuracy Guaranteed</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Button size="lg" variant="secondary" className="text-blue-600 text-xl px-12 py-8 shadow-xl">
                Start Free 14-Day Trial
                <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 text-xl px-12 py-8 bg-transparent"
              >
                <PlayCircle className="mr-3 w-6 h-6" />
                Watch Demo
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 text-blue-100">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>GDPR compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>24/7 support</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 mb-16">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-2xl font-bold">DocuFlow AI</span>
                  <div className="text-xs text-blue-400 font-medium">Enterprise OCR Platform</div>
                </div>
              </div>
              <p className="text-gray-400 mb-6 text-lg leading-relaxed">
                Transform your document processing with AI-powered OCR. Trusted by 2,500+ companies across Europe for accurate,
                secure, and scalable document automation.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">TW</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">LI</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">YT</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">GH</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-6 text-lg">Product</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    API Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Security
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Changelog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-6 text-lg">Solutions</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Finance Teams
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Healthcare
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Legal Firms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Logistics
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Enterprise
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Startups
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-6 text-lg">Company</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Press
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Partners
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-800 rounded-2xl p-6">
              <h4 className="font-semibold mb-4 flex items-center">
                <Phone className="w-5 h-5 mr-2 text-blue-400" />
                Contact Sales
              </h4>
              <p className="text-gray-400 mb-3">Ready to get started? Our sales team is here to help.</p>
              <p className="text-white font-medium">+49 30 12345678</p>
              <p className="text-gray-400 text-sm">Mon-Fri, 9:00-18:00 CET</p>
            </div>

            <div className="bg-gray-800 rounded-2xl p-6">
              <h4 className="font-semibold mb-4 flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 text-green-400" />
                24/7 Support
              </h4>
              <p className="text-gray-400 mb-3">Get help anytime with our round-the-clock support.</p>
              <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent">
                Start Chat
              </Button>
            </div>

            <div className="bg-gray-800 rounded-2xl p-6">
              <h4 className="font-semibold mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-red-400" />
                European Offices
              </h4>
              <p className="text-gray-400 mb-2">Berlin • Amsterdam • London</p>
              <p className="text-gray-400 text-sm">Serving customers across Europe</p>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-center">
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8 mb-6 lg:mb-0">
                <p className="text-gray-400 text-sm">© 2024 DocuFlow AI. All rights reserved.</p>
                <div className="flex space-x-6 text-sm text-gray-400">
                  <Link href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                  <Link href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                  <Link href="#" className="hover:text-white transition-colors">
                    Cookie Policy
                  </Link>
                  <Link href="#" className="hover:text-white transition-colors">
                    GDPR
                  </Link>
                </div>
              </div>
              <div className="flex items-center space-x-8 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>SOC 2 Certified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Lock className="w-4 h-4" />
                  <span>GDPR Compliant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4" />
                  <span>EU Hosted</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4" />
                  <span>ISO 27001</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// "use client";

// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Progress } from "@/components/ui/progress";
// import {
//   CheckCircle,
//   Clock,
//   FileText,
//   Zap,
//   Shield,
//   ArrowRight,
//   Star,
//   Database,
//   Workflow,
//   Globe,
//   Lock,
//   Users,
//   DollarSign,
//   BarChart3,
//   Award,
//   Briefcase,
//   Building2,
//   Calculator,
//   PlayCircle,
//   Mail,
//   Phone,
//   MapPin,
//   Calendar,
//   BookOpen,
//   FileCheck,
//   Layers,
//   Settings,
//   Smartphone,
//   Cloud,
//   Cpu,
//   Eye,
//   AlertTriangle,
//   Lightbulb,
//   Rocket,
//   HeartHandshake,
//   MessageSquare,
//   TrendingDown,
// } from "lucide-react";
// import Link from "next/link";

// export default function LandingPage() {
//   const [selectedPlan, setSelectedPlan] = useState("professional");
//   const [mounted, setMounted] = useState(false);
//   const [activeTab, setActiveTab] = useState("invoices");

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) {
//     return <div className="min-h-screen bg-white" />;
//   }

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Navigation */}
//       <nav className="border-b border-gray-100 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-20">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
//                 <FileText className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <span className="text-2xl font-bold text-gray-900">DocuFlow AI</span>
//                 <div className="text-xs text-blue-600 font-medium">Enterprise OCR Platform</div>
//               </div>
//             </div>
//             <div className="hidden lg:flex items-center space-x-8">
//               <Link href="#solutions" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
//                 Solutions
//               </Link>
//               <Link href="#features" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
//                 Features
//               </Link>
//               <Link href="#pricing" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
//                 Pricing
//               </Link>
//               <Link href="#resources" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
//                 Resources
//               </Link>
//               <Link href="#company" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
//                 Company
//               </Link>
//               <Button variant="outline" size="sm" className="font-medium bg-transparent">
//                 Sign In
//               </Button>
//               <Button size="sm" className="font-medium px-6">
//                 Start Free Trial
//               </Button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section - Much Larger */}
//       <section className="pt-24 pb-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
//         <div className="max-w-7xl mx-auto">
//           <motion.div
//             className="text-center max-w-5xl mx-auto"
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, staggerChildren: 0.15 }}
//           >
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.1 }}
//               className="mb-8"
//             >
//               <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm">
//                 <Zap className="w-4 h-4 mr-2" />
//                 #1 AI-Powered Document Processing Platform in Europe
//               </Badge>
//             </motion.div>

//             <motion.h1
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//               className="text-6xl md:text-8xl font-bold text-gray-900 mb-8 leading-tight"
//             >
//               Transform Your
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 block">
//                 Document Chaos
//               </span>
//               Into Structured Gold
//             </motion.h1>

//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.4 }}
//               className="text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed"
//             >
//               Stop losing €50,000+ annually to manual data entry. Our enterprise-grade AI extracts structured data from any
//               document in seconds—with 99.8% accuracy guaranteed. Trusted by 2,500+ finance teams across Europe.
//             </motion.p>

//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.6 }}
//               className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
//             >
//               <Button size="lg" className="text-xl px-12 py-8 rounded-xl shadow-lg hover:shadow-xl transition-all">
//                 Start Free 14-Day Trial
//                 <ArrowRight className="ml-3 w-6 h-6" />
//               </Button>
//               <Button
//                 variant="outline"
//                 size="lg"
//                 className="text-xl px-12 py-8 rounded-xl bg-white/80 backdrop-blur-sm hover:bg-white"
//               >
//                 <PlayCircle className="mr-3 w-6 h-6" />
//                 Watch 3-Min Demo
//               </Button>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.8 }}
//               className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-16"
//             >
//               <div>
//                 <div className="text-3xl font-bold text-blue-600">99.8%</div>
//                 <div className="text-gray-600">Accuracy Rate</div>
//               </div>
//               <div>
//                 <div className="text-3xl font-bold text-blue-600">2,500+</div>
//                 <div className="text-gray-600">Companies Trust Us</div>
//               </div>
//               <div>
//                 <div className="text-3xl font-bold text-blue-600">50M+</div>
//                 <div className="text-gray-600">Documents Processed</div>
//               </div>
//               <div>
//                 <div className="text-3xl font-bold text-blue-600">85%</div>
//                 <div className="text-gray-600">Time Savings</div>
//               </div>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 1.0 }}
//               className="text-sm text-gray-500 mb-12"
//             >
//               ✓ No credit card required ✓ GDPR & SOC 2 compliant ✓ 99.9% uptime SLA ✓ EU data centers
//             </motion.div>
//           </motion.div>

//           {/* Enhanced Hero Visual */}
//           <motion.div
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 1.2 }}
//             className="mt-20 relative"
//           >
//             <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 shadow-2xl">
//               <div className="grid lg:grid-cols-3 gap-12 items-center">
//                 <div className="space-y-6">
//                   <div className="bg-white rounded-2xl p-6 shadow-lg">
//                     <div className="flex items-center space-x-3 mb-4">
//                       <FileText className="w-6 h-6 text-gray-400" />
//                       <span className="text-gray-700 font-medium">invoice_Q4_2024.pdf</span>
//                       <Badge variant="secondary" className="text-xs">
//                         Processing...
//                       </Badge>
//                     </div>
//                     <div className="h-40 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center">
//                       <div className="text-center">
//                         <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
//                         <span className="text-gray-500">Document Preview</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex items-center justify-center">
//                   <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
//                     <ArrowRight className="w-8 h-8 text-white" />
//                   </div>
//                 </div>

//                 <div className="space-y-6">
//                   <div className="bg-white rounded-2xl p-6 shadow-lg">
//                     <div className="flex items-center space-x-3 mb-4">
//                       <Database className="w-6 h-6 text-green-500" />
//                       <span className="text-gray-700 font-medium">Extracted Data</span>
//                       <Badge className="bg-green-100 text-green-700 text-xs">Complete</Badge>
//                     </div>
//                     <div className="space-y-3 text-sm">
//                       <div className="flex justify-between p-2 bg-gray-50 rounded">
//                         <span className="text-gray-600">Invoice Number:</span>
//                         <span className="font-semibold">INV-2024-Q4-001</span>
//                       </div>
//                       <div className="flex justify-between p-2 bg-gray-50 rounded">
//                         <span className="text-gray-600">Total Amount:</span>
//                         <span className="font-semibold text-green-600">€12,450.00</span>
//                       </div>
//                       <div className="flex justify-between p-2 bg-gray-50 rounded">
//                         <span className="text-gray-600">Due Date:</span>
//                         <span className="font-semibold">2024-12-15</span>
//                       </div>
//                       <div className="flex justify-between p-2 bg-gray-50 rounded">
//                         <span className="text-gray-600">Vendor:</span>
//                         <span className="font-semibold">TechSupplier GmbH</span>
//                       </div>
//                       <div className="flex justify-between p-2 bg-gray-50 rounded">
//                         <span className="text-gray-600">VAT Rate:</span>
//                         <span className="font-semibold">19%</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Trust Signals Section */}
//       <section className="py-20 bg-white border-b border-gray-100">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             className="text-center mb-16"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-100px" }}
//             transition={{ duration: 0.6 }}
//           >
//             <p className="text-gray-600 text-lg mb-8">Trusted by leading companies across Europe</p>
//             <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center opacity-60">
//               <div className="text-2xl font-bold text-gray-400">Siemens</div>
//               <div className="text-2xl font-bold text-gray-400">BMW Group</div>
//               <div className="text-2xl font-bold text-gray-400">ING Bank</div>
//               <div className="text-2xl font-bold text-gray-400">Philips</div>
//               <div className="text-2xl font-bold text-gray-400">SAP</div>
//               <div className="text-2xl font-bold text-gray-400">Unilever</div>
//             </div>
//           </motion.div>

//           <div className="grid md:grid-cols-4 gap-8">
//             {[
//               { icon: <Award className="w-8 h-8" />, title: "SOC 2 Type II", subtitle: "Security Certified" },
//               { icon: <Shield className="w-8 h-8" />, title: "GDPR Compliant", subtitle: "EU Data Protection" },
//               { icon: <Globe className="w-8 h-8" />, title: "ISO 27001", subtitle: "Information Security" },
//               { icon: <Lock className="w-8 h-8" />, title: "99.9% Uptime", subtitle: "Enterprise SLA" },
//             ].map((item, index) => (
//               <motion.div
//                 key={index}
//                 className="text-center"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, margin: "-100px" }}
//                 transition={{ duration: 0.6, delay: index * 0.1 }}
//               >
//                 <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
//                   <div className="text-blue-600">{item.icon}</div>
//                 </div>
//                 <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
//                 <p className="text-gray-600 text-sm">{item.subtitle}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Pain Points Section - Enhanced */}
//       <section className="py-32 bg-gradient-to-br from-red-50 to-orange-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             className="text-center mb-20"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-100px" }}
//             transition={{ duration: 0.6 }}
//           >
//             <h2 className="text-5xl font-bold text-gray-900 mb-8">The Hidden Cost of Manual Document Processing</h2>
//             <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
//               Every minute your team spends on manual data entry is costing your business more than you realize. Here's the
//               painful reality most finance teams face daily.
//             </p>
//           </motion.div>

//           <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
//             <motion.div
//               initial={{ opacity: 0, x: -30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true, margin: "-100px" }}
//               transition={{ duration: 0.8 }}
//             >
//               <div className="bg-white rounded-3xl p-8 shadow-xl">
//                 <h3 className="text-3xl font-bold text-gray-900 mb-6">The Real Numbers</h3>
//                 <div className="space-y-6">
//                   <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl">
//                     <div className="flex items-center space-x-3">
//                       <Clock className="w-6 h-6 text-red-600" />
//                       <span className="font-medium">Time Lost Weekly</span>
//                     </div>
//                     <span className="text-2xl font-bold text-red-600">20+ hours</span>
//                   </div>
//                   <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl">
//                     <div className="flex items-center space-x-3">
//                       <DollarSign className="w-6 h-6 text-orange-600" />
//                       <span className="font-medium">Annual Cost per Employee</span>
//                     </div>
//                     <span className="text-2xl font-bold text-orange-600">€25,000</span>
//                   </div>
//                   <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-xl">
//                     <div className="flex items-center space-x-3">
//                       <AlertTriangle className="w-6 h-6 text-yellow-600" />
//                       <span className="font-medium">Error Rate</span>
//                     </div>
//                     <span className="text-2xl font-bold text-yellow-600">15-25%</span>
//                   </div>
//                   <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl">
//                     <div className="flex items-center space-x-3">
//                       <TrendingDown className="w-6 h-6 text-red-600" />
//                       <span className="font-medium">Employee Satisfaction</span>
//                     </div>
//                     <span className="text-2xl font-bold text-red-600">-40%</span>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, x: 30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true, margin: "-100px" }}
//               transition={{ duration: 0.8 }}
//               className="space-y-8"
//             >
//               {[
//                 {
//                   icon: <Clock className="w-8 h-8 text-red-600" />,
//                   title: "Endless Manual Data Entry",
//                   description:
//                     "Your skilled finance professionals spend 60% of their time typing numbers instead of analyzing them. That's €50,000+ in wasted salary per employee annually.",
//                 },
//                 {
//                   icon: <AlertTriangle className="w-8 h-8 text-orange-600" />,
//                   title: "Costly Human Errors",
//                   description:
//                     "A single mistyped invoice amount can cost thousands in reconciliation time, vendor disputes, and audit complications. Errors compound exponentially as volume grows.",
//                 },
//                 {
//                   icon: <TrendingDown className="w-8 h-8 text-yellow-600" />,
//                   title: "Impossible to Scale",
//                   description:
//                     "Your business is growing, but your document processing isn't. Adding more people isn't the answer—it's just more expensive and more error-prone.",
//                 },
//               ].map((item, index) => (
//                 <motion.div
//                   key={index}
//                   className="bg-white rounded-2xl p-6 shadow-lg"
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true, margin: "-100px" }}
//                   transition={{ duration: 0.6, delay: index * 0.1 }}
//                 >
//                   <div className="flex items-start space-x-4">
//                     <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center flex-shrink-0">
//                       {item.icon}
//                     </div>
//                     <div>
//                       <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
//                       <p className="text-gray-600 leading-relaxed">{item.description}</p>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </motion.div>
//           </div>

//           <motion.div
//             className="bg-gradient-to-r from-red-600 to-orange-600 rounded-3xl p-12 text-white text-center"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-100px" }}
//             transition={{ duration: 0.6 }}
//           >
//             <h3 className="text-3xl font-bold mb-4">Stop the Bleeding. Start Automating.</h3>
//             <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
//               Every day you delay automation is another day of lost productivity, frustrated employees, and missed opportunities.
//               The solution is here.
//             </p>
//             <Button size="lg" variant="secondary" className="text-red-600 text-lg px-8 py-6">
//               See How Much You're Losing
//               <Calculator className="ml-2 w-5 h-5" />
//             </Button>
//           </motion.div>
//         </div>
//       </section>

//       {/* Solutions by Industry */}
//       <section id="solutions" className="py-32 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             className="text-center mb-20"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-100px" }}
//             transition={{ duration: 0.6 }}
//           >
//             <h2 className="text-5xl font-bold text-gray-900 mb-8">Tailored Solutions for Every Industry</h2>
//             <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
//               DocuFlow AI adapts to your specific industry needs with pre-trained models and custom workflows.
//             </p>
//           </motion.div>

//           <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//             <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-12 h-auto p-2 bg-gray-100 rounded-2xl">
//               <TabsTrigger value="invoices" className="text-lg py-4 rounded-xl">
//                 <Briefcase className="w-5 h-5 mr-2" />
//                 Finance Teams
//               </TabsTrigger>
//               <TabsTrigger value="healthcare" className="text-lg py-4 rounded-xl">
//                 <HeartHandshake className="w-5 h-5 mr-2" />
//                 Healthcare
//               </TabsTrigger>
//               <TabsTrigger value="legal" className="text-lg py-4 rounded-xl">
//                 <FileCheck className="w-5 h-5 mr-2" />
//                 Legal Firms
//               </TabsTrigger>
//               <TabsTrigger value="logistics" className="text-lg py-4 rounded-xl">
//                 <Building2 className="w-5 h-5 mr-2" />
//                 Logistics
//               </TabsTrigger>
//             </TabsList>

//             <TabsContent value="invoices" className="space-y-8">
//               <div className="grid lg:grid-cols-2 gap-12 items-center">
//                 <div>
//                   <h3 className="text-3xl font-bold text-gray-900 mb-6">Finance & Accounting Teams</h3>
//                   <p className="text-xl text-gray-600 mb-8">
//                     Transform your AP/AR processes with intelligent invoice processing that understands complex financial
//                     documents.
//                   </p>
//                   <div className="space-y-4 mb-8">
//                     {[
//                       "Multi-currency invoice processing",
//                       "VAT/Tax calculation and validation",
//                       "PO matching and 3-way reconciliation",
//                       "ERP integration (SAP, Oracle, NetSuite)",
//                       "Approval workflow automation",
//                       "Audit trail and compliance reporting",
//                     ].map((feature, index) => (
//                       <div key={index} className="flex items-center space-x-3">
//                         <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
//                         <span className="text-gray-700">{feature}</span>
//                       </div>
//                     ))}
//                   </div>
//                   <Button size="lg" className="text-lg px-8 py-4">
//                     See Finance Demo
//                     <ArrowRight className="ml-2 w-5 h-5" />
//                   </Button>
//                 </div>
//                 <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8">
//                   <div className="bg-white rounded-2xl p-6 shadow-lg">
//                     <h4 className="font-semibold text-gray-900 mb-4">Sample Invoice Processing</h4>
//                     <div className="space-y-3 text-sm">
//                       <div className="grid grid-cols-2 gap-4">
//                         <div className="bg-gray-50 p-3 rounded">
//                           <div className="text-gray-600">Vendor</div>
//                           <div className="font-semibold">Microsoft Deutschland</div>
//                         </div>
//                         <div className="bg-gray-50 p-3 rounded">
//                           <div className="text-gray-600">Invoice #</div>
//                           <div className="font-semibold">MS-2024-Q4-1001</div>
//                         </div>
//                       </div>
//                       <div className="grid grid-cols-3 gap-4">
//                         <div className="bg-gray-50 p-3 rounded">
//                           <div className="text-gray-600">Net Amount</div>
//                           <div className="font-semibold">€8,400.00</div>
//                         </div>
//                         <div className="bg-gray-50 p-3 rounded">
//                           <div className="text-gray-600">VAT (19%)</div>
//                           <div className="font-semibold">€1,596.00</div>
//                         </div>
//                         <div className="bg-gray-50 p-3 rounded">
//                           <div className="text-gray-600">Total</div>
//                           <div className="font-semibold text-green-600">€9,996.00</div>
//                         </div>
//                       </div>
//                       <div className="bg-green-50 p-3 rounded border border-green-200">
//                         <div className="text-green-700 font-medium">✓ PO Match Confirmed</div>
//                         <div className="text-green-600 text-xs">Matched to PO-2024-0892</div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </TabsContent>

//             <TabsContent value="healthcare" className="space-y-8">
//               <div className="grid lg:grid-cols-2 gap-12 items-center">
//                 <div>
//                   <h3 className="text-3xl font-bold text-gray-900 mb-6">Healthcare & Medical</h3>
//                   <p className="text-xl text-gray-600 mb-8">
//                     Streamline patient records, insurance claims, and medical billing with HIPAA-compliant document processing.
//                   </p>
//                   <div className="space-y-4 mb-8">
//                     {[
//                       "Patient intake form processing",
//                       "Insurance claim automation",
//                       "Medical record digitization",
//                       "Prescription data extraction",
//                       "HIPAA compliance built-in",
//                       "EMR system integration",
//                     ].map((feature, index) => (
//                       <div key={index} className="flex items-center space-x-3">
//                         <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
//                         <span className="text-gray-700">{feature}</span>
//                       </div>
//                     ))}
//                   </div>
//                   <Button size="lg" className="text-lg px-8 py-4">
//                     Healthcare Demo
//                     <ArrowRight className="ml-2 w-5 h-5" />
//                   </Button>
//                 </div>
//                 <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8">
//                   <div className="bg-white rounded-2xl p-6 shadow-lg">
//                     <h4 className="font-semibold text-gray-900 mb-4">Patient Record Processing</h4>
//                     <div className="space-y-3 text-sm">
//                       <div className="bg-gray-50 p-3 rounded">
//                         <div className="text-gray-600">Patient ID</div>
//                         <div className="font-semibold">PAT-2024-001892</div>
//                       </div>
//                       <div className="grid grid-cols-2 gap-4">
//                         <div className="bg-gray-50 p-3 rounded">
//                           <div className="text-gray-600">Insurance Provider</div>
//                           <div className="font-semibold">AOK Bayern</div>
//                         </div>
//                         <div className="bg-gray-50 p-3 rounded">
//                           <div className="text-gray-600">Policy Number</div>
//                           <div className="font-semibold">AOK-789456123</div>
//                         </div>
//                       </div>
//                       <div className="bg-blue-50 p-3 rounded border border-blue-200">
//                         <div className="text-blue-700 font-medium">✓ HIPAA Compliant Processing</div>
//                         <div className="text-blue-600 text-xs">All data encrypted and anonymized</div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </TabsContent>

//             <TabsContent value="legal" className="space-y-8">
//               <div className="grid lg:grid-cols-2 gap-12 items-center">
//                 <div>
//                   <h3 className="text-3xl font-bold text-gray-900 mb-6">Legal & Law Firms</h3>
//                   <p className="text-xl text-gray-600 mb-8">
//                     Extract key information from contracts, legal documents, and case files with precision and confidentiality.
//                   </p>
//                   <div className="space-y-4 mb-8">
//                     {[
//                       "Contract clause extraction",
//                       "Legal document classification",
//                       "Case file organization",
//                       "Client billing automation",
//                       "Confidentiality guaranteed",
//                       "Legal database integration",
//                     ].map((feature, index) => (
//                       <div key={index} className="flex items-center space-x-3">
//                         <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
//                         <span className="text-gray-700">{feature}</span>
//                       </div>
//                     ))}
//                   </div>
//                   <Button size="lg" className="text-lg px-8 py-4">
//                     Legal Demo
//                     <ArrowRight className="ml-2 w-5 h-5" />
//                   </Button>
//                 </div>
//                 <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl p-8">
//                   <div className="bg-white rounded-2xl p-6 shadow-lg">
//                     <h4 className="font-semibold text-gray-900 mb-4">Contract Analysis</h4>
//                     <div className="space-y-3 text-sm">
//                       <div className="bg-gray-50 p-3 rounded">
//                         <div className="text-gray-600">Contract Type</div>
//                         <div className="font-semibold">Software License Agreement</div>
//                       </div>
//                       <div className="grid grid-cols-2 gap-4">
//                         <div className="bg-gray-50 p-3 rounded">
//                           <div className="text-gray-600">Term Length</div>
//                           <div className="font-semibold">3 Years</div>
//                         </div>
//                         <div className="bg-gray-50 p-3 rounded">
//                           <div className="text-gray-600">Auto-Renewal</div>
//                           <div className="font-semibold text-orange-600">Yes</div>
//                         </div>
//                       </div>
//                       <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
//                         <div className="text-yellow-700 font-medium">⚠ Key Clause Detected</div>
//                         <div className="text-yellow-600 text-xs">Termination notice required 90 days prior</div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </TabsContent>

//             <TabsContent value="logistics" className="space-y-8">
//               <div className="grid lg:grid-cols-2 gap-12 items-center">
//                 <div>
//                   <h3 className="text-3xl font-bold text-gray-900 mb-6">Logistics & Supply Chain</h3>
//                   <p className="text-xl text-gray-600 mb-8">
//                     Automate shipping documents, customs forms, and delivery receipts for seamless supply chain operations.
//                   </p>
//                   <div className="space-y-4 mb-8">
//                     {[
//                       "Bill of lading processing",
//                       "Customs documentation",
//                       "Delivery receipt automation",
//                       "Inventory tracking integration",
//                       "Multi-language support",
//                       "Real-time shipment updates",
//                     ].map((feature, index) => (
//                       <div key={index} className="flex items-center space-x-3">
//                         <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
//                         <span className="text-gray-700">{feature}</span>
//                       </div>
//                     ))}
//                   </div>
//                   <Button size="lg" className="text-lg px-8 py-4">
//                     Logistics Demo
//                     <ArrowRight className="ml-2 w-5 h-5" />
//                   </Button>
//                 </div>
//                 <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-8">
//                   <div className="bg-white rounded-2xl p-6 shadow-lg">
//                     <h4 className="font-semibold text-gray-900 mb-4">Shipping Document</h4>
//                     <div className="space-y-3 text-sm">
//                       <div className="grid grid-cols-2 gap-4">
//                         <div className="bg-gray-50 p-3 rounded">
//                           <div className="text-gray-600">Tracking #</div>
//                           <div className="font-semibold">DHL-789456123</div>
//                         </div>
//                         <div className="bg-gray-50 p-3 rounded">
//                           <div className="text-gray-600">Weight</div>
//                           <div className="font-semibold">24.5 kg</div>
//                         </div>
//                       </div>
//                       <div className="bg-gray-50 p-3 rounded">
//                         <div className="text-gray-600">Destination</div>
//                         <div className="font-semibold">Amsterdam, Netherlands</div>
//                       </div>
//                       <div className="bg-green-50 p-3 rounded border border-green-200">
//                         <div className="text-green-700 font-medium">✓ Customs Cleared</div>
//                         <div className="text-green-600 text-xs">All documentation verified</div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </TabsContent>
//           </Tabs>
//         </div>
//       </section>

//       {/* ROI Calculator Section */}
//       <section className="py-32 bg-gradient-to-br from-green-50 to-emerald-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             className="text-center mb-20"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-100px" }}
//             transition={{ duration: 0.6 }}
//           >
//             <h2 className="text-5xl font-bold text-gray-900 mb-8">Calculate Your ROI in 60 Seconds</h2>
//             <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
//               See exactly how much time and money DocuFlow AI will save your organization.
//             </p>
//           </motion.div>

//           <div className="grid lg:grid-cols-2 gap-16 items-center">
//             <motion.div
//               className="bg-white rounded-3xl p-8 shadow-xl"
//               initial={{ opacity: 0, x: -30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true, margin: "-100px" }}
//               transition={{ duration: 0.8 }}
//             >
//               <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Current Situation</h3>
//               <div className="space-y-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Documents processed monthly</label>
//                   <div className="relative">
//                     <input
//                       type="number"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="e.g., 1000"
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Average processing time per document (minutes)
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="number"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="e.g., 5"
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Average hourly rate (€)</label>
//                   <div className="relative">
//                     <input
//                       type="number"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       placeholder="e.g., 35"
//                     />
//                   </div>
//                 </div>
//                 <Button className="w-full text-lg py-4">
//                   <Calculator className="mr-2 w-5 h-5" />
//                   Calculate My Savings
//                 </Button>
//               </div>
//             </motion.div>

//             <motion.div
//               className="space-y-8"
//               initial={{ opacity: 0, x: 30 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true, margin: "-100px" }}
//               transition={{ duration: 0.8 }}
//             >
//               <div className="bg-white rounded-2xl p-6 shadow-lg">
//                 <h4 className="text-xl font-bold text-gray-900 mb-4">Projected Annual Savings</h4>
//                 <div className="space-y-4">
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-600">Time Saved</span>
//                     <span className="text-2xl font-bold text-green-600">1,400 hours</span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-600">Cost Savings</span>
//                     <span className="text-2xl font-bold text-green-600">€49,000</span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="text-gray-600">Error Reduction</span>
//                     <span className="text-2xl font-bold text-green-600">95%</span>
//                   </div>
//                   <div className="border-t pt-4">
//                     <div className="flex justify-between items-center">
//                       <span className="font-semibold">ROI</span>
//                       <span className="text-3xl font-bold text-green-600">890%</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 text-white">
//                 <h4 className="text-xl font-bold mb-2">Payback Period</h4>
//                 <div className="text-3xl font-bold mb-2">2.1 months</div>
//                 <p className="opacity-90">
//                   DocuFlow AI pays for itself in just over 2 months, then continues saving you money every month after.
//                 </p>
//               </div>

//               <div className="bg-white rounded-2xl p-6 shadow-lg">
//                 <h4 className="text-lg font-semibold text-gray-900 mb-4">Additional Benefits</h4>
//                 <div className="space-y-3">
//                   {[
//                     "Improved employee satisfaction",
//                     "Faster month-end closing",
//                     "Better vendor relationships",
//                     "Enhanced audit readiness",
//                     "Scalable growth capacity",
//                   ].map((benefit, index) => (
//                     <div key={index} className="flex items-center space-x-3">
//                       <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
//                       <span className="text-gray-700">{benefit}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Enhanced Features Section */}
//       <section id="features" className="py-32 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             className="text-center mb-20"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-100px" }}
//             transition={{ duration: 0.6 }}
//           >
//             <h2 className="text-5xl font-bold text-gray-900 mb-8">Enterprise-Grade Features</h2>
//             <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
//               Built for scale, security, and seamless integration with your existing systems.
//             </p>
//           </motion.div>

//           <div className="grid lg:grid-cols-3 gap-12 mb-20">
//             {[
//               {
//                 icon: <Cpu className="w-8 h-8" />,
//                 title: "Advanced AI Engine",
//                 description:
//                   "Our proprietary AI models are trained on 50M+ documents and continuously learn from your specific document types.",
//                 features: ["99.8% accuracy rate", "50+ document types", "25+ languages", "Custom model training"],
//               },
//               {
//                 icon: <Shield className="w-8 h-8" />,
//                 title: "Enterprise Security",
//                 description: "Bank-grade security with end-to-end encryption, SOC 2 compliance, and GDPR adherence built-in.",
//                 features: ["SOC 2 Type II certified", "GDPR compliant", "End-to-end encryption", "EU data centers"],
//               },
//               {
//                 icon: <Workflow className="w-8 h-8" />,
//                 title: "Seamless Integration",
//                 description: "Connect with 100+ business applications through our REST API and pre-built integrations.",
//                 features: ["REST API", "Webhook support", "100+ integrations", "Custom connectors"],
//               },
//             ].map((feature, index) => (
//               <motion.div
//                 key={index}
//                 className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, margin: "-100px" }}
//                 transition={{ duration: 0.6, delay: index * 0.1 }}
//               >
//                 <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6">
//                   <div className="text-white">{feature.icon}</div>
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
//                 <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
//                 <ul className="space-y-2">
//                   {feature.features.map((item, itemIndex) => (
//                     <li key={itemIndex} className="flex items-center space-x-3">
//                       <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
//                       <span className="text-gray-700 text-sm">{item}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </motion.div>
//             ))}
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {[
//               {
//                 icon: <Zap className="w-6 h-6" />,
//                 title: "Lightning Processing",
//                 description: "Process 1000+ documents in under 5 minutes with our optimized AI pipeline.",
//               },
//               {
//                 icon: <Eye className="w-6 h-6" />,
//                 title: "Smart Validation",
//                 description: "Human-in-the-loop validation for critical documents ensures 100% accuracy.",
//               },
//               {
//                 icon: <Cloud className="w-6 h-6" />,
//                 title: "Cloud & On-Premise",
//                 description: "Deploy in the cloud or on your own infrastructure for maximum control.",
//               },
//               {
//                 icon: <Smartphone className="w-6 h-6" />,
//                 title: "Mobile Ready",
//                 description: "Process documents on-the-go with our mobile app and responsive interface.",
//               },
//               {
//                 icon: <Settings className="w-6 h-6" />,
//                 title: "Custom Workflows",
//                 description: "Build approval workflows and business rules tailored to your processes.",
//               },
//               {
//                 icon: <BarChart3 className="w-6 h-6" />,
//                 title: "Advanced Analytics",
//                 description: "Gain insights into processing times, accuracy rates, and cost savings.",
//               },
//               {
//                 icon: <Globe className="w-6 h-6" />,
//                 title: "Multi-Region Support",
//                 description: "Process documents from multiple countries with region-specific compliance.",
//               },
//               {
//                 icon: <Layers className="w-6 h-6" />,
//                 title: "Batch Processing",
//                 description: "Upload thousands of documents at once with intelligent batch processing.",
//               },
//             ].map((feature, index) => (
//               <motion.div
//                 key={index}
//                 className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, margin: "-100px" }}
//                 transition={{ duration: 0.6, delay: index * 0.05 }}
//               >
//                 <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
//                   <div className="text-blue-600">{feature.icon}</div>
//                 </div>
//                 <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
//                 <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Enhanced Testimonials */}
//       <section className="py-32 bg-gradient-to-br from-gray-50 to-blue-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             className="text-center mb-20"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-100px" }}
//             transition={{ duration: 0.6 }}
//           >
//             <h2 className="text-5xl font-bold text-gray-900 mb-8">Success Stories from Industry Leaders</h2>
//             <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
//               See how companies across Europe are transforming their document processing with DocuFlow AI.
//             </p>
//           </motion.div>

//           <div className="grid lg:grid-cols-3 gap-8 mb-16">
//             {[
//               {
//                 quote:
//                   "DocuFlow AI transformed our entire AP process. We went from 40 hours of manual work per week to just 4 hours. The ROI was immediate and the accuracy is phenomenal. Our team can now focus on strategic analysis instead of data entry.",
//                 author: "Sarah Chen",
//                 role: "CFO",
//                 company: "TechStart GmbH",
//                 location: "Berlin, Germany",
//                 metrics: { timeSaved: "90%", costReduction: "€75,000", accuracy: "99.9%" },
//                 logo: "TS",
//               },
//               {
//                 quote:
//                   "The GDPR compliance was crucial for our healthcare organization. DocuFlow AI handles our sensitive patient data with complete security and transparency. We've processed over 100,000 documents without a single compliance issue.",
//                 author: "Dr. Michael Rodriguez",
//                 role: "IT Director",
//                 company: "MedCenter Amsterdam",
//                 location: "Amsterdam, Netherlands",
//                 metrics: { documents: "100K+", compliance: "100%", errors: "0" },
//                 logo: "MC",
//               },
//               {
//                 quote:
//                   "As a growing fintech, we needed a solution that could scale with us. DocuFlow AI processes our invoices, contracts, and compliance documents seamlessly. It's like having a team of 10 data entry specialists working 24/7.",
//                 author: "Emma Thompson",
//                 role: "Head of Operations",
//                 company: "FinanceFlow Ltd",
//                 location: "London, UK",
//                 metrics: { scalability: "500%", uptime: "99.9%", satisfaction: "95%" },
//                 logo: "FF",
//               },
//             ].map((testimonial, index) => (
//               <motion.div
//                 key={index}
//                 className="bg-white rounded-3xl p-8 shadow-xl"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, margin: "-100px" }}
//                 transition={{ duration: 0.6, delay: index * 0.1 }}
//               >
//                 <div className="flex mb-6">
//                   {[...Array(5)].map((_, i) => (
//                     <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
//                   ))}
//                 </div>
//                 <blockquote className="text-gray-700 text-lg leading-relaxed mb-8 italic">"{testimonial.quote}"</blockquote>
//                 <div className="flex items-center space-x-4 mb-6">
//                   <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
//                     <span className="text-white font-bold">{testimonial.logo}</span>
//                   </div>
//                   <div>
//                     <div className="font-semibold text-gray-900">{testimonial.author}</div>
//                     <div className="text-gray-600">{testimonial.role}</div>
//                     <div className="text-gray-500 text-sm">
//                       {testimonial.company} • {testimonial.location}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
//                   {Object.entries(testimonial.metrics).map(([key, value], metricIndex) => (
//                     <div key={metricIndex} className="text-center">
//                       <div className="text-2xl font-bold text-blue-600">{value}</div>
//                       <div className="text-xs text-gray-500 capitalize">{key.replace(/([A-Z])/g, " $1")}</div>
//                     </div>
//                   ))}
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           <motion.div
//             className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-white text-center"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-100px" }}
//             transition={{ duration: 0.6 }}
//           >
//             <h3 className="text-3xl font-bold mb-4">Join 2,500+ Companies Already Saving Time & Money</h3>
//             <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
//               From startups to Fortune 500 companies, businesses across Europe trust DocuFlow AI for their document processing
//               needs.
//             </p>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
//               <div>
//                 <div className="text-3xl font-bold">2,500+</div>
//                 <div className="opacity-80">Active Companies</div>
//               </div>
//               <div>
//                 <div className="text-3xl font-bold">50M+</div>
//                 <div className="opacity-80">Documents Processed</div>
//               </div>
//               <div>
//                 <div className="text-3xl font-bold">€2.5B+</div>
//                 <div className="opacity-80">In Cost Savings</div>
//               </div>
//               <div>
//                 <div className="text-3xl font-bold">99.8%</div>
//                 <div className="opacity-80">Customer Satisfaction</div>
//               </div>
//             </div>
//             <Button size="lg" variant="secondary" className="text-blue-600 text-lg px-8 py-4">
//               Read More Case Studies
//               <ArrowRight className="ml-2 w-5 h-5" />
//             </Button>
//           </motion.div>
//         </div>
//       </section>

//       {/* Enhanced Pricing Section */}
//       <section id="pricing" className="py-32 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             className="text-center mb-20"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-100px" }}
//             transition={{ duration: 0.6 }}
//           >
//             <h2 className="text-5xl font-bold text-gray-900 mb-8">Transparent Pricing That Scales With You</h2>
//             <p className="text-2xl text-gray-600 max-w-4xl mx-auto mb-8">
//               Start free, upgrade when you need more. No hidden fees, no long-term contracts, no surprises.
//             </p>
//             <div className="inline-flex items-center bg-gray-100 rounded-2xl p-2">
//               <button className="px-6 py-3 rounded-xl bg-white shadow-sm font-medium">Monthly</button>
//               <button className="px-6 py-3 rounded-xl font-medium text-gray-600">
//                 Annual <Badge className="ml-2 bg-green-100 text-green-700">Save 20%</Badge>
//               </button>
//             </div>
//           </motion.div>

//           <div className="grid lg:grid-cols-4 gap-8 mb-16">
//             {[
//               {
//                 name: "Starter",
//                 price: "Free",
//                 period: "forever",
//                 description: "Perfect for small teams getting started",
//                 features: [
//                   "100 documents/month",
//                   "Basic OCR accuracy (95%)",
//                   "JSON/CSV export",
//                   "Email support",
//                   "GDPR compliant",
//                   "Standard processing speed",
//                 ],
//                 cta: "Start Free",
//                 popular: false,
//                 color: "gray",
//               },
//               {
//                 name: "Professional",
//                 price: "€49",
//                 period: "per month",
//                 description: "For growing businesses with higher volume",
//                 features: [
//                   "2,500 documents/month",
//                   "Advanced OCR (99.5% accuracy)",
//                   "API integrations",
//                   "Priority support",
//                   "Custom fields",
//                   "Bulk processing",
//                   "Advanced security",
//                   "Workflow automation",
//                 ],
//                 cta: "Start 14-Day Trial",
//                 popular: true,
//                 color: "blue",
//               },
//               {
//                 name: "Business",
//                 price: "€149",
//                 period: "per month",
//                 description: "For established companies with complex needs",
//                 features: [
//                   "10,000 documents/month",
//                   "Premium OCR (99.8% accuracy)",
//                   "Advanced integrations",
//                   "Phone & chat support",
//                   "Custom workflows",
//                   "Multi-user management",
//                   "Advanced analytics",
//                   "SLA guarantees",
//                   "Custom training",
//                 ],
//                 cta: "Start Trial",
//                 popular: false,
//                 color: "indigo",
//               },
//               {
//                 name: "Enterprise",
//                 price: "Custom",
//                 period: "pricing",
//                 description: "For large organizations with custom requirements",
//                 features: [
//                   "Unlimited documents",
//                   "Custom AI training",
//                   "Dedicated support team",
//                   "99.9% uptime SLA",
//                   "On-premise deployment",
//                   "Custom integrations",
//                   "White-label options",
//                   "Advanced security",
//                   "Compliance reporting",
//                 ],
//                 cta: "Contact Sales",
//                 popular: false,
//                 color: "purple",
//               },
//             ].map((plan, index) => (
//               <motion.div
//                 key={index}
//                 className={`relative ${plan.popular ? "lg:-mt-8" : ""}`}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, margin: "-100px" }}
//                 transition={{ duration: 0.6, delay: index * 0.1 }}
//               >
//                 <Card
//                   className={`h-full relative ${
//                     plan.popular
//                       ? "border-blue-500 border-2 shadow-2xl scale-105"
//                       : "border-gray-200 shadow-lg hover:shadow-xl transition-shadow"
//                   }`}
//                 >
//                   {plan.popular && (
//                     <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
//                       <Badge className="bg-blue-600 text-white px-6 py-2 text-sm font-medium">Most Popular</Badge>
//                     </div>
//                   )}
//                   <CardHeader className="text-center pb-4">
//                     <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center bg-${plan.color}-100`}>
//                       <div className={`text-${plan.color}-600`}>
//                         {plan.name === "Starter" && <Rocket className="w-8 h-8" />}
//                         {plan.name === "Professional" && <Briefcase className="w-8 h-8" />}
//                         {plan.name === "Business" && <Building2 className="w-8 h-8" />}
//                         {plan.name === "Enterprise" && <Award className="w-8 h-8" />}
//                       </div>
//                     </div>
//                     <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
//                     <div className="mt-4">
//                       <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
//                       <span className="text-gray-600 ml-2 text-lg">{plan.period}</span>
//                     </div>
//                     <CardDescription className="mt-3 text-base">{plan.description}</CardDescription>
//                   </CardHeader>
//                   <CardContent className="space-y-6">
//                     <ul className="space-y-4">
//                       {plan.features.map((feature, featureIndex) => (
//                         <li key={featureIndex} className="flex items-start space-x-3">
//                           <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
//                           <span className="text-gray-700">{feature}</span>
//                         </li>
//                       ))}
//                     </ul>
//                     <Button
//                       className={`w-full text-lg py-4 ${
//                         plan.popular ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-900"
//                       }`}
//                       size="lg"
//                     >
//                       {plan.cta}
//                     </Button>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </div>

//           <motion.div
//             className="text-center mb-12"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-100px" }}
//             transition={{ duration: 0.6 }}
//           >
//             <p className="text-gray-600 mb-6 text-lg">
//               All plans include GDPR compliance, 99.9% uptime SLA, and enterprise-grade security
//             </p>
//             <div className="flex justify-center items-center space-x-8 text-sm text-gray-500">
//               <div className="flex items-center space-x-2">
//                 <Lock className="w-4 h-4" />
//                 <span>SOC 2 Certified</span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <Shield className="w-4 h-4" />
//                 <span>GDPR Compliant</span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <Globe className="w-4 h-4" />
//                 <span>EU Data Centers</span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <Award className="w-4 h-4" />
//                 <span>ISO 27001</span>
//               </div>
//             </div>
//           </motion.div>

//           <motion.div
//             className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-white text-center"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-100px" }}
//             transition={{ duration: 0.6 }}
//           >
//             <h3 className="text-3xl font-bold mb-4">Need a Custom Solution?</h3>
//             <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
//               Large enterprise with unique requirements? We'll create a custom package that fits your exact needs and budget.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Button size="lg" variant="secondary" className="text-blue-600 text-lg px-8 py-4">
//                 <Calendar className="mr-2 w-5 h-5" />
//                 Schedule Consultation
//               </Button>
//               <Button
//                 size="lg"
//                 variant="outline"
//                 className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4 bg-transparent"
//               >
//                 <Mail className="mr-2 w-5 h-5" />
//                 Contact Enterprise Sales
//               </Button>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Resources Section */}
//       <section id="resources" className="py-32 bg-gradient-to-br from-gray-50 to-blue-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             className="text-center mb-20"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-100px" }}
//             transition={{ duration: 0.6 }}
//           >
//             <h2 className="text-5xl font-bold text-gray-900 mb-8">Resources & Support</h2>
//             <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
//               Everything you need to succeed with DocuFlow AI, from implementation to optimization.
//             </p>
//           </motion.div>

//           <div className="grid lg:grid-cols-3 gap-8 mb-16">
//             {[
//               {
//                 icon: <BookOpen className="w-8 h-8" />,
//                 title: "Documentation & Guides",
//                 description: "Comprehensive guides, API documentation, and best practices.",
//                 items: ["Getting Started Guide", "API Reference", "Integration Tutorials", "Best Practices"],
//                 cta: "Browse Docs",
//               },
//               {
//                 icon: <Users className="w-8 h-8" />,
//                 title: "Expert Support",
//                 description: "Get help from our team of document processing experts.",
//                 items: ["24/7 Chat Support", "Phone Support", "Dedicated Success Manager", "Training Sessions"],
//                 cta: "Contact Support",
//               },
//               {
//                 icon: <Lightbulb className="w-8 h-8" />,
//                 title: "Learning Center",
//                 description: "Webinars, case studies, and industry insights to maximize your ROI.",
//                 items: ["Weekly Webinars", "Case Studies", "Industry Reports", "Video Tutorials"],
//                 cta: "Start Learning",
//               },
//             ].map((resource, index) => (
//               <motion.div
//                 key={index}
//                 className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, margin: "-100px" }}
//                 transition={{ duration: 0.6, delay: index * 0.1 }}
//               >
//                 <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
//                   <div className="text-blue-600">{resource.icon}</div>
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-900 mb-4">{resource.title}</h3>
//                 <p className="text-gray-600 mb-6 leading-relaxed">{resource.description}</p>
//                 <ul className="space-y-3 mb-8">
//                   {resource.items.map((item, itemIndex) => (
//                     <li key={itemIndex} className="flex items-center space-x-3">
//                       <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
//                       <span className="text-gray-700">{item}</span>
//                     </li>
//                   ))}
//                 </ul>
//                 <Button className="w-full text-lg py-3">
//                   {resource.cta}
//                   <ArrowRight className="ml-2 w-4 h-4" />
//                 </Button>
//               </motion.div>
//             ))}
//           </div>

//           <div className="grid md:grid-cols-2 gap-8">
//             <motion.div
//               className="bg-white rounded-3xl p-8 shadow-lg"
//               initial={{ opacity: 0, x: -20 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true, margin: "-100px" }}
//               transition={{ duration: 0.6 }}
//             >
//               <h3 className="text-2xl font-bold text-gray-900 mb-6">Implementation Support</h3>
//               <div className="space-y-4">
//                 <div className="flex items-start space-x-4">
//                   <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
//                     <span className="text-blue-600 font-bold text-sm">1</span>
//                   </div>
//                   <div>
//                     <h4 className="font-semibold text-gray-900">Onboarding Call</h4>
//                     <p className="text-gray-600 text-sm">Personalized setup session with our experts</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start space-x-4">
//                   <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
//                     <span className="text-blue-600 font-bold text-sm">2</span>
//                   </div>
//                   <div>
//                     <h4 className="font-semibold text-gray-900">Custom Configuration</h4>
//                     <p className="text-gray-600 text-sm">Tailored setup for your document types</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start space-x-4">
//                   <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
//                     <span className="text-blue-600 font-bold text-sm">3</span>
//                   </div>
//                   <div>
//                     <h4 className="font-semibold text-gray-900">Team Training</h4>
//                     <p className="text-gray-600 text-sm">Comprehensive training for your team</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start space-x-4">
//                   <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
//                     <span className="text-blue-600 font-bold text-sm">4</span>
//                   </div>
//                   <div>
//                     <h4 className="font-semibold text-gray-900">Go-Live Support</h4>
//                     <p className="text-gray-600 text-sm">Dedicated support during your first month</p>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>

//             <motion.div
//               className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8"
//               initial={{ opacity: 0, x: 20 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true, margin: "-100px" }}
//               transition={{ duration: 0.6 }}
//             >
//               <h3 className="text-2xl font-bold text-gray-900 mb-6">Success Metrics</h3>
//               <div className="space-y-6">
//                 <div>
//                   <div className="flex justify-between items-center mb-2">
//                     <span className="text-gray-700">Customer Satisfaction</span>
//                     <span className="font-bold text-green-600">98.5%</span>
//                   </div>
//                   <Progress value={98.5} className="h-2" />
//                 </div>
//                 <div>
//                   <div className="flex justify-between items-center mb-2">
//                     <span className="text-gray-700">Implementation Success</span>
//                     <span className="font-bold text-green-600">99.2%</span>
//                   </div>
//                   <Progress value={99.2} className="h-2" />
//                 </div>
//                 <div>
//                   <div className="flex justify-between items-center mb-2">
//                     <span className="text-gray-700">Support Response Time</span>
//                     <span className="font-bold text-green-600">&lt; 2 hours</span>
//                   </div>
//                 </div>
//                 <div>
//                   <div className="flex justify-between items-center mb-2">
//                     <span className="text-gray-700">Average ROI</span>
//                     <span className="font-bold text-green-600">650%</span>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Enhanced FAQ Section */}
//       <section id="faq" className="py-32 bg-white">
//         <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             className="text-center mb-20"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-100px" }}
//             transition={{ duration: 0.6 }}
//           >
//             <h2 className="text-5xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
//             <p className="text-2xl text-gray-600">Everything you need to know about DocuFlow AI</p>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-100px" }}
//             transition={{ duration: 0.6 }}
//           >
//             <Accordion type="single" collapsible className="space-y-6">
//               {[
//                 {
//                   question: "How accurate is the OCR and data extraction?",
//                   answer:
//                     "Our AI achieves 99.8% accuracy on standard business documents, which is industry-leading. For critical documents, we offer human-in-the-loop validation to ensure 100% accuracy. Our system continuously learns and improves from each document processed, and we provide accuracy guarantees with our Business and Enterprise plans.",
//                 },
//                 {
//                   question: "Is my data secure and GDPR compliant?",
//                   answer:
//                     "Absolutely. We're SOC 2 Type II certified and fully GDPR compliant. All data is encrypted in transit and at rest using AES-256 encryption, stored in EU data centers, and automatically deleted according to your retention preferences. We never use your data to train our models, and you maintain full control over your data at all times. We also provide detailed audit logs and compliance reporting.",
//                 },
//                 {
//                   question: "What document formats and languages do you support?",
//                   answer:
//                     "We support 50+ formats including PDF, JPEG, PNG, TIFF, DOCX, and even poor-quality scanned documents. Our AI can handle handwritten text, multiple languages (25+ including English, German, Dutch, French, Spanish, Italian), and various document layouts including invoices, receipts, contracts, forms, and custom documents. We can also train custom models for your specific document types.",
//                 },
//                 {
//                   question: "How does the API integration work?",
//                   answer:
//                     "Our REST API is developer-friendly with comprehensive documentation and SDKs for popular programming languages. You can push extracted data directly to your ERP, accounting software, or database. We support webhooks for real-time notifications and have pre-built integrations with 100+ platforms including QuickBooks, Xero, SAP, Oracle, NetSuite, and more. Our technical team provides integration support.",
//                 },
//                 {
//                   question: "Can I try it before committing to a paid plan?",
//                   answer:
//                     "Yes! Our Starter plan is free forever with 100 documents per month. For higher volumes, we offer a 14-day free trial of our Professional plan with no credit card required. You can also request a personalized demo to see how it works with your specific documents. Our sales team can provide a proof-of-concept with your actual documents.",
//                 },
//                 {
//                   question: "What happens if I exceed my document limit?",
//                   answer:
//                     "We'll notify you when you're approaching your limit (at 80% and 95%). You can upgrade your plan anytime or purchase additional document packs. We never stop processing your documents unexpectedly—we'll always give you options to continue seamlessly. Overage rates are clearly defined and reasonable.",
//                 },
//                 {
//                   question: "How long does implementation take?",
//                   answer:
//                     "Most customers are up and running within 1-2 weeks. Our implementation process includes: initial consultation (day 1), system configuration (days 2-5), team training (days 6-8), testing phase (days 9-12), and go-live support (days 13-14). Enterprise customers with complex requirements may take 4-6 weeks. We provide dedicated implementation support throughout the process.",
//                 },
//                 {
//                   question: "Do you offer on-premise deployment?",
//                   answer:
//                     "Yes, we offer on-premise deployment for Enterprise customers who require it for compliance or security reasons. This includes the full DocuFlow AI platform deployed in your own infrastructure, with the same features and performance as our cloud solution. We provide installation, configuration, and ongoing support for on-premise deployments.",
//                 },
//                 {
//                   question: "What kind of support do you provide?",
//                   answer:
//                     "We provide comprehensive support including: 24/7 chat support, phone support during business hours, dedicated success managers for Business and Enterprise customers, comprehensive documentation, video tutorials, weekly webinars, and training sessions. Enterprise customers get priority support with guaranteed response times and dedicated technical account managers.",
//                 },
//                 {
//                   question: "Can you handle high-volume processing?",
//                   answer:
//                     "Absolutely. Our platform is built for scale and can process thousands of documents simultaneously. We've processed over 50 million documents for our customers. Our infrastructure auto-scales based on demand, ensuring consistent performance even during peak processing times. Enterprise customers can process unlimited documents with guaranteed processing speeds.",
//                 },
//               ].map((faq, index) => (
//                 <AccordionItem
//                   key={index}
//                   value={`item-${index}`}
//                   className="border border-gray-200 rounded-2xl px-8 py-2 shadow-sm hover:shadow-md transition-shadow"
//                 >
//                   <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600 text-lg py-6">
//                     {faq.question}
//                   </AccordionTrigger>
//                   <AccordionContent className="text-gray-600 pt-2 pb-6 text-base leading-relaxed">{faq.answer}</AccordionContent>
//                 </AccordionItem>
//               ))}
//             </Accordion>
//           </motion.div>

//           <motion.div
//             className="text-center mt-16"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             <h3 className="text-2xl font-bold text-gray-900 mb-4">Still have questions?</h3>
//             <p className="text-gray-600 mb-8">Our team is here to help you find the perfect solution for your needs.</p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Button size="lg" className="text-lg px-8 py-4">
//                 <MessageSquare className="mr-2 w-5 h-5" />
//                 Chat with Sales
//               </Button>
//               <Button variant="outline" size="lg" className="text-lg px-8 py-4 bg-transparent">
//                 <Calendar className="mr-2 w-5 h-5" />
//                 Schedule Demo
//               </Button>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Final CTA Section */}
//       <section className="py-32 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
//         <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-100px" }}
//             transition={{ duration: 0.6 }}
//           >
//             <h2 className="text-6xl font-bold text-white mb-8">Ready to Transform Your Document Processing?</h2>
//             <p className="text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
//               Join 2,500+ finance teams who've already eliminated manual data entry and saved millions in processing costs. Start
//               your free trial today—no credit card required, no setup fees, no risk.
//             </p>

//             <div className="grid md:grid-cols-3 gap-8 mb-12">
//               <div className="text-center">
//                 <div className="text-4xl font-bold text-white mb-2">14 Days</div>
//                 <div className="text-blue-100">Free Trial</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-4xl font-bold text-white mb-2">5 Minutes</div>
//                 <div className="text-blue-100">Setup Time</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-4xl font-bold text-white mb-2">99.8%</div>
//                 <div className="text-blue-100">Accuracy Guaranteed</div>
//               </div>
//             </div>

//             <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
//               <Button size="lg" variant="secondary" className="text-blue-600 text-xl px-12 py-8 rounded-2xl shadow-xl">
//                 Start Free 14-Day Trial
//                 <ArrowRight className="ml-3 w-6 h-6" />
//               </Button>
//               <Button
//                 size="lg"
//                 variant="outline"
//                 className="border-white text-white hover:bg-white hover:text-blue-600 text-xl px-12 py-8 rounded-2xl bg-transparent"
//               >
//                 <PlayCircle className="mr-3 w-6 h-6" />
//                 Watch Demo
//               </Button>
//             </div>

//             <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 text-blue-100">
//               <div className="flex items-center space-x-2">
//                 <CheckCircle className="w-5 h-5" />
//                 <span>No credit card required</span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <CheckCircle className="w-5 h-5" />
//                 <span>Cancel anytime</span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <CheckCircle className="w-5 h-5" />
//                 <span>GDPR compliant</span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <CheckCircle className="w-5 h-5" />
//                 <span>24/7 support</span>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Enhanced Footer */}
//       <footer className="bg-gray-900 text-white py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid lg:grid-cols-5 gap-12 mb-16">
//             <div className="lg:col-span-2">
//               <div className="flex items-center space-x-3 mb-6">
//                 <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
//                   <FileText className="w-6 h-6 text-white" />
//                 </div>
//                 <div>
//                   <span className="text-2xl font-bold">DocuFlow AI</span>
//                   <div className="text-xs text-blue-400 font-medium">Enterprise OCR Platform</div>
//                 </div>
//               </div>
//               <p className="text-gray-400 mb-6 text-lg leading-relaxed">
//                 Transform your document processing with AI-powered OCR. Trusted by 2,500+ companies across Europe for accurate,
//                 secure, and scalable document automation.
//               </p>
//               <div className="flex space-x-4">
//                 <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
//                   <span className="text-sm font-bold">TW</span>
//                 </div>
//                 <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
//                   <span className="text-sm font-bold">LI</span>
//                 </div>
//                 <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
//                   <span className="text-sm font-bold">YT</span>
//                 </div>
//                 <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
//                   <span className="text-sm font-bold">GH</span>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <h3 className="font-semibold mb-6 text-lg">Product</h3>
//               <ul className="space-y-3 text-gray-400">
//                 <li>
//                   <Link href="#" className="hover:text-white transition-colors">
//                     Features
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="hover:text-white transition-colors">
//                     Pricing
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="hover:text-white transition-colors">
//                     API Documentation
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="hover:text-white transition-colors">
//                     Integrations
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="hover:text-white transition-colors">
//                     Security
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="hover:text-white transition-colors">
//                     Changelog
//                   </Link>
//                 </li>
//               </ul>
//             </div>

//             <div>
//               <h3 className="font-semibold mb-6 text-lg">Solutions</h3>
//               <ul className="space-y-3 text-gray-400">
//                 <li>
//                   <Link href="#" className="hover:text-white transition-colors">
//                     Finance Teams
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="hover:text-white transition-colors">
//                     Healthcare
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="hover:text-white transition-colors">
//                     Legal Firms
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="hover:text-white transition-colors">
//                     Logistics
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="hover:text-white transition-colors">
//                     Enterprise
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="hover:text-white transition-colors">
//                     Startups
//                   </Link>
//                 </li>
//               </ul>
//             </div>

//             <div>
//               <h3 className="font-semibold mb-6 text-lg">Company</h3>
//               <ul className="space-y-3 text-gray-400">
//                 <li>
//                   <Link href="#" className="hover:text-white transition-colors">
//                     About Us
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="hover:text-white transition-colors">
//                     Blog
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="hover:text-white transition-colors">
//                     Careers
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="hover:text-white transition-colors">
//                     Press
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="hover:text-white transition-colors">
//                     Partners
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="hover:text-white transition-colors">
//                     Contact
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8 mb-12">
//             <div className="bg-gray-800 rounded-2xl p-6">
//               <h4 className="font-semibold mb-4 flex items-center">
//                 <Phone className="w-5 h-5 mr-2 text-blue-400" />
//                 Contact Sales
//               </h4>
//               <p className="text-gray-400 mb-3">Ready to get started? Our sales team is here to help.</p>
//               <p className="text-white font-medium">+49 30 12345678</p>
//               <p className="text-gray-400 text-sm">Mon-Fri, 9:00-18:00 CET</p>
//             </div>

//             <div className="bg-gray-800 rounded-2xl p-6">
//               <h4 className="font-semibold mb-4 flex items-center">
//                 <MessageSquare className="w-5 h-5 mr-2 text-green-400" />
//                 24/7 Support
//               </h4>
//               <p className="text-gray-400 mb-3">Get help anytime with our round-the-clock support.</p>
//               <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent">
//                 Start Chat
//               </Button>
//             </div>

//             <div className="bg-gray-800 rounded-2xl p-6">
//               <h4 className="font-semibold mb-4 flex items-center">
//                 <MapPin className="w-5 h-5 mr-2 text-red-400" />
//                 European Offices
//               </h4>
//               <p className="text-gray-400 mb-2">Berlin • Amsterdam • London</p>
//               <p className="text-gray-400 text-sm">Serving customers across Europe</p>
//             </div>
//           </div>

//           <div className="border-t border-gray-800 pt-8">
//             <div className="flex flex-col lg:flex-row justify-between items-center">
//               <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8 mb-6 lg:mb-0">
//                 <p className="text-gray-400 text-sm">© 2024 DocuFlow AI. All rights reserved.</p>
//                 <div className="flex space-x-6 text-sm text-gray-400">
//                   <Link href="#" className="hover:text-white transition-colors">
//                     Privacy Policy
//                   </Link>
//                   <Link href="#" className="hover:text-white transition-colors">
//                     Terms of Service
//                   </Link>
//                   <Link href="#" className="hover:text-white transition-colors">
//                     Cookie Policy
//                   </Link>
//                   <Link href="#" className="hover:text-white transition-colors">
//                     GDPR
//                   </Link>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-8 text-sm text-gray-400">
//                 <div className="flex items-center space-x-2">
//                   <Shield className="w-4 h-4" />
//                   <span>SOC 2 Certified</span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Lock className="w-4 h-4" />
//                   <span>GDPR Compliant</span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Globe className="w-4 h-4" />
//                   <span>EU Hosted</span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Award className="w-4 h-4" />
//                   <span>ISO 27001</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }
