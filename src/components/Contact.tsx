  import React, { useState } from 'react';
  import { Mail, MapPin, Send } from 'lucide-react'; 
  import { SiTiktok, SiInstagram, SiGithub } from 'react-icons/si';
  import { useIntersectionObserver } from '../hooks/useScrollAnimation';
  import emailjs from '@emailjs/browser';

  const Contact: React.FC = () => {
    const { isVisible, ref } = useIntersectionObserver(0.3);
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      subject: '',
      message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      emailjs.send(
        'service_egxpe1o',      // ← Ganti dengan ID-mu
        'template_qvna39l',     // ← Ganti dengan ID-mu
        formData,
        'dxgPgOlzwIVC3_PYe'       // ← Ganti dengan Public Key
      ).then(() => {
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      }).catch((error) => {
        console.error('EmailJS Error:', error);
        alert('Failed to send message. Please try again.');
      });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData(prev => ({
        ...prev,
        [e.target.name]: e.target.value
      }));
    };

    return (
      <section ref={ref} className="py-20" id="contact">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Get In Touch
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
              <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Have a project in mind or want to collaborate? I'd love to hear from you. Let's create something amazing together!
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Let's Connect</h3>
                  <div className="space-y-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-4">
                        <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                        <p className="text-lg text-gray-900 dark:text-white">wafaanz3@gmail.com</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-4">
                        <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
                        <p className="text-lg text-gray-900 dark:text-white">East Java, Indonesia</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div>
  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Follow Me</h4>
  <div className="flex space-x-4">
    <a
      href="https://www.tiktok.com/@fafafaa88"
      target="_blank"
      rel="noopener noreferrer"
      className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center hover:bg-pink-100 dark:hover:bg-pink-900/30 hover:text-pink-500 dark:hover:text-pink-400 transition-all group"
    >
      <SiTiktok className="w-6 h-6 group-hover:scale-110 transition-transform" />
    </a>
    <a
      href="https://www.instagram.com/@wapaaa.22"
      target="_blank"
      rel="noopener noreferrer"
      className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center hover:bg-pink-100 dark:hover:bg-pink-900/30 hover:text-pink-500 dark:hover:text-pink-400 transition-all group"
    >
      <SiInstagram className="w-6 h-6 group-hover:scale-110 transition-transform" />
    </a>
    <a
      href="https://github.com/FaaCode22"
      target="_blank"
      rel="noopener noreferrer"
      className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-all group"
    >
      <SiGithub className="w-6 h-6 group-hover:scale-110 transition-transform" />
    </a>
  </div>
</div>

              </div>

              {/* Contact Form */}
              <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                      <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                      <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors focus:ring-2 focus:ring-blue-500" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                    <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                    <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={6} required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors focus:ring-2 focus:ring-blue-500 resize-none"
                      placeholder="Tell me about your project or just say hello!" />
                  </div>
                  <button type="submit"
                    className="w-full flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all shadow-lg group">
                    <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                    Send Message
                  </button>
                </form>
              </div>

            </div>
          </div>
        </div>
      </section>
    );
  };

  export default Contact;
