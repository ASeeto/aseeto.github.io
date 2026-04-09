import React, { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface ContactData {
  email: string;
  linkedin: string;
  github: string;
}

interface ContactFormProps {
  contact: ContactData;
  heading?: string;
  subheading?: string;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const ContactForm: React.FC<ContactFormProps> = ({
  contact,
  heading = 'Get In Touch',
  subheading = "Have a project in mind or just want to connect? I'd love to hear from you.",
}) => {
  const sectionRef = useScrollAnimation();

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errors, setErrors] = useState<Partial<typeof formData>>({});

  const validate = () => {
    const errs: Partial<typeof formData> = {};
    if (!formData.name.trim()) errs.name = 'Name is required.';
    if (!formData.email.trim()) errs.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errs.email = 'Please enter a valid email address.';
    if (!formData.message.trim()) errs.message = 'Message is required.';
    return errs;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setStatus('submitting');
    // Simulate API call — replace with Netlify Forms / Formspree endpoint
    await new Promise((res) => setTimeout(res, 1200));
    setStatus('success');
    setFormData({ name: '', email: '', message: '' });
  };

  const mailtoHref = `mailto:${contact.email.replace('@', '+business@')}`;

  return (
    <section
      id="contact"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-20 sm:py-28"
      style={{ backgroundColor: '#ebe3dc' }}
      aria-labelledby="contact-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <div className="text-center mb-12 reveal">
            <p className="section-subtitle mb-3">Contact</p>
            <h2 id="contact-heading" className="section-title">{heading}</h2>
            <p className="mt-4 text-sm sm:text-base" style={{ color: '#9a8c98' }}>{subheading}</p>

            {/* Quick contact links */}
            <div className="flex items-center justify-center gap-4 mt-6 flex-wrap">
              <a
                href={mailtoHref}
                className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
                style={{ color: '#4a4e69' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#22223b'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#4a4e69'}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                {contact.email}
              </a>
              <span className="hidden sm:block" style={{ color: '#c9ada7' }}>|</span>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
                style={{ color: '#4a4e69' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#22223b'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#4a4e69'}
              >
                LinkedIn
              </a>
              <span className="hidden sm:block" style={{ color: '#c9ada7' }}>|</span>
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
                style={{ color: '#4a4e69' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#22223b'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#4a4e69'}
              >
                GitHub
              </a>
            </div>
          </div>

          {/* Form card */}
          <div className="reveal reveal-delay-1 bg-white rounded-2xl shadow-sm p-8 border" style={{ borderColor: '#c9ada7' }}>
            {status === 'success' ? (
              <div className="text-center py-8">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-2"
                  style={{ backgroundColor: '#f2e9e4', borderColor: '#c9ada7' }}
                  aria-hidden="true"
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4a4e69" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: '#22223b' }}>Message sent!</h3>
                <p className="text-sm mb-6" style={{ color: '#9a8c98' }}>Thanks for reaching out. I'll get back to you soon.</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="btn-secondary text-sm px-5 py-2.5"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="space-y-5">
                  {/* Name */}
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium mb-1.5" style={{ color: '#4a4e69' }}>
                      Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`input-field ${errors.name ? 'border-red-300 focus:ring-red-400' : ''}`}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-1.5 text-xs text-red-500">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium mb-1.5" style={{ color: '#4a4e69' }}>
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={`input-field ${errors.email ? 'border-red-300 focus:ring-red-400' : ''}`}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1.5 text-xs text-red-500">{errors.email}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-medium mb-1.5" style={{ color: '#4a4e69' }}>
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      placeholder="Tell me about your project or idea..."
                      value={formData.message}
                      onChange={handleChange}
                      className={`input-field resize-none ${errors.message ? 'border-red-300 focus:ring-red-400' : ''}`}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                    />
                    {errors.message && (
                      <p id="message-error" className="mt-1.5 text-xs text-red-500">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="btn-primary btn-ripple w-full"
                  >
                    {status === 'submitting' ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                          <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                          <path d="M12 2a10 10 0 0 1 10 10" />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M22 2L11 13M22 2L15 22 11 13 2 9l20-7z" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactForm;
