import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, Send, Loader } from "lucide-react";
import { toast } from "sonner";
import { contactFormSchema, ContactFormData } from "@/lib/validation";
import { contactInfo } from "@/lib/config";
import { trackFormSubmission } from "@/lib/analytics";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      setIsSubmitting(true);
      
      // Uncomment and use EmailJS when configured
      // import { sendContactEmail } from "@/lib/emailjs";
      // const result = await sendContactEmail(data);
      // if (!result.success) {
      //   toast.error(result.message);
      //   trackFormSubmission('contact_form', false);
      //   return;
      // }
      
      // For demo purposes, just simulate sending
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Track successful form submission
      trackFormSubmission('contact_form', true);
      
      toast.success("Cảm ơn bạn đã liên hệ! Mình sẽ phản hồi sớm nhất.");
      reset();
    } catch (error) {
      // Track failed form submission
      trackFormSubmission('contact_form', false);
      toast.error("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-card/50">
      <div className="section-container">
        <h2 className="font-display text-3xl font-bold mb-2 text-center">
          <span className="gradient-text">Liên hệ</span>
        </h2>
        <p className="text-muted-foreground text-center mb-12 font-display text-sm">Contact</p>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10">
          {/* Info */}
          <div className="space-y-6">
            <h3 className="font-display text-xl font-semibold">Kết nối với mình</h3>
            <p className="text-muted-foreground leading-relaxed">
              Nếu bạn có bất kỳ câu hỏi nào hoặc muốn hợp tác, đừng ngần ngại liên hệ!
            </p>
            <div className="space-y-4">
              <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-3 text-secondary-foreground hover:text-primary transition-colors">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Mail size={18} className="text-primary" />
                </div>
                <span className="text-sm">{contactInfo.email}</span>
              </a>
              <a href={`tel:${contactInfo.phone}`} className="flex items-center gap-3 text-secondary-foreground hover:text-primary transition-colors">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Phone size={18} className="text-primary" />
                </div>
                <span className="text-sm">{contactInfo.phone}</span>
              </a>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Họ tên"
                {...register("name")}
                className={`w-full px-4 py-3 rounded-lg bg-secondary border transition font-body text-sm focus:outline-none focus:ring-2 ${
                  errors.name ? "border-destructive focus:ring-destructive/50" : "border-border focus:ring-primary/50"
                } text-foreground placeholder:text-muted-foreground`}
              />
              {errors.name && <p className="text-destructive text-xs mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <input
                type="email"
                placeholder="Email"
                {...register("email")}
                className={`w-full px-4 py-3 rounded-lg bg-secondary border transition font-body text-sm focus:outline-none focus:ring-2 ${
                  errors.email ? "border-destructive focus:ring-destructive/50" : "border-border focus:ring-primary/50"
                } text-foreground placeholder:text-muted-foreground`}
              />
              {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <input
                type="text"
                placeholder="Chủ đề"
                {...register("subject")}
                className={`w-full px-4 py-3 rounded-lg bg-secondary border transition font-body text-sm focus:outline-none focus:ring-2 ${
                  errors.subject ? "border-destructive focus:ring-destructive/50" : "border-border focus:ring-primary/50"
                } text-foreground placeholder:text-muted-foreground`}
              />
              {errors.subject && <p className="text-destructive text-xs mt-1">{errors.subject.message}</p>}
            </div>

            <div>
              <textarea
                placeholder="Nội dung"
                rows={4}
                {...register("message")}
                className={`w-full px-4 py-3 rounded-lg bg-secondary border transition resize-none font-body text-sm focus:outline-none focus:ring-2 ${
                  errors.message ? "border-destructive focus:ring-destructive/50" : "border-border focus:ring-primary/50"
                } text-foreground placeholder:text-muted-foreground`}
              />
              {errors.message && <p className="text-destructive text-xs mt-1">{errors.message.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-display text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? <Loader size={16} className="animate-spin" /> : <Send size={16} />}
              {isSubmitting ? "Đang gửi..." : "Gửi tin nhắn"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
