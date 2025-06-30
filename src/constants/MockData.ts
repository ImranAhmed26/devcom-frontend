import { FileText, Clock, CheckCircle, TrendingUp } from "lucide-react"

export const documents = [
  {
    id: 1,
    name: "Invoice_2024_001.pdf",
    status: "completed",
    accuracy: "99.2%",
    pages: 3,
    processedAt: "2 hours ago",
    extractedText: "Invoice #INV-2024-001\nDate: January 15, 2024\nAmount: $1,250.00",
  },
  {
    id: 2,
    name: "Receipt_grocery.jpg",
    status: "processing",
    accuracy: "-",
    pages: 1,
    processedAt: "Processing...",
    extractedText: "",
  },
  {
    id: 3,
    name: "Contract_draft.pdf",
    status: "completed",
    accuracy: "97.8%",
    pages: 12,
    processedAt: "1 day ago",
    extractedText: "SERVICE AGREEMENT\nThis agreement is entered into...",
  },
  {
    id: 4,
    name: "Business_card.png",
    status: "completed",
    accuracy: "95.5%",
    pages: 1,
    processedAt: "2 days ago",
    extractedText: "John Smith\nSenior Developer\ntech@company.com",
  },
]

export   const extractedText = `INVOICE

Invoice Number: INV-2024-001
Date: January 15, 2024
Due Date: February 15, 2024

Bill To:
Acme Corporation
123 Business Street
City, State 12345

Description                    Qty    Rate      Amount
Web Development Services        40    $125.00   $5,000.00
UI/UX Design                   20    $100.00   $2,000.00
Project Management             10    $150.00   $1,500.00

                              Subtotal: $8,500.00
                                   Tax: $850.00
                                 Total: $9,350.00

Payment Terms: Net 30 days
Thank you for your business!`;


export const dashboardStats = [
  {
    title: "Total Documents",
    value: "1,234",
    change: "+12%",
    icon: FileText,
    color: "text-blue-600",
  },
  {
    title: "Processing",
    value: "23",
    change: "+5%",
    icon: Clock,
    color: "text-orange-600",
  },
  {
    title: "Completed",
    value: "1,211",
    change: "+8%",
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    title: "Accuracy Rate",
    value: "98.5%",
    change: "+0.3%",
    icon: TrendingUp,
    color: "text-purple-600",
  },
]