'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Instagram, ChevronDown, ChevronUp, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

const subjects = [
  'General Inquiry',
  'Catering Request',
  'Feedback',
  'Partnership Opportunity',
  'Employment',
  'Other',
]

const faqs = [
  {
    question: 'Do you have WiFi?',
    answer: 'Yes! All of our locations offer free high-speed WiFi. Perfect for working or browsing while you enjoy your coffee.',
  },
  {
    question: 'Are your locations dog-friendly?',
    answer: "Absolutely! Dogs are welcome on our patios, and we offer free Pup Cups for your furry friends. It's one of our favorite traditions.",
  },
  {
    question: 'Do you offer catering?',
    answer: 'Yes, we offer catering for events of all sizes. Please fill out the contact form or give us a call to discuss your needs.',
  },
  {
    question: 'Can I buy gift cards?',
    answer: 'Gift cards are available at all locations and online. They make the perfect gift for the coffee lover in your life!',
  },
  {
    question: 'Do you donate to animal charities?',
    answer: "Yes! A portion of every purchase goes to support local animal charities. It's at the heart of everything we do.",
  },
  {
    question: 'Are you hiring?',
    answer: "We're always looking for passionate people to join our pack! Check our Employment page or visit any location to inquire about openings.",
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, this would submit to an API
    setSubmitted(true)
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-beige-light">
        <div className="container-custom text-center">
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-gray-900">
            Contact Us
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Have a question, feedback, or just want to say hi?
            We&apos;d love to hear from you!
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="font-heading font-bold text-2xl text-gray-900 mb-6">
                Send Us a Message
              </h2>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-forest" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl text-gray-900 mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-600">
                    Thanks for reaching out. We&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Name
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Subject
                    </label>
                    <select
                      id="subject"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="flex h-11 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-base text-gray-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:border-transparent"
                    >
                      {subjects.map((subject) => (
                        <option key={subject} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Your message..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="font-heading font-bold text-2xl text-gray-900 mb-6">
                  Quick Contact
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-forest/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-forest" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Email</h3>
                      <a
                        href="mailto:hello@bjornsbrew.com"
                        className="text-forest hover:underline"
                      >
                        hello@bjornsbrew.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-forest/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-forest" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Phone</h3>
                      <a
                        href="tel:8018838888"
                        className="text-forest hover:underline"
                      >
                        (801) 883-8888
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-forest/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Instagram className="w-5 h-5 text-forest" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Instagram</h3>
                      <a
                        href="https://instagram.com/bjornsbrew"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-forest hover:underline"
                      >
                        @bjornsbrew
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-forest/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-forest" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Locations</h3>
                      <a href="/locations" className="text-forest hover:underline">
                        View all 3 locations →
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Join the Pack CTA */}
              <div className="bg-pink-light rounded-2xl p-8 text-center">
                <h3 className="font-heading font-bold text-xl text-gray-900 mb-2">
                  Join Our Pack! 🐾
                </h3>
                <p className="text-gray-600 mb-4">
                  Interested in working at Bjorn&apos;s Brew? We&apos;re always
                  looking for passionate people.
                </p>
                <Button href="/employment" variant="primary">
                  View Openings
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-beige-light">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-900">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Quick answers to common questions
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">
                    {faq.question}
                  </span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-forest flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                <div
                  className={cn(
                    'overflow-hidden transition-all duration-300',
                    openFaq === index ? 'max-h-48' : 'max-h-0'
                  )}
                >
                  <p className="px-6 pb-6 text-gray-600">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
