import { useState } from "react";
import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { contactFormSchema, type ContactFormData } from "@shared/schema";

interface ContactFormProps {
  title?: string;
  description?: string;
  source?: string;
}

export default function ContactForm({ 
  title = "Get Your Cash Offer Today", 
  description = "Fill out the form below and we'll contact you within 24 hours with a fair cash offer.",
  source = "contact"
}: ContactFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      message: "",
      source: source,
      smsConsent: false,
    },
  });

  const smsConsent = watch("smsConsent");

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/submit-lead", { ...data, source });
      
      setIsSubmitted(true);
      reset();
      toast({
        title: "Form Submitted!",
        description: "We'll contact you within 24 hours with your cash offer.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">Thank You!</h3>
            <p className="text-muted-foreground">
              We've received your information and will contact you within 24 hours with a fair cash offer.
            </p>
            <Button onClick={() => setIsSubmitted(false)} variant="outline" data-testid="button-submit-another">
              Submit Another Property
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl text-center">{title}</CardTitle>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                placeholder="John"
                {...register("firstName")}
                className={errors.firstName ? "border-destructive" : ""}
                data-testid="input-firstName"
              />
              {errors.firstName && (
                <p className="text-sm text-destructive">{errors.firstName.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                placeholder="Smith"
                {...register("lastName")}
                className={errors.lastName ? "border-destructive" : ""}
                data-testid="input-lastName"
              />
              {errors.lastName && (
                <p className="text-sm text-destructive">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              {...register("email")}
              className={errors.email ? "border-destructive" : ""}
              data-testid="input-email"
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(516) 555-1234"
              {...register("phone")}
              className={errors.phone ? "border-destructive" : ""}
              data-testid="input-phone"
            />
            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Property Address *</Label>
            <Input
              id="address"
              placeholder="123 Main St, Long Island, NY"
              {...register("address")}
              className={errors.address ? "border-destructive" : ""}
              data-testid="input-address"
            />
            {errors.address && (
              <p className="text-sm text-destructive">{errors.address.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Additional Details (Optional)</Label>
            <Textarea
              id="message"
              placeholder="Tell us about your situation..."
              {...register("message")}
              rows={3}
              data-testid="input-message"
            />
          </div>

          <div className="flex items-start space-x-3 py-2">
            <Checkbox
              id="smsConsent"
              checked={smsConsent}
              onCheckedChange={(checked) => setValue("smsConsent", checked === true)}
              data-testid="checkbox-sms-consent"
            />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="smsConsent"
                className="text-sm font-normal cursor-pointer"
              >
                I agree to receive SMS/text messages from The Property Father regarding my property inquiry. Message frequency may vary. Message and data rates may apply. Reply STOP to opt out, HELP for help. View our{" "}
                <Link href="/terms" className="text-accent underline hover:text-accent/80" data-testid="link-terms">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-accent underline hover:text-accent/80" data-testid="link-privacy">
                  Privacy Policy
                </Link>.
              </Label>
              {errors.smsConsent && (
                <p className="text-sm text-destructive">{errors.smsConsent.message}</p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-accent text-accent-foreground"
            disabled={isSubmitting}
            data-testid="button-submit-form"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Get My Cash Offer"
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            By submitting, you agree to receive calls and texts about your property.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
